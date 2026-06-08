// src/components/Dashboard/reqruiter/Company/RegisterCompanyModal.jsx
"use client";

import React from "react";
import { Modal, Button } from "@heroui/react"; // Only import needed components

export default function RegisterCompanyModal({ isOpen, onOpenChange }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {/* Hero UI v3 Uses Backdrop and Container Sub-components */}
      <Modal.Backdrop className="backdrop-blur-sm" />

      <Modal.Container size="md">
        <Modal.Dialog className="rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
          {/* Render function provides the close action directly */}
          {({ close }) => (
            <>
              {/* Modal Header */}
              <Modal.Header className="flex flex-col gap-1 text-xl font-bold text-gray-950 pb-2">
                Register Company
              </Modal.Header>

              {/* Modal Body */}
              <Modal.Body className="py-2 text-sm text-gray-500">
                <p>
                  Company registration form placeholder. Integrate your
                  multi-step form inputs here later.
                </p>
              </Modal.Body>

              {/* Modal Footer */}
              <Modal.Footer className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={close}
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    alert("Company registered successfully! (Mock)");
                    close();
                  }}
                  className="font-medium shadow-sm"
                >
                  Submit
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}
