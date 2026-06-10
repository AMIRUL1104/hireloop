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

// import JobFilters from "@/components/BrowseJobs/JobFilters";
// import JobGrid from "@/components/BrowseJobs/JobGrid";
// import JobHeader from "@/components/BrowseJobs/JobHeader";
// import { getAllJObs } from "@/lib/Server/api/jobs";

// // ১. ডাইনামিক মেটাডেটা জেনারেটর
// export async function generateMetadata() {
//   const allJobs = await getAllJObs();

//   // শুধুমাত্র active এবং publicly visible জব ফিল্টার
//   const visibleJobs =
//     allJobs?.filter(
//       (job) => job.status === "active" && job.isPubliclyVisible,
//     ) ?? [];

//   const totalJobs = visibleJobs.length;
//   const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL || process.env.BETTER_AUTH_URL;

//   return {
//     title: `Browse Jobs — ${totalJobs} Open Positions | HireLoop`,
//     description: `Explore ${totalJobs} active job opportunities on HireLoop. Filter by location, job type, salary, and category. Find your next career move today.`,
//     keywords: [
//       "browse jobs",
//       "job listings",
//       "find jobs",
//       "job search",
//       "remote jobs",
//       "full time jobs",
//       "HireLoop careers",
//     ],
//     openGraph: {
//       title: `Browse Jobs — ${totalJobs} Open Positions | HireLoop`,
//       description: `Explore ${totalJobs} active job listings on HireLoop. Filter by role, location, salary, and more.`,
//       url: `${siteUrl}/jobs`,
//       siteName: "HireLoop",
//       type: "website",
//     },
//     twitter: {
//       card: "summary",
//       title: `Browse Jobs — ${totalJobs} Open Positions | HireLoop`,
//       description: `Find your next opportunity from ${totalJobs} active jobs on HireLoop.`,
//     },
//     alternates: {
//       canonical: `${siteUrl}/jobs`,
//     },
//   };
// }

// // ২. মেইন পেজ কম্পোনেন্ট
// const BrowseJobsPage = async () => {
//   const allJobs = await getAllJObs();

//   const visibleJobs =
//     allJobs?.filter(
//       (job) => job.status === "active" && job.isPubliclyVisible,
//     ) ?? [];

//   return (
//     <div className="min-h-screen bg-gray-950">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <JobHeader totalJobs={visibleJobs.length} />
//         {/* Filters are client-side interactive */}
//         <JobFilters />
//         <JobGrid jobs={visibleJobs} />
//       </div>
//     </div>
//   );
// };

// export default BrowseJobsPage;
