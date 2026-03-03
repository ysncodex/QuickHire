import { create } from 'zustand';
import { fetchJobsAPI, createJobAPI, deleteJobAPI } from '../services/api';

const useJobStore = create((set) => ({
  jobs: [],
  searchQuery: '',
  filterLocation: '',
  isLoading: false,
  error: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterLocation: (location) => set({ filterLocation: location }),

  // 1. Fetch all jobs from MongoDB
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchJobsAPI();
      set({ jobs: data, isLoading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch jobs', isLoading: false });
    }
  },

  // 2. Add a new job to MongoDB
  addJob: async (jobData) => {
    set({ isLoading: true, error: null });
    try {
      const newJob = await createJobAPI(jobData);
      set((state) => ({
        jobs: [newJob, ...state.jobs],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message || 'Failed to add job', isLoading: false });
      throw error;
    }
  },

  // 3. Delete a job from MongoDB
  deleteJob: async (id) => {
    try {
      await deleteJobAPI(id);
      set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== id),
      }));
    } catch (error) {
      set({ error: error.message || 'Failed to delete job' });
      console.error(error);
    }
  },
}));

export default useJobStore;
