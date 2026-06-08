import PostJobButton from "./PostJobButton";
import { FiBriefcase } from "react-icons/fi";

// hasJobs = true means jobs exist but filter returned nothing
// hasJobs = false means no jobs posted at all
export default function EmptyState({ hasJobs }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-5">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
        <FiBriefcase className="text-blue-500 dark:text-blue-400 text-2xl" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {hasJobs ? "No jobs match your filters" : "No jobs found"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          {hasJobs
            ? "Try adjusting your search or filter criteria."
            : "You haven't posted any jobs yet."}
        </p>
      </div>

      {/* CTA — only show when no jobs exist at all */}
      {!hasJobs && <PostJobButton />}
    </div>
  );
}
