import Image from "next/image";
import {
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineCalendarDays,
  HiOutlineBriefcase,
  HiOutlineTag,
} from "react-icons/hi2";

const formatSalary = (min, max, currency) => {
  if (!min && !max) return null;
  const fmt = (n) => Number(n).toLocaleString();
  if (min && max) return `${fmt(min)} – ${fmt(max)} ${currency ?? "USD"}`;
  if (min) return `From ${fmt(min)} ${currency ?? "USD"}`;
  return `Up to ${fmt(max)} ${currency ?? "USD"}`;
};

const formatDeadline = (deadline) => {
  if (!deadline) return null;
  return new Date(deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// A single info row in the summary card
const SummaryRow = ({
  icon: Icon,
  label,
  value,
  valueClass = "text-gray-300",
}) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-gray-700/40 last:border-0">
    <Icon className="text-gray-500 text-base shrink-0" />
    <div className="flex-1 min-w-0">
      <span className="text-gray-500 text-xs">{label}: </span>
      <span className={`text-xs font-medium ${valueClass}`}>{value}</span>
    </div>
  </div>
);

// Sticky sidebar — shows key job info while user fills the form
const JobSummaryCard = ({ job }) => {
  const {
    jobTitle,
    companyName,
    companyLogo,
    jobType,
    category,
    salaryMin,
    salaryMax,
    currency,
    city,
    country,
    isRemote,
    deadline,
  } = job;

  const salary = formatSalary(salaryMin, salaryMax, currency);
  const location = isRemote
    ? "Remote"
    : [city, country].filter(Boolean).join(", ") || "Not specified";

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5">
      {/* Card label */}
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-4">
        Applying For
      </p>

      {/* Company logo + job title */}
      <div className="flex items-start gap-3 mb-5">
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
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-lg">
              {companyName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
            {jobTitle}
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">{companyName}</p>
        </div>
      </div>

      {/* Job meta rows */}
      <div>
        {jobType && (
          <SummaryRow icon={HiOutlineBriefcase} label="Type" value={jobType} />
        )}
        {category && (
          <SummaryRow icon={HiOutlineTag} label="Category" value={category} />
        )}
        <SummaryRow icon={HiOutlineMapPin} label="Location" value={location} />
        {salary && (
          <SummaryRow
            icon={HiOutlineCurrencyDollar}
            label="Salary"
            value={salary}
            valueClass="text-green-400"
          />
        )}
        {deadline && (
          <SummaryRow
            icon={HiOutlineCalendarDays}
            label="Deadline"
            value={formatDeadline(deadline)}
          />
        )}
      </div>

      {/* Remote badge */}
      {isRemote && (
        <div className="mt-4 inline-flex items-center gap-1.5 bg-purple-500/12 border border-purple-500/20 rounded-full px-3 py-1">
          <span className="text-purple-400 text-xs font-medium">
            🌐 Remote Position
          </span>
        </div>
      )}
    </div>
  );
};

export default JobSummaryCard;
