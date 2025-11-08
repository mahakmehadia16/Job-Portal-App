
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumePath: { type: String }
}, { _id: false });

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  description: { type: String },
  salary: { type: String },
  minSalary: { type: Number },
  maxSalary: { type: Number },
  tags: [{ type: String }],
  logoUrl: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  applications: [applicationSchema]
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
