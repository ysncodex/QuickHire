import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useJobStore from '../store/useJobStore';
import { FaTrash, FaPlus, FaExclamationTriangle } from 'react-icons/fa';
import { formatDate } from '../utils/formatters.js';

const AdminDashboard = () => {
  const { jobs, addJob, deleteJob } = useJobStore();

  const [jobToDelete, setJobToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newJob = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...data,
    };

    addJob(newJob);
    reset();
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete);
      setJobToDelete(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-0 py-8 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Manage job postings and applications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FaPlus className="mr-2 text-blue-600" /> Post New Job
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                {...register('title', { required: 'Job title is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                {...register('company', { required: 'Company name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Remote, Dhaka"
                  {...register('location', { required: 'Location is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g., Engineering"
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                rows="5"
                {...register('description', { required: 'Description is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Publish Job
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Manage Listings ({jobs.length})
          </h2>

          <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
            {jobs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No jobs posted yet.</p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Posted: {formatDate(job.created_at)}
                    </p>
                  </div>

                  <button
                    onClick={() => setJobToDelete(job.id)}
                    className="p-3 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-md transition-all"
                    title="Delete Job"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {jobToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-xl">
                <FaExclamationTriangle />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Job Posting?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this job? This action cannot be undone.
              </p>

              <div className="flex w-full gap-3">
                <button
                  onClick={() => setJobToDelete(null)}
                  className="flex-1 py-2.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
