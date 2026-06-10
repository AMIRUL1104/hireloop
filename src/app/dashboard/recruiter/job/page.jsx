// export default AllJobsPage;
import ManageJobsClient from "@/components/Dashboard/reqruiter/jobs/ManageJobsClient";
import ManageJobsHeader from "@/components/Dashboard/reqruiter/jobs/ManageJobsHeader";

import { auth } from "@/lib/auth";
import { getReqruiterPostedJObs } from "@/lib/Server/api/jobs";

import { headers } from "next/headers";

// ── Server Component ──────────────────────────────────────────────────────────
export default async function ManageJobsPage() {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  const { user, isPending } = sessionData || {};

  const reqruiterId = user.id;
  const reqruiterPostedJObs = await getReqruiterPostedJObs(reqruiterId);

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8 space-y-6">
      {/* Page header — static, server rendered */}
      <ManageJobsHeader />

      {/* Gradient divider */}
      <div className="h-px bg-linear-to-r from-blue-600/30 via-purple-600/20 to-transparent" />

      {/* All interactive UI lives in the client component */}
      <ManageJobsClient initialJobs={reqruiterPostedJObs} />
    </div>
  );
}
