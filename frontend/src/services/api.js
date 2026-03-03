import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// 1. Get all jobs
export const fetchJobsAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// 2. Get single job details
export const fetchJobByIdAPI = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error);
    throw error;
  }
};

// 3. Create a job (Admin)
export const createJobAPI = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// 4. Delete a job (Admin)
export const deleteJobAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

// 5. Submit job application
export const submitApplicationAPI = async (applicationData) => {
  try {
    const response = await axios.post(`${API_URL}/applications`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};
