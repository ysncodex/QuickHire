import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useJobStore from '../store/useJobStore';
import {
  FaTrash,
  FaPlus,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBriefcase,
  FaInbox,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { formatDate } from '../utils/formatters.js';
import Button from '../components/common/Button';
import Select from '../components/common/Select';

const typeOptions = [
  { value: '', label: 'Select emp type...' },
  { value: 'Full-Time', label: 'Full-Time' },
  { value: 'Part-Time', label: 'Part-Time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
];

const levelOptions = [
  { value: '', label: 'Select level...' },
  { value: 'Entry-Level', label: 'Entry-Level' },
  { value: 'Junior', label: 'Junior' },
  { value: 'Mid-Level', label: 'Mid-Level' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Lead/Manager', label: 'Lead/Manager' },
];

const AdminDashboard = () => {
  const { jobs, addJob, deleteJob } = useJobStore();

  const [jobToDelete, setJobToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [jobs.length, currentPage, totalPages]);

  const renderPagination = () => {
    const pages = [];

    const PageButton = ({ pageNum, text }) => (
      <button
        key={`page-${pageNum}-${text || pageNum}`}
        onClick={() => setCurrentPage(pageNum)}
        className={`min-w-[36px] px-2 h-9 rounded-lg text-sm font-bold transition-colors ${
          currentPage === pageNum
            ? 'bg-indigo-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
        }`}
      >
        {text || pageNum}
      </button>
    );

    const Ellipsis = () => (
      <span className="px-1 text-gray-400 font-bold tracking-widest flex items-end pb-2">...</span>
    );

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(<PageButton key={i} pageNum={i} />);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(<PageButton key={i} pageNum={i} />);
      }
      pages.push(<Ellipsis key="ellipsis-end" />);
      pages.push(<PageButton key="last" pageNum={totalPages} text="Last" />);
    } else if (currentPage >= totalPages - 2) {
      pages.push(<PageButton key="first" pageNum={1} text="First" />);
      pages.push(<Ellipsis key="ellipsis-start" />);
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(<PageButton key={i} pageNum={i} />);
      }
    } else {
      pages.push(<PageButton key="first" pageNum={1} text="First" />);
      pages.push(<Ellipsis key="ellipsis-start" />);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(<PageButton key={i} pageNum={i} />);
      }
      pages.push(<Ellipsis key="ellipsis-end" />);
      pages.push(<PageButton key="last" pageNum={totalPages} text="Last" />);
    }

    return pages;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { type: '', level: '' },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      setSubmitSuccess(false);

      await addJob(data);

      reset();
      setSubmitSuccess(true);
      setCurrentPage(1);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError('Failed to publish job. Please check the connection.', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (jobToDelete) {
      try {
        setIsDeleting(true);
        setDeleteError('');
        setDeleteSuccess(false);

        await deleteJob(jobToDelete);

        setJobToDelete(null);
        setDeleteSuccess(true);
        setTimeout(() => setDeleteSuccess(false), 3000);
      } catch (error) {
        setDeleteError('Failed to delete job. Please try again.', error);
        setJobToDelete(null);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        <div className="mb-8 lg:mb-10 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-base lg:text-lg">
            Manage your organization's job postings and talent acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 h-fit lg:sticky lg:top-8 z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b border-gray-100">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <FaPlus className="text-sm sm:text-lg" />
              </div>
              Post New Job
            </h2>

            {submitSuccess && (
              <div className="mb-6 bg-green-50/80 border border-green-200 text-green-700 px-4 py-3.5 rounded-xl flex items-center shadow-sm">
                <FaCheckCircle className="mr-3 text-lg shrink-0" />
                <span className="text-sm font-semibold">Job published successfully!</span>
              </div>
            )}

            {submitError && (
              <div className="mb-6 bg-red-50/80 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl flex items-center shadow-sm">
                <FaExclamationTriangle className="mr-3 text-lg shrink-0" />
                <span className="text-sm font-semibold">{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior MERN Engineer"
                  {...register('title', { required: 'Job title is required' })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm sm:text-base"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. QuickHire Inc."
                  {...register('company', { required: 'Company name is required' })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm sm:text-base"
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Remote, Dhaka"
                    {...register('location', { required: 'Location is required' })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm sm:text-base"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering"
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm sm:text-base"
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Type"
                  options={typeOptions}
                  error={errors.type?.message}
                  className="bg-gray-50 px-4 py-2.5 border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 font-medium text-sm sm:text-base"
                  {...register('type', { required: 'Type is required' })}
                />
                <Select
                  label="Level"
                  options={levelOptions}
                  error={errors.level?.message}
                  className="bg-gray-50 px-4 py-2.5 border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 font-medium text-sm sm:text-base"
                  {...register('level', { required: 'Level is required' })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe the responsibilities and requirements..."
                  {...register('description', { required: 'Description is required' })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-sm sm:text-base"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-sm sm:text-base font-bold rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all"
                >
                  {isSubmitting ? 'Publishing Job...' : 'Publish Job Listing'}
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col min-h-[500px] lg:h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <FaBriefcase className="text-sm sm:text-lg" />
                </div>
                Active Listings
                <span className="ml-3 bg-gray-100 text-gray-600 py-1 px-2.5 sm:px-3 rounded-full text-xs sm:text-sm font-bold">
                  {jobs.length}
                </span>
              </h2>
            </div>

            {deleteSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center shadow-sm shrink-0">
                <FaCheckCircle className="mr-2 shrink-0" />
                <span className="text-sm font-medium">Job deleted successfully!</span>
              </div>
            )}

            {deleteError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center shadow-sm shrink-0">
                <FaExclamationTriangle className="mr-2 shrink-0" />
                <span className="text-sm font-medium">{deleteError}</span>
              </div>
            )}

            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
              {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 py-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <FaInbox className="text-2xl sm:text-3xl" />
                  </div>
                  <p className="text-base sm:text-lg font-medium">No job listings found.</p>
                  <p className="text-xs sm:text-sm text-gray-400 text-center px-4">
                    Post a new job from the left panel to get started.
                  </p>
                </div>
              ) : (
                currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all duration-300 gap-4"
                  >
                    <div className="w-full">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
                        {job.company} <span className="mx-2 text-gray-300">•</span> {job.location}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 sm:px-2.5 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                          {job.type || 'Full-Time'}
                        </span>
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-1 sm:px-2.5 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                          {job.level || 'Mid-Level'}
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-400 ml-1 sm:ml-2 mt-1 sm:mt-0">
                          Posted: {formatDate(job.created_at)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setJobToDelete(job.id)}
                      className="p-2.5 sm:p-3 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all sm:self-center self-end border border-transparent hover:border-red-100 shrink-0"
                      title="Delete Job"
                    >
                      <FaTrash className="text-sm sm:text-base" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {jobs.length > jobsPerPage && (
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between border-t border-gray-100 pt-5 sm:pt-6 mt-2 shrink-0 gap-4 sm:gap-0">
                <p className="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-left">
                  Showing <span className="font-bold text-gray-900">{indexOfFirstJob + 1}</span> to{' '}
                  <span className="font-bold text-gray-900">
                    {Math.min(indexOfLastJob, jobs.length)}
                  </span>{' '}
                  of <span className="font-bold text-gray-900">{jobs.length}</span> results
                </p>

                <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 custom-scrollbar">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 sm:p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center mr-0.5 sm:mr-1 shrink-0"
                  >
                    <FaChevronLeft className="text-xs sm:text-sm" />
                  </button>

                  {renderPagination()}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 sm:p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center ml-0.5 sm:ml-1 shrink-0"
                  >
                    <FaChevronRight className="text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {jobToDelete && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm transform transition-all animate-fade-in-up">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 sm:mb-5 border-[6px] border-red-50/50">
                  <FaExclamationTriangle className="text-xl sm:text-2xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">
                  Delete Job Listing?
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 font-medium px-1 sm:px-2">
                  Are you sure you want to permanently delete this job posting? This action cannot
                  be undone.
                </p>

                <div className="flex w-full gap-3">
                  <Button
                    onClick={() => setJobToDelete(null)}
                    disabled={isDeleting}
                    variant="secondary"
                    className="flex-1 !py-2.5 sm:!py-3 text-sm sm:text-base font-bold rounded-xl"
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    variant="danger"
                    className="flex-1 !py-2.5 sm:!py-3 text-sm sm:text-base font-bold rounded-xl shadow-lg shadow-red-500/30"
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
