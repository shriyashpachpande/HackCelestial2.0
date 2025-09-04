import mongoose from 'mongoose';
const ReportSchema = new mongoose.Schema({
  filename: String,
  mimeType: String,
  rawText: { type: String, required: true },
  diagnosis: String,
  severity: String,
  treatment: String,
  description: String
}, { timestamps: true });
export default mongoose.model('Report', ReportSchema);
