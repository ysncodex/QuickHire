import { useMemo } from 'react';
import useJobStore from '../store/useJobStore';

import HeroSection from '../components/home/HeroSection';
import CompaniesSection from '../components/home/CompaniesSection';
import ExploreByCategory from '../components/home/ExploreByCategory';
import CtaBanner from '../components/home/CtaBanner';
import LatestJobsSection from '../components/home/LatestJobsSection';
import FeaturedJobsSection from '../components/home/FeaturedJobsSection';

const Home = () => {
  const { jobs, searchQuery, filterLocation } = useJobStore();

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

      <FeaturedJobsSection filteredJobs={filteredJobs} />

      <LatestJobsSection filteredJobs={filteredJobs} />
    </div>
  );
};

export default Home;
