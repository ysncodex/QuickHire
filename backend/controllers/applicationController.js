// Location: quickhire-server/controllers/applicationController.js
import Application from '../models/Application.js';

// POST /api/applications - Submit job application
export const submitApplication = async (req, res) => {
  try {
    const newApplication = await Application.create(req.body);
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit application', error: error.message });
  }
};
