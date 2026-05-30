import { Link, Button } from "@heroui/react";
import MobileView from "./MobileView";

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      {/* desktop view */}
      <header className="max-md:hidden mx-auto flex h-16 max-w-400 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <p className="font-bold">HireLoop</p>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex py-1 px-3 rounded-2xl bg-[#222222]">
          <ul className="hidden items-center gap-4 md:flex">
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
          </ul>
          <Link className="block py-2 font-medium text-accent" href="/signin">
            Login
          </Link>
          <Button href="/signup">Sign Up</Button>
        </div>
      </header>

      {/* mobile view  */}
      <MobileView />
    </nav>
  );
}
export default Navbar;
