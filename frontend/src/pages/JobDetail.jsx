import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useJobStore from '../store/useJobStore';
import { FaMapMarkerAlt, FaBriefcase, FaArrowLeft } from 'react-icons/fa';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobs = useJobStore((state) => state.jobs);

  const job = jobs.find((j) => j.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log('Application Submitted:', { job_id: id, ...data });
    setIsSubmitted(true);
    reset();
  };

  if (!job) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Job Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{job.company}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <FaMapMarkerAlt className="mr-2 text-gray-400" /> {job.location}
              </span>
              <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <FaBriefcase className="mr-2 text-gray-400" /> {job.category}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-600 whitespace-pre-line">
              {job.description}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Apply Now</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
                <p className="font-medium text-center">Application submitted successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address formatting',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume Link (URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    {...register('resume_link', {
                      required: 'Resume link is required',
                      pattern: {
                        value:
                          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&=]*)$/,
                        message: 'Must be a valid URL starting with http:// or https://',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.resume_link && (
                    <p className="text-red-500 text-xs mt-1">{errors.resume_link.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Note</label>
                  <textarea
                    rows="4"
                    {...register('cover_note', { required: 'Cover note is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  {errors.cover_note && (
                    <p className="text-red-500 text-xs mt-1">{errors.cover_note.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
