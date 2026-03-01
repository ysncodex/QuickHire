import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full max-w-[90%] mx-auto px-4 lg:px-0 h-16 flex items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/job-listings"
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

            <div className="h-4 w-px bg-gray-300 mx-2"></div>

            <Link
              to="/admin"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
            >
              Post a Job{' '}
              <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full ml-1">
                Admin
              </span>
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button to="/login" variant="ghost" className="text-sm font-bold">
            Login
          </Button>

          <Button to="/signup" variant="primary" className="text-sm rounded-sm">
            Sign Up
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          {isMobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-100 shadow-xl z-50">
          <div className="w-full max-w-[90%] mx-auto px-4 py-5 flex flex-col gap-4">
            <Link
              to="/job-listings"
              className="text-base font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              to="/"
              className="text-base font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Browse Companies
            </Link>
            <Link
              to="/admin"
              className="text-base font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
              onClick={() => setIsMobileOpen(false)}
            >
              Post a Job
              <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full ml-2">
                Admin
              </span>
            </Link>

            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <Button
                to="/login"
                variant="ghost"
                className="w-full justify-center text-sm font-bold border border-gray-200"
                onClick={() => setIsMobileOpen(false)}
              >
                Login
              </Button>
              <Button
                to="/signup"
                variant="primary"
                className="w-full justify-center text-sm rounded-sm"
                onClick={() => setIsMobileOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
