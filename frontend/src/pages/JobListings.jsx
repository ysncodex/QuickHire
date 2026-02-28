import { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useJobStore from '../store/useJobStore';
import JobCard from '../components/job/JobCard';
import Button from '../components/common/Button';
import ExploreByCategory from '../components/home/ExploreByCategory';
import CtaBanner from '../components/home/CtaBanner';
import { FaSearch, FaMapMarkerAlt, FaChevronDown, FaArrowRight } from 'react-icons/fa';

const JobListings = () => {
  // 1. Pull data and actions from Zustand store
  const { jobs, searchQuery, filterLocation, setSearchQuery, setFilterLocation } = useJobStore();

  // 2. Custom Dropdown State & Click-Outside Logic
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

  // 3. Extract unique locations for our dropdown
  const locations = [...new Set(jobs.map((job) => job.location))];

  // 4. Derived state: Filter the jobs based on current search and location criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = filterLocation === '' || job.location === filterLocation;

      return matchesSearch && matchesLocation;
    });
  }, [jobs, searchQuery, filterLocation]);

  return (
    <div className="space-y-12">
      {/* --- HERO SECTION --- */}
      <section className="bg-[#fcfdff] rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm relative overflow-visible flex flex-col lg:flex-row items-center justify-between gap-8 z-20">
        {/* Decorative Background Lines */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] border-[0.5px] border-indigo-100 rounded-full rotate-45 pointer-events-none opacity-50 z-0"></div>
        <div className="absolute -top-20 right-10 w-[600px] h-[600px] border-[0.5px] border-indigo-50 rounded-full rotate-45 pointer-events-none opacity-50 z-0"></div>

        {/* Left Side: Text and Search */}
        <div className="w-full lg:w-1/2 z-10 space-y-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#111827] leading-tight tracking-tight">
            Discover <br />
            more than <br />
            <span className="text-blue-500 relative inline-block mt-2">
              5000+ Jobs
              {/* Fake scribble underline using a border */}
              <span className="absolute left-0 -bottom-1 w-full h-2 bg-blue-500 rounded-full opacity-80 transform -skew-x-12"></span>
            </span>
          </h1>

          <p className="text-gray-500 text-lg max-w-md">
            Great platform for the job seeker that searching for new career heights and passionate
            about startups.
          </p>

          {/* Integrated Custom Search Bar */}
          <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-100 flex flex-col md:flex-row items-center gap-2 max-w-2xl mt-8 relative z-30">
            {/* Keyword Input */}
            <div className="flex-1 flex items-center px-4 w-full">
              <FaSearch className="text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full py-3 bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* CUSTOM Location Dropdown */}
            <div className="flex-1 flex items-center px-4 w-full relative" ref={dropdownRef}>
              <FaMapMarkerAlt className="text-gray-400 mr-3 shrink-0" />

              {/* The Clickable Area */}
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

              {/* The Floating Menu */}
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

            {/* Search Button */}
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

      {/* --- COMPANIES SECTION --- */}
      <section className="py-6 border-b border-gray-100 pb-12 w-full z-10 relative">
        <div>
          <p className="text-gray-400 font-medium mb-8 text-center lg:text-left">
            Companies we helped grow
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-2xl font-bold tracking-tighter text-gray-600">vodafone</span>
            <span className="text-3xl font-bold text-gray-600">intel</span>
            <span className="text-2xl tracking-[0.3em] font-semibold text-gray-600">T E S L A</span>
            <span className="text-3xl font-black text-gray-600">AMD</span>
            <span className="text-3xl font-bold text-gray-600">Talkit</span>
          </div>
        </div>
      </section>

      <ExploreByCategory />
      <CtaBanner />

      {/* --- JOB LISTINGS GRID --- */}
      <div className="relative z-10">
        {/* NEW FEATURED JOBS HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1f2937] tracking-tight">
            Featured <span className="text-[#38bdf8]">jobs</span>
          </h2>

          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition-colors mb-1"
          >
            Show all jobs <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {/* JOB CARDS */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
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
      </div>
    </div>
  );
};

export default JobListings;
