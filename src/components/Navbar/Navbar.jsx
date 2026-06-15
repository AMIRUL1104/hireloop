import { Link, Button } from "@heroui/react";
import MobileView from "./MobileView";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropDown";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// import logo from "/images/logo.png";
async function Navbar() {
  // 1. Fetch session data server-side by passing the headers
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  const { user } = sessionData || [];

  let dashboardlink;
  // console.log(sessionData);
  if (sessionData) {
    if (user.role === "admin") {
      dashboardlink = "/dashboard/admin";
    } else if (user.role === "recruiter") {
      dashboardlink = "/dashboard/recruiter";
    } else {
      dashboardlink = "/dashboard/seeker";
    }
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      {/* desktop view */}
      <header className="max-md:hidden mx-auto flex h-16 max-w-400 items-center justify-between px-6">
        {/* left part */}
        <Link
          href="/"
          className="flex items-center gap-2 mb-4  no-underline hover:opacity-90 transition"
        >
          <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h3 className="text-xl font-bold">HireLoop</h3>
        </Link>

        {/* right part */}
        <div className="hidden items-center gap-4 md:flex py-1 px-3 rounded-2xl bg-[#222222]">
          {/* route links */}
          <ul className="hidden items-center gap-4 md:flex">
            <li>
              <Link href="/browse-jobs" className="block py-2">
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
            {sessionData && (
              <li>
                <Link href={dashboardlink} className="block py-2">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* auth buttons */}
          {!sessionData ? (
            <Link
              className="block py-2 font-medium text-[#5C53FE]"
              href="/signin"
            >
              Sign In
            </Link>
          ) : (
            <ProfileDropdown />
          )}

          {/*  */}
          <Button className={"bg-white text-black"} href="/Getstart">
            Get Started
          </Button>
        </div>
      </header>

      {/* mobile view  */}
      <MobileView />
    </nav>
  );
}
export default Navbar;
