"use client";

import { Button } from "@heroui/react";
import { FiEdit2, FiUsers, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import DeleteJobButton from "./DeleteJobButton";

export default function JobActions({ job, onDelete, onToggleStatus }) {
  const handleEdit = () => {
    // TODO: navigate to edit page
    console.log("Edit job:", job.id);
  };

  const handleViewApplicants = () => {
    // TODO: navigate to applicants page
    console.log("View applicants for job:", job.id);
  };

  const handleToggleStatus = () => {
    // Toggle between Active and Closed
    onToggleStatus(job.id);
  };

  const isActive = job.status === "Active";

  return (
    <div className="flex items-center gap-1.5">
      {/* Edit */}
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        onPress={handleEdit}
        title="Edit job"
        className="text-gray-600 dark:text-gray-300"
      >
        <FiEdit2 size={15} />
      </Button>

      {/* View Applicants */}
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        onPress={handleViewApplicants}
        title="View applicants"
        className="text-blue-600 dark:text-blue-400"
      >
        <FiUsers size={15} />
      </Button>

      {/* Toggle Status (Close / Reopen) — only for Active or Closed */}
      {job.status !== "Draft" && (
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          onPress={handleToggleStatus}
          title={isActive ? "Close job" : "Reopen job"}
          className={
            isActive
              ? "text-amber-600 dark:text-amber-400"
              : "text-emerald-600 dark:text-emerald-400"
          }
        >
          {isActive ? <FiToggleRight size={16} /> : <FiToggleLeft size={16} />}
        </Button>
      )}

      {/* Delete */}
      <DeleteJobButton
        jobId={job.id}
        jobTitle={job.title}
        onConfirm={onDelete}
      />
    </div>
  );
}
