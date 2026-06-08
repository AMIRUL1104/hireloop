"use client";

import { Card } from "@heroui/react";
import JobStatusBadge from "./JobStatusBadge";

import { FiMapPin, FiBriefcase } from "react-icons/fi";
import JobActions from "./Jobactions";

// Format date string to readable format
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function JobsTable({ jobs, onDelete, onToggleStatus }) {
  return (
    <>
      {/* ── Desktop Table ── hidden on mobile ─────────────────────────────── */}
      <div className="hidden md:block">
        <Card className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
          <table className="w-full">
            {/* Table head */}
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700/50">
                {[
                  "Job Title",
                  "Status",
                  "Applicants",
                  "Date Posted",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/40">
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors"
                >
                  {/* Job Title + meta */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {job.jobTitle}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                        <FiBriefcase size={11} />
                        {job.jobType}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                        <FiMapPin size={11} />
                        {`${job.city} ,${job.country}`}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <JobStatusBadge status={job.status} />
                  </td>

                  {/* Applicants */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {job?.applicants || 0}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                      applicants
                    </span>
                  </td>

                  {/* Date Posted */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(job.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <JobActions
                      job={job}
                      onDelete={onDelete}
                      onToggleStatus={onToggleStatus}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Mobile Cards ── hidden on desktop ─────────────────────────────── */}
      <div className="block md:hidden space-y-3">
        {jobs.map((job) => (
          <Card
            key={job._id}
            className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/50"
          >
            <Card.Header className="pb-2">
              {/* Title + badge */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                    {job.jobTitle}
                  </p>
                  <div className="flex items-center gap-2.5 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <FiBriefcase size={11} />
                      {job.jobType}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <FiMapPin size={11} />
                      {`${job.city},${job.country}`}
                    </span>
                  </div>
                </div>
                <JobStatusBadge status={job.status} />
              </div>
            </Card.Header>

            <Card.Content className="pt-0">
              {/* Stats row */}
              <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-700/40">
                <div className="text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Applicants
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                    {job?.applicants || 0}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Posted
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                    {formatDate(job.createdAt)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Actions
                  </p>
                  <div className="mt-0.5">
                    <JobActions
                      job={job}
                      onDelete={onDelete}
                      onToggleStatus={onToggleStatus}
                    />
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </>
  );
}
