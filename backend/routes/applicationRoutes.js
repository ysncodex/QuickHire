// Location: quickhire-server/routes/applicationRoutes.js
import express from 'express';
import { submitApplication } from '../controllers/applicationController.js';

const router = express.Router();

// Route for /api/applications
router.route('/').post(submitApplication);

export default router;
