import { Link } from 'react-router-dom';

const CtaBanner = () => {
  return (
    <section className="relative w-full max-w-6xl mx-auto mt-24 mb-12 px-4 lg:px-0">
      {/* The Angled Blue Background */}
      <div className="absolute inset-0 bg-indigo-600 transform -skew-y-3 origin-bottom-left sm:rounded-3xl z-0"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-12 lg:py-16 gap-12">
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/2 text-white space-y-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Start posting <br /> jobs today
          </h2>
          <p className="text-indigo-100 text-lg font-medium">Start posting jobs for only $10.</p>
          <div className="pt-2">
            <Link
              to="/signup"
              className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-md hover:bg-gray-50 transition-colors shadow-lg"
            >
              Sign Up For Free
            </Link>
          </div>
        </div>

        {/* Right Side: Dashboard Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          {/* NOTE: Replace this src with your actual exported Figma dashboard image! */}
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
            alt="QuickHire Admin Dashboard Preview"
            className="w-full max-w-[500px] object-cover rounded-xl shadow-2xl border-4 border-white/10"
          />
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
