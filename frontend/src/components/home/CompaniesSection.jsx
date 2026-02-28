// Location: src/components/home/CompaniesSection.jsx

const CompaniesSection = () => {
  return (
    <section className="py-6 border-b border-gray-100 pb-12 w-full z-10 relative">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <p className="text-gray-400 font-medium mb-8 text-center lg:text-left">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="text-2xl font-bold tracking-tighter text-gray-600">vodafone</span>
          <span className="text-3xl font-bold text-gray-600">intel</span>
          <span className="text-2xl tracking-[0.3em] font-semibold text-gray-600">T E S L A</span>
          <span className="text-3xl font-black text-gray-600">AMD</span>
          <span className="text-3xl font-bold text-gray-600">Talkit</span>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
