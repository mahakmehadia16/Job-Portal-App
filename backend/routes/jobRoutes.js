
import express from 'express';
import multer from 'multer';
import path from 'path';
import { createJob, getJobs, getJob, applyJob, deleteJob, getApplicants } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => {
    const uniq = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname || '');
    cb(null, uniq + ext);
  }
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', getJobs);
router.post('/', protect, upload.single('logo'), createJob);
router.get('/:id', getJob);
router.post('/:id/apply', protect, upload.single('resume'), applyJob);
router.get('/:id/applicants', protect, getApplicants);
router.delete('/:id', protect, deleteJob);

export default router;
