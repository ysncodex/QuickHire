import { create } from 'zustand';
import mockJobs from '../utils/mockData.json';

const useJobStore = create((set) => ({
  // Initial State loaded directly from your mock data
  jobs: mockJobs,
  searchQuery: '',
  filterCategory: '',
  filterLocation: '',

  // Actions to update the search/filter state from the UI
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterCategory: (category) => set({ filterCategory: category }),
  setFilterLocation: (location) => set({ filterLocation: location }),

  // Admin Actions to manipulate the data
  addJob: (newJob) =>
    set((state) => ({
      jobs: [newJob, ...state.jobs],
    })),

  deleteJob: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    })),
}));

export default useJobStore;
