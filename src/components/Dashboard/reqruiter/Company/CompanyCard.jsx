// src/components/Dashboard/reqruiter/Company/CompanyCard.jsx
"use client";

import React from "react";
import { Card } from "@heroui/react"; // Custom sub-components removed to avoid undefined exports
import { FiMapPin, FiUsers, FiBriefcase } from "react-icons/fi";
import CompanyStatusBadge from "./CompanyStatusBadge";
import CompanyActions from "./CompanyActions";

export default function CompanyCard({ company }) {
  const { name, industry, location, size, description, status, logo } = company;

  return (
    <Card className="border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 bg-white">
      {/* Header Section (Pure Tailwind structure instead of Card.Header) */}
      <div className="flex gap-3 items-start justify-between pb-3 border-b border-gray-100">
        <div className="flex gap-3 items-center">
          {logo ? (
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary font-bold flex items-center justify-center text-lg border border-primary-100 shrink-0">
              {logo}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center text-xl border border-gray-200 shrink-0">
              <FiBriefcase />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <h3 className="text-base font-semibold text-gray-900 leading-tight truncate">
              {name}
            </h3>
            <span className="text-xs text-gray-500 truncate mt-0.5">
              {industry}
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <CompanyStatusBadge status={status} />
        </div>
      </div>

      {/* Body Section (Pure Tailwind instead of Card.Body) */}
      <div className="py-4 space-y-3 text-sm text-gray-600">
        <p className="line-clamp-2 text-gray-500 leading-relaxed text-xs min-h-[2.5rem]">
          {description}
        </p>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiMapPin className="text-gray-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiUsers className="text-gray-400 shrink-0" />
            <span>{size}</span>
          </div>
        </div>
      </div>

      {/* Footer Section (Pure Tailwind instead of Card.Footer) */}
      <div className="pt-3 border-t border-gray-100 flex justify-end">
        <CompanyActions companyId={company.id} />
      </div>
    </Card>
  );
}
