import { useMemo, useState, useRef, useEffect } from 'react';
import useJobStore from '../store/useJobStore';
import JobCard from '../components/job/JobCard';
import Button from '../components/common/Button';
import { FaSearch, FaMapMarkerAlt, FaChevronDown, FaBriefcase } from 'react-icons/fa';

const JobListings = () => {
  const { jobs, searchQuery, filterLocation, setSearchQuery, setFilterLocation } = useJobStore();

  const [filterCategory, setFilterCategory] = useState('');

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const locationRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target))
        setIsLocationOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(event.target))
        setIsCategoryOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const locations = [...new Set(jobs.map((job) => job.location))];
  const categories = [...new Set(jobs.map((job) => job.category || 'General'))];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = filterLocation === '' || job.location === filterLocation;

      const jobCat = job.category || 'General';
      const matchesCategory = filterCategory === '' || jobCat === filterCategory;

      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [jobs, searchQuery, filterLocation, filterCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 py-12 space-y-12">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Find your next role</h1>
        <p className="text-gray-500 mb-8">
          Browse all open positions and filter by your preferences.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 relative z-30">
          <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg w-full focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <FaSearch className="text-gray-400 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Job title or company"
              className="w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-1 w-full relative" ref={categoryRef}>
            <div
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsLocationOpen(false);
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer flex justify-between items-center select-none"
            >
              <div className="flex items-center">
                <FaBriefcase className="text-gray-400 mr-3 shrink-0" />
                <span className={filterCategory ? 'text-gray-900' : 'text-gray-400'}>
                  {filterCategory || 'All Categories'}
                </span>
              </div>
              <FaChevronDown
                className={`text-gray-400 text-xs transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 overflow-hidden max-h-60 overflow-y-auto">
                <div
                  className={`px-5 py-2.5 cursor-pointer transition-colors ${filterCategory === '' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => {
                    setFilterCategory('');
                    setIsCategoryOpen(false);
                  }}
                >
                  All Categories
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`px-5 py-2.5 cursor-pointer transition-colors ${filterCategory === cat ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => {
                      setFilterCategory(cat);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 w-full relative" ref={locationRef}>
            <div
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsCategoryOpen(false);
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer flex justify-between items-center select-none"
            >
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-400 mr-3 shrink-0" />
                <span className={filterLocation ? 'text-gray-900' : 'text-gray-400'}>
                  {filterLocation || 'All Locations'}
                </span>
              </div>
              <FaChevronDown
                className={`text-gray-400 text-xs transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isLocationOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 overflow-hidden max-h-60 overflow-y-auto">
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
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
          </h2>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-900 font-bold text-lg">No jobs found</p>
            <p className="text-gray-500 mt-1 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setFilterLocation('');
                setFilterCategory('');
              }}
              className="font-medium"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
