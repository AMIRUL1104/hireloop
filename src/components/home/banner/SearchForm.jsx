// SearchForm Component - Server Component
// Handles job search input with location and advanced filters

"use client";

import { Magnifier, MapPin } from "@gravity-ui/icons";
import { useState } from "react";

export default function SearchForm() {
  // State for form inputs
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ jobTitle, location });
  };

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col md:flex-row gap-4 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl hover:border-gray-600/70 transition-all duration-300">
          {/* Job Title / Company Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
            <Magnifier size={20} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Job, Company or Keyword"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
            />
          </div>

          {/* Location Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
            <MapPin size={20} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Location or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Magnifier size={20} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}
