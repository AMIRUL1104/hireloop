import JobCard from "./JobCard";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

// Server component — renders the grid of job cards
const JobGrid = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center mb-4">
          <HiOutlineMagnifyingGlass className="text-gray-500 text-2xl" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">No jobs found</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          No active job listings at the moment. Check back soon for new
          opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobGrid;
