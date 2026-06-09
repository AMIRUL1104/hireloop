// src/components/Dashboard/shared/DashboardSidebar.jsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // অ্যাক্টিভ রুট ট্র্যাক করার জন্য
import { Bars, House, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import {
  Briefcase,
  Building2,
  LayoutDashboard,
  Mail,
  PlusCircle,
  Settings,
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  // থিম এবং আইকন সেটআপ (সব আইকন ইউনিফর্ম লুকের জন্য লূসিড-রিয়্যাক্ট ব্যবহার করা হয়েছে)
  const navItems = [
    { icon: House, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/recruiter" },
    { icon: Briefcase, label: "Job", href: "/dashboard/recruiter/job" },
    {
      icon: PlusCircle,
      label: "Post A Job",
      href: "/dashboard/recruiter/job/job-post",
    },
    {
      icon: Building2,
      label: "Company Profile",
      href: "/dashboard/recruiter/company",
    },
    { icon: Person, label: "Profile", href: "/dashboard/recruiter/profile" },
    { icon: Mail, label: "Messages", href: "/dashboard/recruiter/messages" },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/recruiter/settings",
    },
  ];

  // সাইডবার আইটেম রেন্ডারার ফাংশন
  const renderNavItems = () => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        // রুট ম্যাচিং কন্ডিশন
        const isActive = pathname === item.href;

        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 select-none group border ${
              isActive
                ? "bg-[#161D30] border-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                : "bg-transparent border-transparent hover:bg-[#161D30]/50 hover:border-gray-800/40"
            }`}
          >
            <item.icon
              className={`size-4.5 transition-colors duration-200 ${
                isActive
                  ? "text-blue-500"
                  : "text-gray-400 group-hover:text-gray-200"
              }`}
            />
            <span
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold"
                  : "text-gray-400 group-hover:text-gray-200"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 🖥️ Desktop Aside View (Premium Dark Layout) */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-800/80 md:block px-4 py-6 bg-[#0E121F] h-screen sticky top-0">
        {/* Logo/Brand Header */}
        <div className="px-4 pb-6 mb-4 border-b border-gray-800/50">
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            HIRE<span className="text-blue-500">LOOP</span>
          </span>
        </div>
        {renderNavItems()}
      </aside>

      {/* 📱 Mobile Drawer Trigger Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Drawer>
          <Button
            className="bg-[#111625] border border-gray-800 text-gray-300 hover:text-white"
            size="sm"
          >
            <Bars className="size-4" />
            Menu
          </Button>

          <Drawer.Backdrop className="backdrop-blur-sm bg-black/60">
            <Drawer.Content placement="left">
              {/* Mobile Drawer Content Theme */}
              <Drawer.Dialog className="bg-[#0E121F] border-r border-gray-800 w-72 max-w-[80vw] h-full p-5 text-white">
                <Drawer.CloseTrigger className="text-gray-400 hover:text-white" />
                <Drawer.Header className="px-1 pb-4 mb-4 border-b border-gray-800/60">
                  <Drawer.Heading className="text-lg font-bold text-white tracking-wide">
                    Navigation
                  </Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body className="px-0 py-2">
                  {renderNavItems()}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
