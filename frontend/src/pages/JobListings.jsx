import { useMemo } from 'react';
import useJobStore from '../store/useJobStore';
import JobCard from '../components/job/JobCard';
import { FaSearch, FaFilter, FaMapMarkerAlt } from 'react-icons/fa';

const JobListings = () => {
  // 1. Pull data and actions from Zustand store
  const {
    jobs,
    searchQuery,
    filterCategory,
    filterLocation,
    setSearchQuery,
    setFilterCategory,
    setFilterLocation,
  } = useJobStore();

  // 2. Extract unique categories and locations for our dropdowns
  const categories = [...new Set(jobs.map((job) => job.category))];
  const locations = [...new Set(jobs.map((job) => job.location))];

  // 3. Derived state: Filter the jobs based on current search and filter criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === '' || job.category === filterCategory;
      const matchesLocation = filterLocation === '' || job.location === filterLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [jobs, searchQuery, filterCategory, filterLocation]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Find Your Next Dream Job</h1>
        <p className="mt-3 text-lg text-gray-500">Browse our latest openings and apply today.</p>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search Bar */}
        <div className="md:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaFilter className="text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="md:col-span-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Grid - Clean, responsive layout */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('');
              setFilterLocation('');
            }}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListings;
