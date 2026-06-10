import {
  HiOutlineBriefcase,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlineTag,
  HiOutlineWifi,
  HiOutlineClock,
} from "react-icons/hi2";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatSalary = (min, max, currency) => {
  if (!min && !max) return null;
  const fmt = (n) => Number(n).toLocaleString();
  if (min && max) return `${fmt(min)} – ${fmt(max)} ${currency ?? "USD"}`;
  if (min) return `From ${fmt(min)} ${currency ?? "USD"}`;
  return `Up to ${fmt(max)} ${currency ?? "USD"}`;
};

// A single row in the meta card
const MetaRow = ({
  icon: Icon,
  label,
  value,
  valueClass = "text-gray-300",
}) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-700/40 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700/50 flex items-center justify-center shrink-0">
      <Icon className="text-gray-400 text-sm" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
      <p className={`text-sm font-medium truncate ${valueClass}`}>{value}</p>
    </div>
  </div>
);

// Sidebar card — all key job metadata
const JobMetaCard = ({ job }) => {
  const {
    jobType,
    category,
    isRemote,
    city,
    country,
    salaryMin,
    salaryMax,
    currency,
    deadline,
    createdAt,
  } = job;

  const salary = formatSalary(salaryMin, salaryMax, currency);
  const location =
    [city, country].filter(Boolean).join(", ") || "Not specified";

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5">
      <h3 className="text-white font-semibold text-sm mb-1">Job Overview</h3>
      <p className="text-gray-500 text-xs mb-4">Key details at a glance</p>

      <MetaRow
        icon={HiOutlineBriefcase}
        label="Job Type"
        value={jobType ?? "—"}
      />
      <MetaRow icon={HiOutlineTag} label="Category" value={category ?? "—"} />
      <MetaRow icon={HiOutlineMapPin} label="Location" value={location} />
      <MetaRow
        icon={HiOutlineWifi}
        label="Remote"
        value={isRemote ? "Yes — Remote" : "No — On-site"}
        valueClass={isRemote ? "text-purple-400" : "text-gray-300"}
      />
      {salary && (
        <MetaRow
          icon={HiOutlineCurrencyDollar}
          label="Salary Range"
          value={salary}
          valueClass="text-green-400"
        />
      )}
      <MetaRow
        icon={HiOutlineCalendarDays}
        label="Application Deadline"
        value={formatDate(deadline)}
      />
      <MetaRow
        icon={HiOutlineClock}
        label="Posted On"
        value={formatDate(createdAt)}
      />
    </div>
  );
};

export default JobMetaCard;
