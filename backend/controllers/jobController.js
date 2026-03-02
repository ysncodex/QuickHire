import Job from '../models/Job.js';

// @desc    Get all jobs
// @route   GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    // Sort by newest first directly in the database
    const jobs = await Job.find().sort({ created_at: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
};

// @desc    Get single job details
// @route   GET /api/jobs/:id
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // If the ID is valid but no job exists in the database
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    // If the ID format itself is completely invalid (Mongoose CastError)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(500).json({ message: 'Failed to fetch job details', error: error.message });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
export const createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: 'Invalid job data', error: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job', error: error.message });
  }
};
