"use client";

import { useState, useMemo } from "react";
import JobsFilters from "./Jobsfilter";
import EmptyState from "./EmptyState";
import JobsTable from "./JobsTable";

export default function ManageJobsClient({ initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Delete job from local state (placeholder — no API)
  const handleDelete = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  // Toggle job status between Active and Closed (placeholder)
  const handleToggleStatus = (jobId) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, status: j.status === "Active" ? "Closed" : "Active" }
          : j,
      ),
    );
  };

  // Filter jobs based on search + status + category
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.jobTitle
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;
      const matchesCategory =
        categoryFilter === "All" || job.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [jobs, search, statusFilter, categoryFilter]);

  return (
    <div className="space-y-5">
      {/* Filters */}
      <JobsFilters
        search={search}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
      />

      {/* Table or empty state */}
      {filteredJobs.length === 0 ? (
        <EmptyState hasJobs={jobs.length > 0} />
      ) : (
        <JobsTable
          jobs={filteredJobs}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
}
