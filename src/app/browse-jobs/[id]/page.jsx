import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import { getAllJObs, getJobsById } from "@/lib/Server/api/jobs";
import JobHero from "@/components/JobDetails/Jobhero";
import JobRequirements from "@/components/JobDetails/Jobrequirements";
import JobBenefits from "@/components/JobDetails/Jobbenefits";
import JobDescription from "@/components/JobDetails/Jobdescription";
import ApplyJobButton from "@/components/JobDetails/Applyjobbutton";
import SaveJobButton from "@/components/JobDetails/Savejobbutton";
import ShareJobButton from "@/components/JobDetails/Sharejobbutton";
import JobMetaCard from "@/components/JobDetails/Jobmetacard";
import CompanyInfoCard from "@/components/JobDetails/Companyinfocard";
import SimilarJobs from "@/components/JobDetails/Similarjobs";
// Fetch a single job by ID from backend
// async function getJob(id) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
//       cache: "no-store",
//     });
//     if (!res.ok) return null;
//     return res.json();
//   } catch {
//     return null;
//   }
// }

// Fetch all jobs for similar jobs section
// async function getAllJobs() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
//       cache: "no-store",
//     });
//     if (!res.ok) return [];
//     return res.json();
//   } catch {
//     return [];
//   }
// }

async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await getJobsById(id);

  // Empty state — job not found
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center mb-5">
          <HiOutlineArrowLeft className="text-gray-500 text-2xl" />
        </div>
        <h1 className="text-white text-2xl font-bold mb-3">Job Not Found</h1>
        <p className="text-gray-400 text-sm max-w-xs mb-6">
          The job you are looking for does not exist or has been removed.
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
  }

  // Fetch all jobs for similar jobs (filter out current job + same category)
  const allJobs = await getAllJObs();
  const similarJobs = allJobs
    .filter(
      (j) =>
        j._id !== job._id &&
        j.category === job.category &&
        j.status === "active",
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back navigation */}
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors duration-200 group"
        >
          <HiOutlineArrowLeft className="text-base group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to Jobs
        </Link>

        {/* Main layout: content + sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT: Main Content */}
          <div className="flex-1 min-w-0 space-y-5">
            <JobHero job={job} />
            <JobDescription responsibilities={job.responsibilities} />
            <JobRequirements requirements={job.requirements} />
            {job.benefits && <JobBenefits benefits={job.benefits} />}
          </div>

          {/* RIGHT: Sticky Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="lg:sticky lg:top-6 space-y-4">
              {/* Action buttons */}
              <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 space-y-3">
                <ApplyJobButton jobId={job._id} jobTitle={job.jobTitle} />
                <div className="grid grid-cols-2 gap-2.5">
                  <SaveJobButton jobId={job._id} />
                  <ShareJobButton jobTitle={job.jobTitle} />
                </div>
              </div>

              <JobMetaCard job={job} />
              <CompanyInfoCard job={job} />
            </div>
          </div>
        </div>

        {/* Similar Jobs — below full-width */}
        {similarJobs.length > 0 && (
          <div className="mt-10">
            <SimilarJobs jobs={similarJobs} />
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetailsPage;
