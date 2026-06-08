import PostJobButton from "./PostJobButton";

// ── Server Component ──────────────────────────────────────────────────────────
export default function ManageJobsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      {/* Left: title + description */}
      <div className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Manage Jobs
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {`Manage and monitor all your company's job postings.
`}{" "}
        </p>
      </div>

      {/* Right: post job button */}
      <PostJobButton />
    </div>
  );
}
