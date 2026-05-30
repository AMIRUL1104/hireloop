// Banner Component - Server Component
// Matches the screenshot layout with globe background and styling

import SearchForm from "./SearchForm";
import Stats from "./Stats";

export default function Banner() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background linear */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-black to-black" />

      {/* Globe Background Image with Glow */}
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="relative w-full h-3/4">
          {/* Glow Effect Behind Globe */}
          <div className="absolute inset-0 bg-linear-radial from-blue-600/30 to-transparent rounded-full blur-3xl" />

          {/* Globe Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
            style={{
              backgroundImage: "url(/images/globe.png)",
            }}
          />
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/80" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section - Badge + Title + Description */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2  backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold">
              <span className="text-lg">🌍</span>
              <span>
                {" "}
                <b>50,000+ </b>{" "}
                <span className="text-white/50"> NEW JOBS THIS MONTH</span>
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Find Your Dream Job Today
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Join thousands of talented professionals. Browse carefully curated
            opportunities and find your next role — faster.
          </p>
        </div>

        {/* Search Form Section */}
        <div className="mb-12">
          <SearchForm />
        </div>

        {/* Filter Tags - Quick Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["All roles", "Direct connects", "AI Powered", "Top companies"].map(
            (tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gray-800/40 hover:bg-gray-700/60 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-300 border border-gray-700/50 backdrop-blur-sm"
              >
                {tag}
              </button>
            ),
          )}
        </div>

        {/* Central Message with Globe Context */}
        <div className="text-center mb-20 space-y-2">
          <p className="text-gray-400 text-base md:text-lg">
            Assisting over 15,000 job seekers
          </p>
          <p className="text-white text-xl md:text-2xl font-semibold">
            find their dream positions.
          </p>
        </div>

        {/* Statistics Section */}
        <Stats />
      </div>
    </section>
  );
}
