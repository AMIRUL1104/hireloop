// app/dashboard/recruiter/company/components/CompanyStatusBadge.jsx
"use client";

import React from "react";
import { Chip } from "@heroui/react";

export default function CompanyStatusBadge({ status }) {
  // Configured with custom classes tailored for the dark premium dashboard theme
  const statusConfig = {
    approved: {
      label: "Approved",
      className:
        "bg-emerald-950/30 text-emerald-400 border border-emerald-800/50",
    },
    pending: {
      label: "Pending",
      className: "bg-amber-950/30 text-amber-400 border border-amber-800/50",
    },
    rejected: {
      label: "Rejected",
      className: "bg-rose-950/30 text-rose-400 border border-rose-800/50",
    },
  };

  const currentStatus =
    statusConfig[status?.toLowerCase()] || statusConfig.pending;

  return (
    <Chip
      size="sm"
      variant="bordered"
      className={`capitalize font-medium text-[11px] px-2.5 h-6 ${currentStatus.className}`}
    >
      {currentStatus.label}
    </Chip>
  );
}
