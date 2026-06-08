"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";

export default function DeleteJobButton({ jobId, jobTitle, onConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm(jobId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Delete trigger button */}
      <Button
        size="sm"
        variant="flat"
        color="danger"
        isIconOnly
        onPress={() => setIsOpen(true)}
        title="Delete job"
      >
        <FiTrash2 size={15} />
      </Button>

      {/* Confirmation modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setIsOpen(false)} // Close on backdrop click
        >
          <Card
            className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent close on card click
          >
            <Card.Header>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center shrink-0">
                  <FiAlertTriangle
                    className="text-red-500 dark:text-red-400"
                    size={18}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                    Delete Job Post
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </Card.Header>

            <Card.Content>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {` ${jobTitle}`}
                </span>
                ? All applicant data for this job will also be removed.
              </p>
            </Card.Content>

            <Card.Footer className="flex justify-end gap-3">
              <Button
                variant="flat"
                onPress={() => setIsOpen(false)}
                className="text-gray-600 dark:text-gray-300"
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleConfirm}
                startContent={<FiTrash2 size={14} />}
              >
                Delete Job
              </Button>
            </Card.Footer>
          </Card>
        </div>
      )}
    </>
  );
}
