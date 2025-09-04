import express from 'express';
import { upload } from '../utils/uploader.js';
import Report from '../models/Report.js';
import { uploadToGemini, generateFromParts, partFromFile } from '../services/gemini.js';
import { extractTextSmart } from '../services/extractors.js';

const router = express.Router();

// Robust cleaners
const stripAllFences = (s) => String(s || '')
  .replace(/^\uFEFF/, '')               // BOM
  // Remove all code fences (e.g., ```json, ```python, etc.)
  .replace(/`{3,}\s*\w*\s*\n?/g, '')
  .trim();

const hardClean = (s) => {
  let x = String(s || '');
  x = x.replace(/^\uFEFF/, '');
  // Remove leading fences like ```````python etc.
  x = x.replace(/^\s*`{3,}\s*\w*\s*/i, '');
  // Remove trailing closing fences
  x = x.replace(/\s*`{3,}\s*$/i, '');
  // Some models emit a bare 'json' token line
  x = x.replace(/^\s*json\s*/i, '');
  // Remove stray leading backticks
  x = x.replace(/^[`]+/g, '');
  return x.trim();
};

// Normalize LLM output -> object
const coerceObject = (val) => {
  if (Array.isArray(val)) return val[0] && typeof val[0] === 'object' ? val[0] : {};
  if (typeof val === 'string') {
    try { return JSON.parse(val); } catch { return {}; }
  }
  return val && typeof val === 'object' ? val : {};
};

// Try to repair small truncations (remove trailing comma/quote)
const tinyRepair = (s) => {
  let t = String(s || '').trim();
  // If ends with an unclosed string, drop last partial line
  if (/(\\)?"+\s*$/.test(t) && !/"}\s*$/.test(t)) {
    t = t.replace(/"+\s*$/, '');
  }
  // Remove trailing dangling comma before final }
  t = t.replace(/,(\s*[}\]])\s*$/m, '$1');
  return t;
};

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const textInput = typeof req.body?.textInput === 'string' ? req.body.textInput : '';
    const hasFile = !!req.file;
    const hasText = !!textInput && textInput.trim().length > 0;

    console.log('[report/upload] hasFile:', hasFile, 'hasText:', hasText, 'fileKey:', req.file?.fieldname);

    if (hasFile && hasText) {
      return res.status(400).json({ error: 'Provide file OR text only (not both)' });
    }
    if (!hasFile && !hasText) {
      return res.status(400).json({ error: 'No file or non-empty text provided' });
    }

    let rawText = '';
    let filename = null;
    let mimeType = null;

    if (hasFile) {
      filename = req.file.filename;
      mimeType = req.file.mimetype;

      // 1) Local extraction
      rawText = await extractTextSmart(req.file.path, mimeType);

      // 2) Fallback via Files API
      if (!rawText?.trim()) {
        const file = await uploadToGemini(req.file.path);
        const text = await generateFromParts([
          partFromFile(file),
          '\n\n',
          'Extract the full plain text content from this medical report.'
        ]);
        rawText = (text || '').trim();
      }

      rawText = (rawText || '').replace(/\r\n/g, '\n').trim();
      console.log('[report/upload] rawText length:', rawText.length);

      if (!rawText) {
        return res.status(422).json({ error: 'File se text read nahi hua. Dusra file try karo ya text paste karo.' });
      }
    } else {
      rawText = textInput.trim();
      if (!rawText) return res.status(400).json({ error: 'Empty text provided' });
    }

    // Strict JSON-only prompt
    const extractPrompt = `Return ONLY valid JSON (no extra text, no code fences).
Keys (all strings):
- "diagnosis"
- "severity" (one of "Low","Medium","High","Critical","Unknown")
- "treatment"
- "description" (2–4 sentences)
- "rawTextPreview" (first 500 chars)

Use only the source text. Do not guess. If unsure, set "Unknown".
Do not wrap output in code fences or add the word json. Output a single JSON object only.
Source:
"""${rawText.slice(0, 8000)}"""`;

    // Get model output
    const rawModel = await generateFromParts([ extractPrompt ]);

    // Clean aggressively
    let cleaned = hardClean(stripAllFences(rawModel));
    cleaned = cleaned.replace(/^\s*json\s*/i, '').trim();
    console.log('[report/upload] cleaned length:', cleaned.length);

    // Parse attempts
    let parsed;
    const tryParse = (s) => {
      try { return JSON.parse(s); } catch { return null; }
    };

    // A) direct
    parsed = tryParse(cleaned);

    // B) brace slice
    if (!parsed) {
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        const core = cleaned.slice(start, end + 1);
        parsed = tryParse(core) || tryParse(tinyRepair(core));
      }
    }

    // C) double-encoded
    if (!parsed) {
      const unquoted = cleaned
        .replace(/^"+|"+$/g, '')
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n');
      parsed = tryParse(unquoted)
        || (() => {
          const s = unquoted;
          const start = s.indexOf('{');
          const end = s.lastIndexOf('}');
          if (start !== -1 && end !== -1 && end > start) {
            const core = s.slice(start, end + 1);
            return tryParse(core) || tryParse(tinyRepair(core));
          }
          return null;
        })();
    }

    if (!parsed) {
      console.error('[report/upload] JSON parse failed after repairs. Model sample:', String(rawModel).slice(0, 400));
      return res.status(422).json({
        error: 'Extraction failed: model did not return valid JSON. Try text mode or another file.'
      });
    }

    // Normalize to plain object
    parsed = coerceObject(parsed);

    // Sanitize (no guessing)
    const norm = (v) => (typeof v === 'string' ? v.trim() : '');
    const sev = norm(parsed.severity);
    const ALLOWED = ['Low','Medium','High','Critical','Unknown'];

    const doc = await Report.create({
      filename,
      mimeType,
      rawText,
      diagnosis: norm(parsed.diagnosis) || '',
      severity: ALLOWED.includes(sev) ? sev : 'Unknown',
      treatment: norm(parsed.treatment) || '',
      description: norm(parsed.description) || ''
    });

    return res.json({ ok: true, report: doc });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Report processing failed', details: e.message });
  }
});

export default router;
