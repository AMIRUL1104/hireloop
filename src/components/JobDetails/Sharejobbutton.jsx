"use client";

import { useState } from "react";
import { HiOutlineShare, HiOutlineCheckCircle } from "react-icons/hi2";

const ShareJobButton = ({ jobTitle }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API not available
      console.log(`Share job: ${jobTitle} — ${url}`);
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Copy job link"
      className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
        copied
          ? "bg-green-600/15 border-green-500/40 text-green-300"
          : "bg-gray-800 border-gray-700/50 text-gray-300 hover:border-gray-600 hover:text-white"
      }`}
    >
      {copied ? (
        <>
          <HiOutlineCheckCircle className="text-base" />
          Link Copied
        </>
      ) : (
        <>
          <HiOutlineShare className="text-base" />
          Share
        </>
      )}
    </button>
  );
};

export default ShareJobButton;
