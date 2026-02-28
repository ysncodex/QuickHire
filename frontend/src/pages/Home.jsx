// Location: src/pages/Home.jsx
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import useJobStore from '../store/useJobStore';

// Import all your broken-down components
import HeroSection from '../components/home/HeroSection';
import CompaniesSection from '../components/home/CompaniesSection';
import ExploreByCategory from '../components/home/ExploreByCategory';
import CtaBanner from '../components/home/CtaBanner';
import JobCard from '../components/job/JobCard';
import LatestJobsSection from '../components/home/LatestJobsSection';

const Home = () => {
  // We only need the jobs list and filtering logic here to pass to the JobCards
  const { jobs, searchQuery, filterLocation, setSearchQuery, setFilterLocation } = useJobStore();

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
      <HeroSection />

      <CompaniesSection />

      <ExploreByCategory />

      <CtaBanner />

      {/* 4. Featured Jobs Section max-w-6xl mx-auto */}
      <section className="w-full max-w-[90%] mx-auto relative z-10 w-full px-4 lg:px-0">
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
      </section>

      <LatestJobsSection filteredJobs={filteredJobs} />
    </div>
  );
};

export default Home;
