import { auth } from "@/lib/auth";
import { getCompanyJobPosts } from "@/lib/Server/api/jobs";
import { headers } from "next/headers";
import React from "react";

async function AllJobsPage() {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  const { user, isPending } = sessionData || {};

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  const companyId = await user?.companyId;
  //   console.log(companyId);

  const jobposts = await getCompanyJobPosts(companyId);

  //   console.log(jobposts);

  return <div>company jobs </div>;
}

export default AllJobsPage;
