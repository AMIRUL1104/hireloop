import { redirect } from "next/navigation";
import Link from "next/link";
import getUserSession from "@/lib/core/session";

import { HiOutlineArrowLeft, HiOutlineBriefcase } from "react-icons/hi2";
import JobApplicationForm from "@/components/job-apply/Jobapplicationform";
import JobSummaryCard from "@/components/job-apply/Jobsummarycard";
import { getJobsById } from "@/lib/Server/api/jobs";
import { toast } from "react-toastify";

// Empty state — job not found
const JobNotFound = () => (
  <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 text-center">
    <div className="w-14 h-14 rounded-2xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center mb-5">
      <HiOutlineBriefcase className="text-gray-500 text-2xl" />
    </div>
    <h1 className="text-white text-2xl font-bold mb-3">Job Not Found</h1>
    <p className="text-gray-400 text-sm max-w-xs mb-6">
      The job you are trying to apply for is unavailable or has been removed.
    </p>
    <Link
      href="/browse-jobs"
      className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-opacity duration-200"
    >
      <HiOutlineArrowLeft className="text-base" />
      Back to Jobs
    </Link>
  </div>
);

async function ApplyPage({ params }) {
  const { id } = await params;

  // Auth check — redirect to signin if no session
  const user = await getUserSession();
  if (!user) {
    redirect(`/signin?redirect=/browse-jobs/${id}/apply`);
  }
  if (user?.role !== "seeker") {
    redirect(`/browse-jobs`);
    // toast.error(`As A ${user?.role} ,you are not able to apply a job !`);
  }
  // console.log(user);

  const job = await getJobsById(id);
  if (!job) return <JobNotFound />;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link + breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href={`/browse-jobs/${id}`}
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
          >
            <HiOutlineArrowLeft className="text-base group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Job
          </Link>
          <span className="text-gray-700 text-sm">/</span>
          <span className="text-gray-500 text-sm truncate max-w-xs">
            {job.jobTitle}
          </span>
        </div>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
            Apply for this Job
          </h1>
          <p className="text-gray-400 text-sm">
            Complete the form below. This takes less than 2 minutes.
          </p>
        </div>

        {/* Two-column layout: form + sticky sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT: Application form (Client Component) */}
          <div className="flex-1 min-w-0">
            <JobApplicationForm job={job} userId={user?.id} />
          </div>

          {/* RIGHT: Sticky job summary */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="lg:sticky lg:top-6">
              <JobSummaryCard job={job} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyPage;
