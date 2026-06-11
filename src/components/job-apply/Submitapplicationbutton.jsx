"use client";

import { HiOutlineArrowUpRight } from "react-icons/hi2";

const SubmitApplicationButton = ({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
  >
    {isSubmitting ? (
      <>
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        Submitting...
      </>
    ) : (
      <>
        <HiOutlineArrowUpRight className="text-base" />
        Submit Application
      </>
    )}
  </button>
);

export default SubmitApplicationButton;
