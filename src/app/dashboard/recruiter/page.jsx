import StatCard from "@/components/Dashboard/StatCard";
import { auth } from "@/lib/auth";
import {
  BriefcaseBusiness,
  CalendarCheck,
  FileText,
  Users,
} from "lucide-react";
import { headers } from "next/headers";

// ─── Mock / Static Recruiter Stats ────────────────────────────────────────────
const recruiterStats = [
  {
    id: "active-posts",
    icon: <FileText size={22} />,
    label: "Active Job Posts",
    value: "12",
    trend: "+3",
    trendType: "positive",
    variant: "default",
  },
  {
    id: "total-applicants",
    icon: <Users size={22} />,
    label: "Total Applicants",
    value: "847",
    trend: "+127",
    trendType: "positive",
    variant: "default",
  },
  {
    id: "new-applications",
    icon: <BriefcaseBusiness size={22} />,
    label: "New Applications",
    value: "342",
    trend: "+45",
    trendType: "positive",
    variant: "default",
  },
  {
    id: "scheduled-interviews",
    icon: <CalendarCheck size={22} />,
    label: "Interviews Scheduled",
    value: "28",
    trend: "+8",
    trendType: "positive",
    variant: "default",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const RecruiterPage = async () => {
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

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8 space-y-8">
      {/* ── Welcome Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Left – greeting */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500">
            {currentDate}
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Welcome back,{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user?.name ?? "Recruiter"}
            </span>{" "}
            👋
          </h1>

          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            Here&apos;s what&apos;s happening with your hiring pipeline today.
          </p>
        </div>

        {/* Right – role badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 w-fit shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-blue-500 dark:text-blue-400 uppercase">
            Recruiter Dashboard
          </span>
        </div>
      </div>

      {/* ── linear Divider ────────────────────────────────────────────────── */}
      <div className="h-px bg-linear-to-r from-blue-600/30 via-purple-600/20 to-transparent" />

      {/* ── Stats Section ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {recruiterStats.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecruiterPage;
