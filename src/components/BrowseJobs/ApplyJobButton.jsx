"use client";

import { useState } from "react";
import { HiOutlineArrowUpRight, HiOutlineCheckCircle } from "react-icons/hi2";

// Apply button — shows brief confirmation state, no backend yet
const ApplyJobButton = ({ jobId, jobTitle }) => {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (applied) return;
    // TODO: check subscription plan, open apply modal, connect to API
    console.log(`Applying to job ${jobId}: ${jobTitle}`);
    setApplied(true);
    // Reset after 3 seconds (demo only)
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <button
      onClick={handleApply}
      aria-label={applied ? "Applied" : "Apply to this job"}
      className={`flex items-center justify-center gap-1 w-8 h-8 rounded-lg border text-xs font-medium transition-all duration-200 ${
        applied
          ? "bg-green-600/20 border-green-500/40 text-green-400"
          : "bg-linear-to-r from-blue-600 to-purple-600 border-transparent text-white hover:opacity-90 hover:scale-105"
      }`}
      title={applied ? "Applied!" : "Quick apply"}
    >
      {applied ? (
        <HiOutlineCheckCircle className="text-base" />
      ) : (
        <HiOutlineArrowUpRight className="text-base" />
      )}
    </button>
  );
};

export default ApplyJobButton;
