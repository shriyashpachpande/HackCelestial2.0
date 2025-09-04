import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import reportRoutes from './routes/report.js';
import policyRoutes from './routes/policy.js';
import analyzeRoutes from './routes/analyze.js';
import chatRouter from './routes/chat.js';
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import multiReportRoutes from './routes/multi-report-route.js';
import multiPolicyRoutes from './routes/multi-policy-route.js';
import multiAnalyzeRoutes from './routes/multi-analyze-route.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const uploadsPath = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
app.use('/uploads', express.static(uploadsPath));

mongoose.connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));

app.use('/api/report', reportRoutes);
app.use('/api/policy', policyRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/chat', chatRouter);
// NEW: Multi routes (added)
app.use('/api/multi-report', multiReportRoutes);
app.use('/api/multi-policy', multiPolicyRoutes);
app.use('/api/multi-analyze', multiAnalyzeRoutes);
//chatbot routes
app.use("/api", uploadRoutes);
app.use("/api", chatRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
