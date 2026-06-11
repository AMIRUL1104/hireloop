"use client";
import { useRouter } from "next/navigation";
import { HiOutlineBriefcase } from "react-icons/hi2";

const ViewJobsButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/browse-jobs")}
      className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-gray-700/50 bg-gray-800 hover:border-gray-600 hover:text-white text-gray-300 text-sm font-semibold transition-all duration-200"
    >
      <HiOutlineBriefcase className="text-base" />
      View Jobs
    </button>
  );
};
export default ViewJobsButton;
