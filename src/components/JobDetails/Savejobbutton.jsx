"use client";

import { useState } from "react";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi2";

const SaveJobButton = ({ jobId }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved((prev) => !prev);
    // TODO: connect to save/unsave API endpoint
    console.log(saved ? `Unsaved job ${jobId}` : `Saved job ${jobId}`);
  };

  return (
    <button
      onClick={handleSave}
      aria-label={saved ? "Remove from saved" : "Save this job"}
      className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
        saved
          ? "bg-purple-600/15 border-purple-500/40 text-purple-300"
          : "bg-gray-800 border-gray-700/50 text-gray-300 hover:border-gray-600 hover:text-white"
      }`}
    >
      {saved ? (
        <HiBookmark className="text-base" />
      ) : (
        <HiOutlineBookmark className="text-base" />
      )}
      {saved ? "Saved" : "Save Job"}
    </button>
  );
};

export default SaveJobButton;
