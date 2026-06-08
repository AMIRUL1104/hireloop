"use client";

import { Button } from "@heroui/react";
import { FiPlusCircle } from "react-icons/fi";

import Link from "next/link";

export default function PostJobButton() {
  return (
    <Link href={"/dashboard/recruiter/job/job-post"}>
      <Button
        // onPress={handleClick}
        startContent={<FiPlusCircle size={16} />}
        className="bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity shrink-0"
      >
        Post New Job
      </Button>
    </Link>
  );
}
