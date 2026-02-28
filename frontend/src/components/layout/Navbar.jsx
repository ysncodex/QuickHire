import { Link } from 'react-router-dom';
import Button from '../common/Button'; // Adjust this path if necessary

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Logo and Navigation Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-indigo-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" />
              <circle cx="12" cy="11" r="5" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="12" cy="15.5" r="1.5" fill="white" />
            </svg>
            <span className="text-xl font-bold text-gray-900 tracking-tight">QuickHire</span>
          </Link>

          {/* Main Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Browse Companies
            </Link>
            {/* Added: Explicit Admin Access Link */}
            <div className="h-4 w-px bg-gray-300 mx-2"></div> {/* Vertical divider */}
            <Link
              to="/admin"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
            >
              Post a Job{' '}
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full ml-1">
                Admin
              </span>
            </Link>
          </nav>
        </div>

        {/* Right Side: Auth & Admin Buttons */}
        <div className="flex items-center gap-4">
          <Button to="/" variant="ghost" className="text-sm font-bold">
            Login
          </Button>

          <Button to="/" variant="primary" className="text-sm rounded-sm">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
