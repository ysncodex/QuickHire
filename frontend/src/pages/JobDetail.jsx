import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaBriefcase, FaArrowLeft, FaLayerGroup, FaClock } from 'react-icons/fa';
import { submitApplicationAPI, fetchJobByIdAPI } from '../services/api.js';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const loadJob = async () => {
      try {
        setIsLoading(true);
        const fetchedJob = await fetchJobByIdAPI(id);
        setJob(fetchedJob);
      } catch (err) {
        console.error('Error loading job:', err);
        setError('Job not found or has been removed.');
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        job_id: job.id,
        ...data,
      };

      await submitApplicationAPI(payload);

      setIsSubmitted(true);
      reset();
    } catch (error) {
      alert('Failed to submit application. Please check your connection and try again.', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Job Not Found'}</h2>
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          Return to Job Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-6 font-medium"
      >
        <FaArrowLeft className="mr-2" /> Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-gray-600 mb-4 font-medium">{job.company}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
              <span className="flex items-center bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                <FaMapMarkerAlt className="mr-2 text-indigo-400" /> {job.location}
              </span>
              <span className="flex items-center bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                <FaBriefcase className="mr-2 text-indigo-400" /> {job.category}
              </span>
              <span className="flex items-center bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                <FaLayerGroup className="mr-2 text-indigo-400" /> {job.level}
              </span>
              <span className="flex items-center bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                <FaClock className="mr-2 text-indigo-400" /> {job.type}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-600 whitespace-pre-line leading-relaxed">
              {job.description}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Apply Now</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1">Application Sent!</h3>
                <p className="text-sm">The employer will review your profile shortly.</p>
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
                          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm"
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
