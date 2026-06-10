import { HiOutlineBriefcase } from "react-icons/hi2";

// Static header section with title, subtitle, and job count
const JobHeader = ({ totalJobs }) => {
  return (
    <div className="mb-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
        <HiOutlineBriefcase className="text-blue-400 text-sm" />
        <span className="text-blue-400 text-xs font-medium tracking-wide">
          Live Job Listings
        </span>
      </div>

      {/* Title + Subtitle */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
        Browse Jobs
      </h1>
      <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
        Discover thousands of opportunities from top companies around the world.
        Find your perfect match today.
      </p>

      {/* Total count */}
      {totalJobs > 0 && (
        <p className="mt-4 text-sm text-gray-500">
          Showing{" "}
          <span className="text-purple-400 font-semibold">{totalJobs}</span>{" "}
          available {totalJobs === 1 ? "position" : "positions"}
        </p>
      )}
    </div>
  );
};

export default JobHeader;
