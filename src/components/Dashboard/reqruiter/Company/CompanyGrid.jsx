// src/components/Dashboard/reqruiter/Company/CompanyGrid.jsx
"use client";

import React from "react";
import { Button, useOverlayState } from "@heroui/react";
import { FiPlus } from "react-icons/fi";
import EmptyCompanyState from "./EmptyCompanyState";
import CompanyCard from "./CompanyCard";
import RegisterCompanyModal from "./RegisterCompanyModal";

export default function CompanyGrid({ initialCompanies = [], reqruiterId }) {
  const modalState = useOverlayState({ defaultOpen: false });
  const [companies] = React.useState(initialCompanies);

  return (
    <div className="space-y-8">
      {/* Premium Dark Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Company Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your registered companies and job posting profiles.
          </p>
        </div>

        {/* Brand Theme Action Button */}
        <Button
          onPress={() => modalState.open()}
          className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] px-6 transition-all duration-200"
          endContent={<FiPlus className="text-lg" />}
        >
          Register Company
        </Button>
      </div>

      {/* Main Container Dynamic Layout */}
      {companies.length === 0 ? (
        <EmptyCompanyState onRegisterClick={() => modalState.open()} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      )}

      <RegisterCompanyModal
        isOpen={modalState.isOpen}
        onOpenChange={(open) => modalState.setOpen(open)}
        userId={reqruiterId}
      />
    </div>
  );
}
