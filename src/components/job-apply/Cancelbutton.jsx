"use client";

import { useRouter } from "next/navigation";
import { HiOutlineXMark } from "react-icons/hi2";

const CancelButton = ({ jobId }) => {
  const router = useRouter();

  const handleCancel = () => {
    router.push(`/browse-jobs/${jobId}`);
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-700/50 bg-transparent text-gray-400 hover:text-white hover:border-gray-600 text-sm font-medium transition-all duration-200"
    >
      <HiOutlineXMark className="text-base" />
      Cancel
    </button>
  );
};

export default CancelButton;
