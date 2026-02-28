// Location: src/components/home/HeroSection.jsx
import { useState, useRef, useEffect } from 'react';
import useJobStore from '../../store/useJobStore';
import Button from '../common/Button';
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

const HeroSection = () => {
  // Grab state directly from Zustand
  const { jobs, searchQuery, filterLocation, setSearchQuery, setFilterLocation } = useJobStore();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const locations = [...new Set(jobs.map((job) => job.location))];

  return (
    <section className="w-full max-w-[90%] mx-auto bg-[#fcfdff] rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm relative overflow-visible flex flex-col lg:flex-row items-center justify-between gap-8 z-20">
      {/* Decorative Background Lines */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] border-[0.5px] border-indigo-100 rounded-full rotate-45 pointer-events-none opacity-50 z-0"></div>
      <div className="absolute -top-20 right-10 w-[600px] h-[600px] border-[0.5px] border-indigo-50 rounded-full rotate-45 pointer-events-none opacity-50 z-0"></div>

      {/* Left Side: Text and Search */}
      <div className="w-full lg:w-1/2 z-10 space-y-6">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#111827] leading-tight tracking-tight">
          Discover <br /> more than <br />
          <span className="text-blue-500 relative inline-block mt-2">
            5000+ Jobs
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-blue-500 rounded-full opacity-80 transform -skew-x-12"></span>
          </span>
        </h1>

        <p className="text-gray-500 text-lg max-w-md">
          Great platform for the job seeker that searching for new career heights and passionate
          about startups.
        </p>

        {/* Custom Search Bar */}
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-100 flex flex-col md:flex-row items-center gap-2 max-w-2xl mt-8 relative z-30">
          <div className="flex-1 flex items-center px-4 w-full">
            <FaSearch className="text-gray-400 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full py-3 bg-transparent border-none outline-none focus:outline-none ring-0 text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-1 flex items-center px-4 w-full relative" ref={dropdownRef}>
            <FaMapMarkerAlt className="text-gray-400 mr-3 shrink-0" />
            <div
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="w-full py-3 bg-transparent font-medium cursor-pointer flex justify-between items-center select-none"
            >
              <span className={filterLocation ? 'text-gray-900' : 'text-gray-400'}>
                {filterLocation || 'Select Location'}
              </span>
              <FaChevronDown
                className={`text-gray-400 text-xs transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isLocationOpen && (
              <div className="absolute top-full left-0 mt-3 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 overflow-hidden">
                <div
                  className={`px-5 py-2.5 cursor-pointer transition-colors ${filterLocation === '' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => {
                    setFilterLocation('');
                    setIsLocationOpen(false);
                  }}
                >
                  All Locations
                </div>
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className={`px-5 py-2.5 cursor-pointer transition-colors ${filterLocation === loc ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => {
                      setFilterLocation(loc);
                      setIsLocationOpen(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="primary"
            className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white whitespace-nowrap"
          >
            Search my job
          </Button>
        </div>

        <p className="text-sm text-gray-500 font-medium pt-2">
          Popular :{' '}
          <span className="text-gray-700">UI Designer, UX Researcher, Android, Admin</span>
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="w-full lg:w-1/2 z-10 flex justify-center lg:justify-end">
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600&h=600"
          alt="Happy job seeker pointing"
          className="w-full max-w-md object-contain drop-shadow-2xl rounded-b-full pointer-events-none"
        />
      </div>
    </section>
  );
};

export default HeroSection;
