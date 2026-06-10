"use client";

import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

// Navigates to the job details page
const ViewJobButton = ({ jobId }) => {
  return (
    <Link
      href={`/browse-jobs/${jobId}`}
      className="flex-1 flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700/50 hover:border-gray-600 text-gray-300 hover:text-white text-xs font-medium rounded-lg px-3 py-2 transition-all duration-200"
    >
      View Details
      <HiOutlineArrowRight className="text-sm" />
    </Link>
  );
};

export default ViewJobButton;
