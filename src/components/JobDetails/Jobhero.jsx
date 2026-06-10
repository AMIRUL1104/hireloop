import Image from "next/image";
import {
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

// Color map for job type badges
const jobTypeBadge = {
  "Full-time": "bg-blue-500/15 text-blue-300 border border-blue-500/20",
  "Part-time": "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20",
  Remote: "bg-purple-500/15 text-purple-300 border border-purple-500/20",
  Contract: "bg-orange-500/15 text-orange-300 border border-orange-500/20",
  Internship: "bg-pink-500/15 text-pink-300 border border-pink-500/20",
};

const formatSalary = (min, max, currency) => {
  if (!min && !max) return null;
  const fmt = (n) => Number(n).toLocaleString();
  if (min && max) return `${fmt(min)} – ${fmt(max)} ${currency ?? "USD"}`;
  if (min) return `From ${fmt(min)} ${currency ?? "USD"}`;
  return `Up to ${fmt(max)} ${currency ?? "USD"}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const deadlineStatus = (deadline) => {
  if (!deadline) return null;
  const diff = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24),
  );
  if (diff < 0) return { text: "Deadline passed", cls: "text-red-400" };
  if (diff === 0) return { text: "Closes today", cls: "text-orange-400" };
  if (diff <= 5) return { text: `${diff} days left`, cls: "text-orange-400" };
  return { text: `Apply by ${formatDate(deadline)}`, cls: "text-gray-400" };
};

// Job hero — title, company, badges, key meta
const JobHero = ({ job }) => {
  const {
    jobTitle,
    companyName,
    companyLogo,
    category,
    jobType,
    isRemote,
    salaryMin,
    salaryMax,
    currency,
    city,
    country,
    deadline,
  } = job;

  const salary = formatSalary(salaryMin, salaryMax, currency);
  const dl = deadlineStatus(deadline);
  const badgeStyle =
    jobTypeBadge[jobType] ??
    "bg-gray-700/50 text-gray-400 border border-gray-600/30";
  const location = isRemote
    ? "Remote"
    : [city, country].filter(Boolean).join(", ") || "Location not specified";

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6">
      {/* Logo + Title row */}
      <div className="flex items-start gap-4 mb-5">
        {/* Company logo */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-800 border border-gray-700/50 shrink-0">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${companyName} logo`}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">
              {companyName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>

        {/* Title + company */}
        <div className="1 min-w-0">
          <h1 className="text-white text-xl sm:text-2xl font-bold leading-tight mb-1">
            {jobTitle}
          </h1>
          <p className="text-gray-400 text-sm font-medium">{companyName}</p>
        </div>
      </div>

      {/* Badges row */}
      <div className="flex wrap gap-2 mb-5">
        {/* Job type */}
        {jobType && (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeStyle}`}
          >
            {jobType}
          </span>
        )}
        {/* Remote */}
        {isRemote && (
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/20">
            🌐 Remote
          </span>
        )}
        {/* Category */}
        {category && (
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/20">
            {category}
          </span>
        )}
      </div>

      {/* Key meta info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <HiOutlineMapPin className="text-base text-gray-500 shrink-0" />
          <span>{location}</span>
        </div>
        {salary && (
          <div className="flex items-center gap-2 text-sm">
            <HiOutlineCurrencyDollar className="text-base text-gray-500 shrink-0" />
            <span className="text-green-400 font-medium">{salary}</span>
          </div>
        )}
        {dl && (
          <div className="flex items-center gap-2 text-sm">
            <HiOutlineCalendarDays className="text-base text-gray-500 shrink-0" />
            <span className={dl.cls}>{dl.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHero;
