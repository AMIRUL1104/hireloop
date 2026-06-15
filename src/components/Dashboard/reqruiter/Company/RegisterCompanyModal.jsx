"use client";

import React from "react";
import { Modal } from "@heroui/react";
import CompanyRegisterForm from "./CompanyRegisterForm";

export default function RegisterCompanyModal({
  isOpen,
  onOpenChange,
  user,
  setCompanies,
  companies,
}) {
  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="blur"
        className="backdrop-blur-md bg-black/60"
      >
        <Modal.Container size="xl">
          <Modal.Dialog className="rounded-xl border border-gray-800 bg-[#111625] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {({ close }) => (
              <div className="flex flex-col w-full text-left">
                <div className="p-6 border-b border-gray-800/80">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Register New Company
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Enter your business details to start hiring on HireLoop.
                  </p>
                </div>

                <CompanyRegisterForm
                  onClose={close}
                  user={user}
                  setCompanies={setCompanies}
                  companies={companies}
                />
              </div>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
