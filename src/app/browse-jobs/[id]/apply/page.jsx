import { redirect } from "next/navigation";
import Link from "next/link";
import getUserSession from "@/lib/core/session";

import {
  HiOutlineArrowLeft,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import JobApplicationForm from "@/components/job-apply/Jobapplicationform";
import JobSummaryCard from "@/components/job-apply/Jobsummarycard";
import { getJobsById } from "@/lib/Server/api/jobs";
import { getApplicationByApplicant } from "@/lib/Server/api/jobApplications";
import { getPlanById } from "@/lib/Server/api/plans";

// const plan = {
//   name: "free",
//   maxApplicationPerMonth: 3,
// };

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

  // if user not logged in
  if (!user) {
    redirect(`/signin?redirect=/browse-jobs/${id}/apply`);
  }

  // if user not job seeker
  if (user?.role !== "seeker") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center max-w-sm">
          <p className="text-gray-300 font-medium text-lg">
            Only job seekers can apply for a job.
          </p>
        </div>
      </div>
    );
  }

  const plan = await getPlanById(user?.plan);

  // console.log(plan);

  const appliedJobs = await getApplicationByApplicant(user.id);
  const totalApplied = appliedJobs.length;
  // console.log(totalApplied, appliedJobs, "userId", user);

  const isLimitReached = totalApplied >= plan.maxApplicationsPerMonth;

  // if job data not found in database
  const job = await getJobsById(id);
  if (!job) return <JobNotFound />;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
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

        {/* Plan / Usage Status Section */}
        <div className="mb-8 p-5 bg-gray-900/50 border border-gray-800/80 rounded-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold tracking-wider uppercase px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                  {plan.name} Plan
                </span>
                <h2 className="text-sm font-medium text-gray-300">
                  Monthly Usage
                </h2>
              </div>
              <p className="text-lg font-semibold text-white">
                You have applied so far:{" "}
                <span
                  className={isLimitReached ? "text-rose-500" : "text-blue-400"}
                >
                  {totalApplied}
                </span>{" "}
                <span className="text-gray-500 text-sm font-normal">
                  out of {plan.maxApplicationsPerMonth} this month
                </span>
              </p>
            </div>

            {/* Upgrade CTA Button */}
            <div>
              <Link
                href="/subscription"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white shadow-xs transition-opacity duration-200"
              >
                <HiOutlineSparkles className="text-sm" />
                Upgrade Plan
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isLimitReached
                  ? "bg-rose-500"
                  : "bg-linear-to-r from-blue-500 to-indigo-500"
              }`}
              style={{
                width: `${Math.min((totalApplied / plan.maxApplicationPerMonth) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Conditional Layout Rendering */}
        {isLimitReached ? (
          /* Limit Reached Warning Card */
          <div className="max-w-xl mx-auto mt-12 p-8 bg-gray-900 border border-rose-500/20 rounded-2xl text-center shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
              <HiOutlineExclamationTriangle className="text-rose-500 text-xl" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">
              Application Limit Reached
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {`You've used all 3 free applications for this month. Purchase a
              subscription plan to unlock unlimited job applications and premium
              features.`}
            </p>
            <Link
              href="/subscription"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-600/10"
            >
              View Subscription Plans
            </Link>
          </div>
        ) : (
          /* Main Form Layout (Only visible if within limit) */
          <div>
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
              {/* LEFT: Application form */}
              <div className="flex-1 min-w-0 w-full">
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
        )}
      </div>
    </div>
  );
}

export default ApplyPage;
