import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { BsPen, BsBarChartLine, BsCodeSlash, BsBriefcase } from 'react-icons/bs';
import { HiOutlineSpeakerphone, HiOutlineUsers } from 'react-icons/hi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FiMonitor } from 'react-icons/fi';

const categories = [
  { name: 'Design', count: 235, icon: BsPen, active: false },
  { name: 'Sales', count: 756, icon: BsBarChartLine, active: false },
  { name: 'Marketing', count: 140, icon: HiOutlineSpeakerphone, active: true }, // The active blue one
  { name: 'Finance', count: 325, icon: MdOutlineAccountBalanceWallet, active: false },
  { name: 'Technology', count: 436, icon: FiMonitor, active: false },
  { name: 'Engineering', count: 542, icon: BsCodeSlash, active: false },
  { name: 'Business', count: 211, icon: BsBriefcase, active: false },
  { name: 'Human Resource', count: 346, icon: HiOutlineUsers, active: false },
];

const ExploreByCategory = () => {
  return (
    <section className="w-full max-w-[90%] mx-auto py-12 px-4 lg:px-0 z-10 relative">
      {/* Header Section */}
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

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 group ${
                cat.active
                  ? 'bg-indigo-600 border-indigo-600 shadow-lg text-white'
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 text-gray-900'
              }`}
            >
              <Icon className={`text-3xl mb-6 ${cat.active ? 'text-white' : 'text-indigo-600'}`} />

              <h3
                className={`text-xl font-bold mb-2 ${cat.active ? 'text-white' : 'text-gray-900'}`}
              >
                {cat.name}
              </h3>

              <div
                className={`flex items-center gap-2 text-sm font-medium ${cat.active ? 'text-indigo-100' : 'text-gray-500 group-hover:text-indigo-500'}`}
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
