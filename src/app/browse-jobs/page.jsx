import JobFilters from "@/components/BrowseJobs/JobFilters";
import JobGrid from "@/components/BrowseJobs/JobGrid";
import JobHeader from "@/components/BrowseJobs/JobHeader";
import { getAllJObs } from "@/lib/Server/api/jobs";

const BrowseJobsPage = async () => {
  const allJobs = await getAllJObs();

  // Only show active + publicly visible jobs
  const visibleJobs =
    allJobs?.filter(
      (job) => job.status === "active" && job.isPubliclyVisible,
    ) ?? [];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <JobHeader totalJobs={visibleJobs.length} />

        {/* Filters are client-side interactive */}
        <JobFilters />

        <JobGrid jobs={visibleJobs} />
      </div>
    </div>
  );
};

export default BrowseJobsPage;
