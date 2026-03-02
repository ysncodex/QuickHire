// Location: backend/routes/jobRoutes.js
import express from 'express';
// MAKE SURE getJobById IS IMPORTED HERE!
import { getJobs, getJobById, createJob, deleteJob } from '../controllers/jobController.js';

const router = express.Router();

router.route('/').get(getJobs).post(createJob);

router.route('/:id').get(getJobById).delete(deleteJob);

export default router;
