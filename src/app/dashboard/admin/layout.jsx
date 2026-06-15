import { requireRole } from "@/lib/core/session";
import React from "react";

async function AdminDashboardLayout({ children }) {
  await requireRole("admin");
  return children;
}

export default AdminDashboardLayout;
