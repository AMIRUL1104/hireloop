"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";

function MobileView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="md:hidden mx-auto flex h-16 max-w-400 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
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
          <div className="flex items-center gap-3">
            <p className="font-bold">HireLoop</p>
          </div>
        </div>
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
                className="block py-2 font-medium text-accent"
              >
                Sign In
              </Link>
              <Link href="/signup" className="block py-2">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default MobileView;
