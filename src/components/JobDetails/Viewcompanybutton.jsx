"use client";

import { useRouter } from "next/navigation";
import { HiOutlineBuildingOffice2, HiOutlineArrowRight } from "react-icons/hi2";

const ViewCompanyButton = ({ companyId, companyName }) => {
  const router = useRouter();

  const handleClick = () => {
    // TODO: navigate to company profile page when implemented
    console.log(`View company: ${companyName} (${companyId})`);
    router.push(`/companies/${companyId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-700/50 bg-gray-800 text-gray-300 hover:border-gray-600 hover:text-white text-sm font-medium transition-all duration-200 group"
    >
      <HiOutlineBuildingOffice2 className="text-base" />
      View Company Profile
      <HiOutlineArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
    </button>
  );
};

export default ViewCompanyButton;
