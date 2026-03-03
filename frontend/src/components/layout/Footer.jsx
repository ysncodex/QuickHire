import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaDribbble, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1b1f2e] text-gray-400 py-16 mt-auto">
      <div className="w-full max-w-[90%] mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-4 pr-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <svg
                className="w-8 h-8 text-indigo-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" />
                <circle cx="12" cy="11" r="5" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="12" cy="15.5" r="1.5" fill="white" />
              </svg>
              <span className="text-xl font-bold text-white tracking-tight">QuickHire</span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Great platform for the job seeker that passionate about startups. Find your dream job
              easier.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">About</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Advice
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Help Docs
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Guide
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Updates
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold mb-6">Get job notifications</h3>
            <p className="text-gray-400 mb-6 max-w-sm">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form className="flex w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-l-sm"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 transition-colors rounded-r-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            {new Date().getFullYear()} @ QuickHire. All rights reserved. Task for Qtec Solution
            Limited.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#2a2e3f] flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#2a2e3f] flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all"
            >
              <FaInstagram className="text-sm" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#2a2e3f] flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all"
            >
              <FaDribbble className="text-sm" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#2a2e3f] flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all"
            >
              <FaLinkedinIn className="text-sm" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#2a2e3f] flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all"
            >
              <FaTwitter className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
