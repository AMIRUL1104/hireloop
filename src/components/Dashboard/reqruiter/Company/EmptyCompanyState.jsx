// app/dashboard/recruiter/company/components/EmptyCompanyState.jsx
"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { FiBriefcase, FiPlus } from "react-icons/fi";

export default function EmptyCompanyState({ onRegisterClick }) {
  return (
    <Card className="border-2 border-dashed border-gray-800 bg-[#111625]/30 backdrop-blur-sm p-12 flex flex-col items-center justify-center text-center shadow-none rounded-2xl">
      {/* Concentric Circle Icon Area */}
      <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gray-500 text-2xl mb-4 border border-gray-800 shadow-inner">
        <FiBriefcase className="text-blue-500" />
      </div>

      <h3 className="text-lg font-semibold text-white">No companies found</h3>
      <p className="text-sm text-gray-400 max-w-sm mt-2 mb-6 leading-relaxed">
        Start by registering your first company to begin posting jobs.
      </p>

      <Button
        onPress={onRegisterClick}
        className="font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg px-6"
        endContent={<FiPlus />}
      >
        Register Company
      </Button>
    </Card>
  );
}
