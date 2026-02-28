import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import LatestJobCard from '../job/LatestJobCard';
import useJobStore from '../../store/useJobStore';

const LatestJobsSection = ({ filteredJobs }) => {
  const { setSearchQuery, setFilterLocation } = useJobStore();

  return (
    <section className="relative z-10 w-full max-w-[90%] mx-auto px-4 lg:px-0">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1f2937] tracking-tight">
          Latest <span className="text-[#38bdf8]">jobs open</span>
        </h2>
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition-colors mb-1"
        >
          Show all jobs <FaArrowRight className="text-sm" />
        </Link>
      </div>

      {/* 2-COLUMN GRID USING THE NEW HORIZONTAL CARD */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <LatestJobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
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

export default LatestJobsSection;
