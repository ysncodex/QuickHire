import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaClock } from 'react-icons/fa';
import { formatTimeAgo } from '../../utils/formatters.js';

const JobCard = ({ job }) => {
  const postedDate = formatTimeAgo(job.created_at);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="mb-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1" title={job.title}>
            {job.title}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
            {job.category}
          </span>
        </div>

        <p className="text-gray-600 font-medium mb-3">{job.company}</p>

        <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-400" />
            <span>Posted: {postedDate}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <Link
          to={`/jobs/${job.id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
