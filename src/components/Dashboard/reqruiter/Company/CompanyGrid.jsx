// src/components/Dashboard/reqruiter/Company/CompanyGrid.jsx
"use client";

import React from "react";
import { Button, useOverlayState } from "@heroui/react"; // Imported useOverlayState instead of useDisclosure
import { FiPlus } from "react-icons/fi";
import EmptyCompanyState from "./EmptyCompanyState";
import CompanyCard from "./CompanyCard";
import RegisterCompanyModal from "./RegisterCompanyModal";

export default function CompanyGrid({ initialCompanies = [] }) {
  // Initialize the v3 overlay state manager
  const modalState = useOverlayState({ defaultOpen: false });
  const [companies] = React.useState(initialCompanies);

  return (
    <div className="space-y-6">
      {/* Persistent Page Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Company Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your registered companies and job posting profiles.
          </p>
        </div>

        {/* Persistent Register Button */}
        <Button
          color="primary"
          endContent={<FiPlus className="text-lg" />}
          onPress={() => modalState.open()} // Opens the modal in v3
          className="font-medium shadow-sm"
        >
          Register Company
        </Button>
      </div>

      {/* Conditional Dashboard Body */}
      {companies.length === 0 ? (
        <EmptyCompanyState onRegisterClick={() => modalState.open()} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}

      {/* Global Registration Modal Integration */}
      <RegisterCompanyModal
        isOpen={modalState.isOpen}
        onOpenChange={(open) => modalState.setOpen(open)}
      />
    </div>
  );
}
