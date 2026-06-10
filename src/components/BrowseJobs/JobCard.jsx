import Image from "next/image";
import {
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import JobBadge from "./Jobbadge";
import ViewJobButton from "./ViewJobButton";
import SaveJobButton from "./SaveJobButton";
import ApplyJobButton from "./ApplyJobButton";

// Formats salary — e.g. "$50,000 - $80,000 USD"
const formatSalary = (min, max, currency) => {
  if (!min && !max) return null;
  const fmt = (n) => Number(n).toLocaleString();
  if (min && max) return `${fmt(min)} – ${fmt(max)} ${currency ?? "USD"}`;
  if (min) return `From ${fmt(min)} ${currency ?? "USD"}`;
  return `Up to ${fmt(max)} ${currency ?? "USD"}`;
};

// Formats deadline — shows "X days left" or "Expired"
const formatDeadline = (deadline) => {
  if (!deadline) return null;
  const today = new Date();
  const end = new Date(deadline);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: "Expired", expired: true };
  if (diff === 0) return { label: "Closes today", urgent: true };
  if (diff <= 3) return { label: `${diff}d left`, urgent: true };
  return { label: `${diff}d left`, urgent: false };
};

// Server component — renders a single job card
const JobCard = ({ job }) => {
  const {
    _id,
    jobTitle,
    companyName,
    companyLogo,
    category,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    city,
    country,
    isRemote,
    deadline,
    responsibilities,
    createdAt,
  } = job;

  const salary = formatSalary(salaryMin, salaryMax, currency);
  const deadlineInfo = formatDeadline(deadline);

  // Truncate responsibilities preview to ~100 chars
  const preview = responsibilities
    ? responsibilities
        .replace(/<[^>]*>/g, "")
        .slice(0, 100)
        .trim() + "..."
    : null;

  return (
    <div className="group flex flex-col bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 hover:border-gray-600/70 hover:bg-gray-900/80 transition-all duration-300 hover:-translate-y-0.5">
      {/* Card Top: Logo + Company + Badges */}
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Company Logo */}
        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gray-800 border border-gray-700/50 shrink-0">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${companyName} logo`}
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            // Fallback: first letter of company name
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-lg">
              {companyName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>

        {/* Job Type + Remote badges */}
        <div className="flex flex-wrap gap-1.5 justify-end">
          {jobType && <JobBadge type="jobType" value={jobType} />}
          {isRemote && <JobBadge type="remote" value="Remote" />}
        </div>
      </div>

      {/* Job Title */}
      <h2 className="text-white font-semibold text-base leading-snug mb-1 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
        {jobTitle}
      </h2>

      {/* Company Name */}
      <p className="text-gray-400 text-sm mb-3">{companyName}</p>

      {/* Category badge */}
      {category && (
        <div className="mb-3">
          <JobBadge type="category" value={category} />
        </div>
      )}

      {/* Meta info */}
      <div className="space-y-2 mb-4">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
          <HiOutlineMapPin className="text-sm shrink-0" />
          <span>
            {isRemote
              ? "Remote"
              : [city, country].filter(Boolean).join(", ") ||
                "Location not specified"}
          </span>
        </div>

        {/* Salary */}
        {salary && (
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <HiOutlineCurrencyDollar className="text-sm shrink-0" />
            <span className="text-green-400 font-medium">{salary}</span>
          </div>
        )}

        {/* Deadline */}
        {deadlineInfo && (
          <div className="flex items-center gap-1.5 text-xs">
            <HiOutlineCalendarDays className="text-sm shrink-0 text-gray-500" />
            <span
              className={
                deadlineInfo.expired
                  ? "text-red-400"
                  : deadlineInfo.urgent
                    ? "text-orange-400"
                    : "text-gray-500"
              }
            >
              {deadlineInfo.label}
            </span>
          </div>
        )}
      </div>

      {/* Responsibilities preview */}
      {preview && (
        <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
          {preview}
        </p>
      )}

      {/* Divider */}
      <div className="border-t border-gray-700/50 pt-4 mt-auto">
        <div className="flex items-center gap-2">
          {/* View Details — takes most space */}
          <ViewJobButton jobId={_id} />

          {/* Save + Apply */}
          <SaveJobButton jobId={_id} />
          <ApplyJobButton jobId={_id} jobTitle={jobTitle} />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
