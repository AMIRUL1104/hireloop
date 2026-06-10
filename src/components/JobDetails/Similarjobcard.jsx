import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const formatSalary = (min, max, currency) => {
  if (!min && !max) return null;
  const fmt = (n) => Number(n).toLocaleString();
  if (min && max) return `${fmt(min)} – ${fmt(max)} ${currency ?? "USD"}`;
  if (min) return `From ${fmt(min)} ${currency ?? "USD"}`;
  return `Up to ${fmt(max)} ${currency ?? "USD"}`;
};

// Compact job card used in the similar jobs section
const SimilarJobCard = ({ job }) => {
  const {
    _id,
    jobTitle,
    companyName,
    companyLogo,
    city,
    country,
    isRemote,
    salaryMin,
    salaryMax,
    currency,
    jobType,
  } = job;

  const salary = formatSalary(salaryMin, salaryMax, currency);
  const location = isRemote
    ? "Remote"
    : [city, country].filter(Boolean).join(", ") || "—";

  return (
    <Link
      href={`/jobs/${_id}`}
      className="group flex items-start gap-3.5 bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/70 hover:bg-gray-900/80 transition-all duration-300"
    >
      {/* Company logo */}
      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-800 border border-gray-700/50 shrink-0 mt-0.5">
        {companyLogo ? (
          <Image
            src={companyLogo}
            alt={companyName}
            fill
            sizes="40px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-sm">
            {companyName?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
        )}
      </div>

      {/* Job info */}
      <div className="1 min-w-0">
        <h4 className="text-white text-sm font-semibold leading-snug group-hover:text-blue-300 transition-colors duration-200 truncate">
          {jobTitle}
        </h4>
        <p className="text-gray-400 text-xs mb-2">{companyName}</p>
        <div className="flex wrap gap-x-3 gap-y-1">
          <span className="flex items-center gap-1 text-gray-500 text-xs">
            <HiOutlineMapPin className="text-xs" />
            {location}
          </span>
          {salary && (
            <span className="flex items-center gap-1 text-green-400 text-xs font-medium">
              <HiOutlineCurrencyDollar className="text-xs" />
              {salary}
            </span>
          )}
        </div>
      </div>

      {/* Arrow icon */}
      <HiOutlineArrowRight className="text-gray-600 group-hover:text-gray-400 text-base shrink-0 mt-1 transition-colors duration-200" />
    </Link>
  );
};

export default SimilarJobCard;
