"use client";
import { useRouter } from "next/navigation";
import { HiOutlineArrowRight } from "react-icons/hi2";

const GetStartedButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/signup")}
      className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
    >
      Get Started
      <HiOutlineArrowRight className="text-base" />
    </button>
  );
};
export default GetStartedButton;
