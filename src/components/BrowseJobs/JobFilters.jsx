"use client";

import { useState } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];
const CATEGORIES = [
  "Engineering",
  "Design",
  "Marketing",
  "Finance",
  "Operations",
  "Product",
  "Sales",
  "Other",
];

// Client component — handles all filter interactions locally
// TODO: lift state up to page if server-side filtering is needed
const JobFilters = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleReset = () => {
    setSearch("");
    setSelectedType("");
    setSelectedCategory("");
    setIsRemote(false);
  };

  const hasActiveFilters =
    search || selectedType || selectedCategory || isRemote;

  return (
    <div className="mb-8 space-y-4">
      {/* Search bar row */}
      <div className="flex gap-3 items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company..."
            className="w-full bg-gray-900 border border-gray-700/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
          />
        </div>

        {/* Toggle filter panel */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
            showFilters
              ? "bg-purple-600/20 border-purple-500/50 text-purple-300"
              : "bg-gray-900 border-gray-700/60 text-gray-400 hover:border-gray-600 hover:text-gray-300"
          }`}
        >
          <HiOutlineAdjustmentsHorizontal className="text-base" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-purple-400" />
          )}
        </button>
      </div>

      {/* Expandable filter panel */}
      {showFilters && (
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-5 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Job Type */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Job Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700/60 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60 transition-colors duration-200"
              >
                <option value="">All Types</option>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700/60 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60 transition-colors duration-200"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="City or country..."
                className="w-full bg-gray-800 border border-gray-700/60 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors duration-200"
              />
            </div>

            {/* Remote toggle + Reset */}
            <div className="flex flex-col justify-between">
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Remote Only
              </label>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsRemote(!isRemote)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                    isRemote ? "bg-purple-600" : "bg-gray-700"
                  }`}
                  aria-label="Toggle remote filter"
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                      isRemote ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={handleReset}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors duration-200"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;
