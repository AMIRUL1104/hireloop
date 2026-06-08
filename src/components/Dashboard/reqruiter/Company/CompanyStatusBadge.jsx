// app/dashboard/recruiter/company/components/CompanyStatusBadge.jsx
"use client";

import React from "react";
import { Chip } from "@heroui/react";

export default function CompanyStatusBadge({ status }) {
  // Configuration map for dynamic rendering
  const statusConfig = {
    approved: {
      color: "success",
      label: "Approved",
      variant: "flat",
    },
    pending: {
      color: "warning",
      label: "Pending",
      variant: "flat",
    },
    rejected: {
      color: "danger",
      label: "Rejected",
      variant: "flat",
    },
  };

  const currentStatus =
    statusConfig[status?.toLowerCase()] || statusConfig.pending;

  return (
    <Chip
      color={currentStatus.color}
      variant={currentStatus.variant}
      size="sm"
      className="capitalize font-medium text-xs px-2"
    >
      {currentStatus.label}
    </Chip>
  );
}
