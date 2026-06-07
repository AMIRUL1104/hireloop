import JobPostForm from "@/components/Jobpost/JobPostForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// ── Server Component ──────────────────────────────────────────────────────────
export default async function JobPostPage() {
  const sessionData = await auth.api.getSession({ headers: await headers() });
  const { user } = sessionData || {};

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          Post a Job
        </span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Post a New Job
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fill in the details below to publish your job listing on HireLoop.
          </p>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 w-fit shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Goes live immediately
          </span>
        </div>
      </div>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-transparent" />

      {/* Form (Client Component) */}
      <JobPostForm recruiter={user} />
    </div>
  );
}
