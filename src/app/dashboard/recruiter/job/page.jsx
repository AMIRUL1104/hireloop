// import { auth } from "@/lib/auth";
// import { getCompanyJobPosts } from "@/lib/Server/api/jobs";
// import { headers } from "next/headers";
// import React from "react";

// async function AllJobsPage() {
//   const sessionData = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const { user, isPending } = sessionData || {};

//   if (isPending) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
//           Loading...
//         </p>
//       </div>
//     );
//   }

//   const companyId = await user?.companyId;
//   //   console.log(companyId);

//   const jobposts = await getCompanyJobPosts(companyId);

//   //   console.log(jobposts);

//   return <div>company jobs </div>;
// }

// export default AllJobsPage;
import ManageJobsClient from "@/components/Dashboard/reqruiter/jobs/ManageJobsClient";
import ManageJobsHeader from "@/components/Dashboard/reqruiter/jobs/ManageJobsHeader";
import { MOCK_JOBS } from "@/components/Dashboard/reqruiter/jobs/Mockdata";
import { auth } from "@/lib/auth";
import { getCompanyJobPosts } from "@/lib/Server/api/jobs";
import { headers } from "next/headers";

// ── Server Component ──────────────────────────────────────────────────────────
export default async function ManageJobsPage() {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  const { user, isPending } = sessionData || {};

  const companyId = await user?.companyId;
  //   console.log(companyId);

  const jobposts = await getCompanyJobPosts(companyId);

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8 space-y-6">
      {/* Page header — static, server rendered */}
      <ManageJobsHeader />

      {/* Gradient divider */}
      <div className="h-px bg-linear-to-r from-blue-600/30 via-purple-600/20 to-transparent" />

      {/* All interactive UI lives in the client component */}
      <ManageJobsClient initialJobs={jobposts} />
    </div>
  );
}
