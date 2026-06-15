"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { companyStatusUpdate } from "@/lib/Server/actions/company";

export default function CompanyActionButtons({ companyId, status }) {
  const [loading, setLoading] = useState(null);

  const handleAction = async (actionType) => {
    setLoading(actionType);
    try {
      // এখানে তোমার API রাউট বা Server Action কল হবে
      // const res = await updateCompanyStatus(companyId, actionType);
      console.log(`Company ${companyId} execution: ${actionType}`);
      const result = await companyStatusUpdate(companyId, actionType);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Approve Button */}
      <Button
        size="sm"
        disabled={status === "approved" || loading !== null}
        isLoading={loading === "approved"}
        onClick={() => handleAction("approved")}
        className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 text-xs font-semibold h-8 px-3 rounded-lg transition-all"
      >
        Approve
      </Button>

      {/* Reject Button */}
      <Button
        size="sm"
        disabled={status === "rejected" || loading !== null}
        isLoading={loading === "rejected"}
        onClick={() => handleAction("rejected")}
        className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 text-xs font-semibold h-8 px-3 rounded-lg transition-all"
      >
        Reject
      </Button>
    </div>
  );
}
