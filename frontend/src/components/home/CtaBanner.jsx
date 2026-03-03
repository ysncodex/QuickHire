import CtaBannerImg from '../../assets/cta.avif';
import Button from '../common/Button';

const CtaBanner = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto mt-32 mb-20 px-4 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 transform -skew-y-2 origin-bottom-left rounded-[2rem] z-0 shadow-2xl"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-16 lg:py-24 gap-12 lg:gap-8">
        <div className="w-full lg:w-[48%] text-white space-y-8">
          <div className="inline-flex items-center bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase">
            <span className="w-2 h-2 bg-indigo-300 rounded-full mr-3 animate-pulse"></span>
            Built for Enterprise SaaS
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
            Post a Job. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-blue-100">
              Build Your Dream Team.
            </span>
          </h2>

          <p className="text-indigo-50 text-lg lg:text-xl font-medium max-w-xl leading-relaxed opacity-90">
            Reach thousands of candidates for only $10.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-5">
            <Button
              to="/signup"
              variant="primary"
              className="!bg-white !text-indigo-700 hover:!bg-indigo-50 !px-12 !py-5 text-lg font-bold shadow-2xl transition-transform hover:-translate-y-1"
            >
              Get Started for Free
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-[52%] flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative group perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-blue-400 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            <img
              src={CtaBannerImg}
              alt="QuickHire Admin Dashboard Preview"
              className="relative w-full max-w-[680px] object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 transform lg:translate-x-4 lg:rotate-1 group-hover:rotate-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
