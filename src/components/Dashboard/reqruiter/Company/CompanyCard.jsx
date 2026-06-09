// src/components/Dashboard/reqruiter/Company/CompanyCard.jsx
"use client";

import React from "react";
import { Card } from "@heroui/react";
import { FiMapPin, FiUsers, FiBriefcase } from "react-icons/fi";
import CompanyStatusBadge from "./CompanyStatusBadge";
import CompanyActions from "./CompanyActions";
import Image from "next/image";

export default function CompanyCard({ company }) {
  const { name, industry, location, size, description, status, logo } = company;

  return (
    <Card className="border border-gray-800 bg-[#111625]/60 backdrop-blur-md shadow-xl hover:border-gray-700 transition-all duration-300 p-5 rounded-xl">
      {/* Card Header */}
      <div className="flex gap-3 items-start justify-between pb-4 border-b border-gray-800/60">
        <div className="flex gap-3 items-center min-w-0">
          {/* Logo */}
          {logo ? (
            <div className="relative w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-900/50 shrink-0 overflow-hidden">
              <Image
                src={logo}
                fill
                alt={`${name} logo`}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-900 text-gray-500 flex items-center justify-center text-xl border border-gray-800 shrink-0">
              <FiBriefcase />
            </div>
          )}

          <div className="flex flex-col min-w-0">
            <h3 className="text-base font-semibold text-white leading-tight truncate">
              {name}
            </h3>
            <span className="text-xs text-gray-400 truncate mt-1">
              {industry}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <CompanyStatusBadge status={status} />
        </div>
      </div>

      {/* Card Body */}
      <div className="py-4 space-y-4 text-sm text-gray-300">
        <p className="line-clamp-2 text-gray-400 leading-relaxed text-xs min-h-[2.5rem]">
          {description}
        </p>

        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FiMapPin className="text-blue-500 shrink-0 text-sm" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FiUsers className="text-purple-500 shrink-0 text-sm" />
            <span>{size}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-gray-800/60 flex justify-end">
        <CompanyActions companyId={company._id} />
      </div>
    </Card>
  );
}
