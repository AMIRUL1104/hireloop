"use client";

import { useState } from "react";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi2";

const SaveDraftButton = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: save form state to localStorage or API
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
        saved
          ? "bg-purple-600/15 border-purple-500/40 text-purple-300"
          : "bg-gray-800 border-gray-700/50 text-gray-300 hover:border-gray-600 hover:text-white"
      }`}
    >
      {saved ? (
        <>
          <HiBookmark className="text-base" /> Draft Saved
        </>
      ) : (
        <>
          <HiOutlineBookmark className="text-base" /> Save Draft
        </>
      )}
    </button>
  );
};

export default SaveDraftButton;
