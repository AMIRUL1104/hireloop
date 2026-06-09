// src/components/Navbar/MobileNavbar.jsx (Server Component)
import React from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import MobileHeaderClient from "./MobileHeader";

export default async function MobileNavbar() {
  // সার্ভার সাইড থেকে সেশন ডেটা ফেচিং
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  const user = sessionData?.user || null;

  return <MobileHeaderClient user={user} />;
}
