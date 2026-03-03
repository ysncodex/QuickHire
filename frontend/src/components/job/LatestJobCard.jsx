import { Link } from 'react-router-dom';
import { formatTimeAgo } from '../../utils/formatters';

const LatestJobCard = ({ job }) => {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-white rounded-xl border border-gray-100 p-6 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-lg bg-emerald-50 flex items-center justify-center text-2xl font-bold text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
          {job.company.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 pr-4">
              {job.title}
            </h3>
            <span className="text-xs font-medium text-gray-400 whitespace-nowrap mt-1">
              {formatTimeAgo(job.created_at)}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-4 font-medium">
            {job.company} • {job.location}
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 text-xs font-bold text-emerald-500 border border-emerald-200 rounded-full bg-white">
              {job.type}
            </span>
            <span className="px-3 py-1 text-xs font-bold text-orange-400 border border-orange-200 rounded-full bg-white">
              {job.category}
            </span>
            <span className="px-3 py-1 text-xs font-bold text-indigo-500 border border-indigo-200 rounded-full bg-white">
              {job.level}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LatestJobCard;
