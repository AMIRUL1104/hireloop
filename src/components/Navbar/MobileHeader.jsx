// src/components/Navbar/MobileHeaderClient.jsx (Client Component)
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import { Bars, House, Person } from "@gravity-ui/icons";
import {
  Briefcase,
  Building2,
  CreditCard,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

export default function MobileHeaderClient({ user }) {
  const pathname = usePathname();
  const isLoggedIn = !!user;

  // ১. সাধারণ পাবলিক লিংকস
  const navLinks = [
    { label: "Home", href: "/", icon: House },
    { label: "Browse Jobs", href: "/jobs", icon: Briefcase },
    { label: "Company", href: "/company", icon: Building2 },
    { label: "Pricing", href: "/pricing", icon: CreditCard },
  ];

  // ২. শুধুমাত্র রিক্রুটার বা লগইন করা ইউজারদের লিংকস
  const authLinks = [
    { label: "Dashboard", href: "/dashboard/recruiter", icon: LayoutDashboard },
    { label: "Profile", href: "/dashboard/recruiter/profile", icon: User },
  ];

  const handleSignOut = async () => {
    // এখানে তোমার সাইন আউট এক্সিকিউশন মেথডটি বসাবে
    window.location.reload();
  };

  // লিংক রেন্ডারার ফাংশন (হুবহু DashboardSidebar এর প্রিমিয়াম স্টাইল এবং একটিভ রুট গ্লো সহ)
  const renderLinks = (items) => (
    <div className="flex flex-col gap-1.5 w-full">
      {items.map((item) => {
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
    </div>
  );

  return (
    <header className="md:hidden w-full h-16 flex items-center px-5 justify-between bg-[#0E121F] border-b border-gray-800/60 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      {/* 🚀 Brand Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.3)]">
          <span className="text-white font-extrabold text-sm tracking-tighter">
            HL
          </span>
        </div>
        <h3 className="text-lg font-bold tracking-wider text-white">
          HIRE<span className="text-blue-500">LOOP</span>
        </h3>
      </Link>

      {/* 📱 HeroUI Drawer Component (সব ওপরে থাকার গ্যারান্টি) */}
      <Drawer>
        <Button
          className="bg-[#161D30] border border-gray-800 text-gray-300 hover:text-white"
          size="sm"
        >
          <Bars className="size-4" />
          Menu
        </Button>

        <Drawer.Backdrop className="backdrop-blur-sm bg-black/60">
          {/* রাইট সাইড থেকে ফুল স্ক্রিন আসার জন্য placement="right" করা হয়েছে */}
          <Drawer.Content placement="right">
            <Drawer.Dialog className="bg-[#0E121F] border-l border-gray-800 w-80 max-w-[85vw] h-full flex flex-col justify-between p-0 text-white">
              {/* ড্রয়ারের বডি পার্ট */}
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="h-16 shrink-0 flex items-center justify-between px-5 border-b border-gray-800/50 bg-[#0C0F1A]">
                  <Drawer.Heading className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                    Navigation
                  </Drawer.Heading>
                  <Drawer.CloseTrigger className="text-gray-400 hover:text-white relative top-0 right-0 p-2 bg-[#161D30] border border-gray-800 rounded-xl" />
                </div>

                <Drawer.Body className="px-4 py-5 space-y-6">
                  {/* সাধারণ লিংক গ্রুপ */}
                  <div className="space-y-2">{renderLinks(navLinks)}</div>

                  {/* অথেনটিকেটেড ড্যাশবোর্ড লিংক গ্রুপ */}
                  {isLoggedIn && (
                    <div className="space-y-2 pt-4 border-t border-gray-800/40">
                      <span className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase px-4 mb-1 block">
                        Recruiter Space
                      </span>
                      {renderLinks(authLinks)}
                    </div>
                  )}
                </Drawer.Body>
              </div>

              {/* ড্রয়ারের বটম অ্যাকশন বাটন এরিয়া */}
              <div className="p-4 bg-[#0B0E18] border-t border-gray-800/80 shrink-0">
                {isLoggedIn ? (
                  <Button
                    onPress={handleSignOut}
                    className="w-full bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 border border-rose-900/40 font-medium h-11 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2.5 w-full">
                    <Link href="/signin" className="w-full">
                      <Button className="w-full bg-transparent border border-gray-800 hover:bg-gray-900 text-gray-300 font-medium h-11 rounded-xl transition-all">
                        Sign In
                      </Button>
                    </Link>

                    <Link href="/Getstart" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold h-11 rounded-xl shadow-[0_4px_15px_rgba(37,99,235,0.2)] transition-all">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </header>
  );
}
