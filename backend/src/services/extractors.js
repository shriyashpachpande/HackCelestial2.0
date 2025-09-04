import fs from 'fs';
import path from 'path';
import textract from 'textract';
import Tesseract from 'tesseract.js';

// Lazy-import pdf-parse to avoid boot-time ENOENT quirks
export async function extractTextSmart(filePath, mimeType) {
  const ext = path.extname(filePath).toLowerCase();

  if (mimeType?.includes('pdf') || ext === '.pdf') {
    try {
      const { default: pdfParse } = await import('pdf-parse');
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      if (data.text?.trim()) return data.text;
    } catch {}
  }

  if (mimeType?.includes('word') || ['.docx', '.doc', '.rtf', '.txt'].includes(ext)) {
    try {
      const text = await new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (err, txt) => (err ? reject(err) : resolve(txt)));
      });
      if (text?.trim()) return text;
    } catch {}
  }

  if (mimeType?.startsWith('image/') || ['.png', '.jpg', '.jpeg', '.tiff', '.tif'].includes(ext)) {
    try {
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
      if (text?.trim()) return text;
    } catch {}
  }
if (ext === '.txt') {
  try {
    const txt = fs.readFileSync(filePath, 'utf-8');
    if (txt?.trim()) return txt;
  } catch {}
}

  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return '';
  }
}
