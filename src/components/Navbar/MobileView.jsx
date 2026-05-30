"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";

function MobileView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="md:hidden w-full h-16 flex items-center px-6 justify-between">
        {/* Left - Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Center/Right - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h3 className="text-xl font-bold">HireLoop</h3>
        </Link>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="/jobs" className="block py-2">
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link href="/company">Company</Link>
            </li>
            <li>
              <Link href="/pricing" className="block py-2">
                Pricing
              </Link>
            </li>
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              <Link
                href="/signin"
                className="block py-2 font-medium text-[#5C53FE]"
              >
                Sign In
              </Link>
              <Link href="/Getstart" className="block rounded-2xl bg-white">
                <Button className="w-full  bg-white text-black">
                  Get Started
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default MobileView;
