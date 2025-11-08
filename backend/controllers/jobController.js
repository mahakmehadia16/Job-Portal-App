
import Job from '../models/Job.js';

export const createJob = async (req, res) => {
  try {
    const { title, company, location, description, salary, minSalary, maxSalary, tags } = req.body;
    const jobData = { title, company, location, description, salary, createdBy: req.user.id };
    if (minSalary) jobData.minSalary = Number(minSalary);
    if (maxSalary) jobData.maxSalary = Number(maxSalary);
    if (tags) jobData.tags = tags.split(',').map(t => t.trim()).filter(Boolean);
    if (req.file) jobData.logoUrl = `/uploads/${req.file.filename}`;
    const job = await Job.create(jobData);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { q = '', location = '', tag = '', minSalary, maxSalary, page = 1, limit = 9 } = req.query;
    const query = {};
    if (q) query.title = { $regex: q, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (tag) query.tags = { $in: [ new RegExp(tag, 'i') ] };
    if (minSalary) query.$or = [{ minSalary: { $gte: Number(minSalary) }}, { salary: { $regex: strMin(minSalary), $options: 'i' } }];
    if (maxSalary) query.$or = [...(query.$or || []), { maxSalary: { $lte: Number(maxSalary) } }];

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate('createdBy', 'name email'),
      Job.countDocuments(query)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function strMin(v){ return String(v).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); }

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const userId = req.user.id;
    if (job.applicants.some(a => a.toString() == userId) || job.applications.some(a => a.user.toString() == userId)) {
      return res.status(400).json({ message: 'Already applied' });
    }
    let resumePath;
    if (req.file) resumePath = `/uploads/${req.file.filename}`;

    job.applicants.push(userId);
    job.applications.push({ user: userId, resumePath });
    await job.save();
    res.json({ message: 'Applied successfully', resumePath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('applications.user', 'name email role');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    res.json(job.applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
