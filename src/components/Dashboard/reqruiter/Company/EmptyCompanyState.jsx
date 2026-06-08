// app/dashboard/recruiter/company/components/EmptyCompanyState.jsx
"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { FiBriefcase, FiPlus } from "react-icons/fi";

export default function EmptyCompanyState({ onRegisterClick }) {
  return (
    <Card className="border-2 border-dashed border-gray-200 bg-transparent p-12 flex flex-col items-center justify-center text-center shadow-none rounded-2xl">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl mb-4 border border-gray-200">
        <FiBriefcase />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        No companies found
      </h3>
      <p className="text-sm text-gray-500 max-w-sm mt-1 mb-6 leading-relaxed">
        Start by registering your first company to begin posting jobs.
      </p>
      <Button
        color="primary"
        endContent={<FiPlus />}
        onPress={onRegisterClick}
        className="font-medium shadow-sm"
      >
        Register Company
      </Button>
    </Card>
  );
}
