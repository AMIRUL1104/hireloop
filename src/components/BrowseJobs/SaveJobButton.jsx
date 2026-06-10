"use client";

import { useState } from "react";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi2";

// Toggles save state locally — no backend yet
const SaveJobButton = ({ jobId }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved((prev) => !prev);
    // TODO: connect to /api/jobs/save endpoint
    console.log(saved ? `Unsaved job ${jobId}` : `Saved job ${jobId}`);
  };

  return (
    <button
      onClick={handleSave}
      aria-label={saved ? "Unsave job" : "Save job"}
      title={saved ? "Remove from saved" : "Save job"}
      className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200 ${
        saved
          ? "bg-purple-600/20 border-purple-500/40 text-purple-400"
          : "bg-gray-800 border-gray-700/50 text-gray-400 hover:border-purple-500/40 hover:text-purple-400"
      }`}
    >
      {saved ? (
        <HiBookmark className="text-base" />
      ) : (
        <HiOutlineBookmark className="text-base" />
      )}
    </button>
  );
};

export default SaveJobButton;
