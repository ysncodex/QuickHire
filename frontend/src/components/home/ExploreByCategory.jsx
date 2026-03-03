import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { BsPen, BsBarChartLine, BsCodeSlash } from 'react-icons/bs';
import { HiOutlineSpeakerphone, HiOutlineUsers, HiOutlineServer } from 'react-icons/hi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FiMonitor } from 'react-icons/fi';
import useJobStore from '../../store/useJobStore';

const ExploreByCategory = () => {
  const { jobs, searchQuery, filterLocation } = useJobStore();

  const [activeCategory, setActiveCategory] = useState('');

  const categories = useMemo(() => {
    const baseData = [
      { name: 'Design', icon: BsPen },
      { name: 'Data', icon: BsBarChartLine },
      { name: 'Marketing', icon: HiOutlineSpeakerphone },
      { name: 'Finance', icon: MdOutlineAccountBalanceWallet },
      { name: 'Tech', icon: FiMonitor },
      { name: 'Engineering', icon: BsCodeSlash },
      { name: 'IT & Systems', icon: HiOutlineServer },
      { name: 'Human Resource', icon: HiOutlineUsers },
    ];

    return baseData.map((cat) => {
      const filteredCount = jobs.filter((job) => {
        const matchesCategory = job.category === cat.name;

        const matchesSearch =
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation = filterLocation === '' || job.location === filterLocation;

        return matchesCategory && matchesSearch && matchesLocation;
      }).length;

      return {
        ...cat,
        count: filteredCount,
      };
    });
  }, [jobs, searchQuery, filterLocation]);

  return (
    <section className="w-full max-w-[90%] mx-auto py-12 px-4 lg:px-0 z-10 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1f2937] tracking-tight">
          Explore by <span className="text-[#38bdf8]">category</span>
        </h2>

        <Link
          to="/job-listings"
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition-colors mb-1"
        >
          Show all jobs <FaArrowRight className="text-sm" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.name;

          return (
            <div
              key={index}
              onClick={() => setActiveCategory(cat.name)}
              className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 group ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-600 shadow-lg text-white hover:bg-indigo-700 hover:-translate-y-1'
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 text-gray-900 hover:-translate-y-1'
              }`}
            >
              <Icon className={`text-3xl mb-6 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />

              <h3
                className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}
              >
                {cat.name}
              </h3>

              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  isSelected ? 'text-indigo-100' : 'text-gray-500 group-hover:text-indigo-500'
                }`}
              >
                {cat.count} jobs available <FaArrowRight className="text-xs" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreByCategory;
