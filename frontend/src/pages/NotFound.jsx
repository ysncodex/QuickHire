import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
      >
        Return to Job Listings
      </Link>
    </div>
  );
};

export default NotFound;
