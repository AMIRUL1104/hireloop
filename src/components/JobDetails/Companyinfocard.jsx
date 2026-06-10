import Image from "next/image";
import {
  HiOutlineMapPin,
  HiOutlineUsers,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import ViewCompanyButton from "./Viewcompanybutton";

// Server component — shows company profile in sidebar
const CompanyInfoCard = ({ job }) => {
  const { companyId, companyName, companyLogo, city, country } = job;

  const location =
    [city, country].filter(Boolean).join(", ") || "Location not listed";

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5">
      <h3 className="text-white font-semibold text-sm mb-4">
        About the Company
      </h3>

      {/* Logo + Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-800 border border-gray-700/50 shrink-0">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${companyName} logo`}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-lg">
              {companyName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">
            {companyName}
          </p>
          <p className="text-gray-500 text-xs">Verified Company</p>
        </div>
      </div>

      {/* Company meta */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <HiOutlineMapPin className="text-sm text-gray-500 shrink-0" />
          <span>{location}</span>
        </div>
        {/* Placeholder fields — replace with real company data when available */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <HiOutlineBuildingOffice2 className="text-sm text-gray-500 shrink-0" />
          <span>Industry not specified</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <HiOutlineUsers className="text-sm text-gray-500 shrink-0" />
          <span>Company size not specified</span>
        </div>
      </div>

      <ViewCompanyButton companyId={companyId} companyName={companyName} />
    </div>
  );
};

export default CompanyInfoCard;
