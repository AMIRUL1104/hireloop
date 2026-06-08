// app/dashboard/recruiter/company/components/CompanyActions.jsx
"use client";

import React from "react";
import { Button } from "@heroui/react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function CompanyActions({ companyId }) {
  // Action Handlers
  const handleView = () => {
    alert(`Viewing details for company ID: ${companyId}`);
  };

  const handleEdit = () => {
    alert(`Editing company ID: ${companyId}`);
  };

  const handleDelete = () => {
    alert(`Deleting company ID: ${companyId}`);
  };

  return (
    <div className="flex items-center gap-1.5 w-full justify-between sm:justify-end">
      <Button
        size="sm"
        variant="light"
        color="default"
        startContent={<FiEye />}
        onPress={handleView}
        className="text-xs font-medium"
      >
        View
      </Button>

      <Button
        size="sm"
        variant="light"
        color="primary"
        startContent={<FiEdit2 />}
        onPress={handleEdit}
        className="text-xs font-medium"
      >
        Edit
      </Button>

      <Button
        size="sm"
        variant="light"
        color="danger"
        startContent={<FiTrash2 />}
        onPress={handleDelete}
        className="text-xs font-medium"
      >
        Delete
      </Button>
    </div>
  );
}
