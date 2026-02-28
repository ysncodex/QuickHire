import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Quick<span className="text-gray-800">Hire</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Find Jobs
          </Link>
          <Link
            to="/admin"
            className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Admin Panel
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
