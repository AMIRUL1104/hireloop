"use client";

import { Button } from "@heroui/react";
import { FiSend } from "react-icons/fi";

export default function SubmitButton({ isLoading }) {
  return (
    <Button
      type="submit"
      isLoading={isLoading}
      size="lg"
      className="
        w-full font-semibold text-white
        bg-linear-to-r from-blue-600 to-purple-600
        hover:opacity-90 transition-opacity duration-200
      "
      startContent={!isLoading && <FiSend size={16} />}
    >
      {isLoading ? "Publishing..." : "Publish Job Post"}
    </Button>
  );
}
