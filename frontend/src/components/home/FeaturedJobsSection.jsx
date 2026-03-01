import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import JobCard from '../job/JobCard';
import useJobStore from '../../store/useJobStore';

const FeaturedJobsSection = ({ filteredJobs }) => {
  const { setSearchQuery, setFilterLocation } = useJobStore();

  const dailyFeaturedJobs = useMemo(() => {
    if (filteredJobs.length <= 6) return filteredJobs;

    const currentDay = new Date().getDate();

    const startIndex = currentDay % filteredJobs.length;

    const rotatedJobs = [...filteredJobs.slice(startIndex), ...filteredJobs.slice(0, startIndex)];

    return rotatedJobs.slice(0, 6);
  }, [filteredJobs]);

  return (
    <section className="w-full max-w-[90%] mx-auto relative z-10 px-4 lg:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1f2937] tracking-tight">
          Featured <span className="text-[#38bdf8]">jobs</span>
        </h2>
        <Link
          to="/job-listings"
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition-colors mb-1"
        >
          Show all jobs <FaArrowRight className="text-sm" />
        </Link>
      </div>

      {dailyFeaturedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyFeaturedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterLocation('');
            }}
            className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedJobsSection;
