"use client";

import Link from "next/link";
import { BiChevronDown, BiLogOut, BiUserCircle } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";
import { Bounce, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

import { handleSignOutRedirect } from "@/lib/Server/authAction";

const dropdownLinks = [
  { href: "/profile", label: "Profile", icon: BiUserCircle },
];

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("SignOut Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      setOpen(false); // ড্রপডাউন বন্ধ করো

      await handleSignOutRedirect(); // ১. সার্ভার সাইডে ক্যাশ রিভ্যালিডেশন এবং রিডাইরেক্ট হ্যান্ডেল করবে
      return;
    } catch (error) {
      console.error("Logout failed:", error);
      //   toast.error("Something went wrong!");
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-[rgba(235,244,221,0.85)] hover:text-[#EBF4DD] transition-colors duration-200"
      >
        <BiUserCircle className="text-[26px]" />
        <BiChevronDown
          className={`text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] w-48 rounded-xl border border-[rgba(144,171,139,0.2)] bg-[#3B4953] shadow-lg overflow-hidden z-50">
          {dropdownLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[rgba(235,244,221,0.85)] hover:bg-[rgba(144,171,139,0.15)] hover:text-[#EBF4DD] transition-colors duration-150"
            >
              <Icon className="text-base shrink-0 text-[#90AB8B]" />
              {label}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-[rgba(144,171,139,0.18)] mx-3" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#fca5a5] hover:bg-[rgba(239,68,68,0.1)] transition-colors duration-150"
          >
            <BiLogOut className="text-base shrink-0" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
