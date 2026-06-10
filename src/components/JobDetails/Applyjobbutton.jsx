"use client";

import { useState } from "react";
import { HiOutlineArrowUpRight, HiOutlineCheckCircle } from "react-icons/hi2";

// Primary apply button — full width, gradient, sidebar CTA
const ApplyJobButton = ({ jobId, jobTitle }) => {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    if (applied || loading) return;
    setLoading(true);
    // TODO: check user subscription plan, open apply modal, submit to API
    console.log(`Applying to job ${jobId}: ${jobTitle}`);
    setTimeout(() => {
      setLoading(false);
      setApplied(true);
    }, 1000);
  };

  if (applied) {
    return (
      <div className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600/15 border border-green-500/30 text-green-300 font-semibold text-sm">
        <HiOutlineCheckCircle className="text-base" />
        Application Submitted
      </div>
    );
  }

  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <HiOutlineArrowUpRight className="text-base" />
          Apply Now
        </>
      )}
    </button>
  );
};

export default ApplyJobButton;
