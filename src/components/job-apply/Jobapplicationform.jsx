"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineGlobeAlt,
  HiOutlineLink,
  HiOutlineArrowUpTray,
  HiOutlineDocumentText,
  HiOutlineXMark,
} from "react-icons/hi2";
import ApplicationSuccess from "./Applicationsuccess";
import ApplicationChecklist from "./Applicationchecklist";
import SubmitApplicationButton from "./Submitapplicationbutton";
import SaveDraftButton from "./Savedraftbutton";
import CancelButton from "./Cancelbutton";
import { JobApplication } from "@/lib/Server/actions/jobapply";

// Reusable form field wrapper
const Field = ({ label, required, error, children }) => (
  <div>
    <label className="block text-gray-300 text-sm font-medium mb-1.5">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
  </div>
);

// Input with left icon
const IconInput = ({ icon: Icon, error, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none" />
    <input
      {...props}
      className={`w-full bg-gray-800/60 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition-all duration-200
        ${
          error
            ? "border-red-500/50 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/20"
            : "border-gray-700/60 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20"
        }`}
    />
  </div>
);

// Main application form — Client Component
const JobApplicationForm = ({ job, userId }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  // console.log(userId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  // Watch fields for live checklist updates
  const watchedName = watch("fullName", "");
  const watchedEmail = watch("email", "");

  // Handle PDF file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      e.target.value = "";
      return;
    }
    setResumeFile(file);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data) => {
    if (!resumeFile) {
      alert("Please attach your resume before submitting.");
      return;
    }

    try {
      const applicantData = {
        ...data,
        resume: resumeFile.name,
        jobId: job._id,
        applicantId: userId,
      };

      // API কল করার সময় await ব্যবহার করা ভালো যেন রেসপন্স সফল হলে তবেই পরবর্তী লাইনে যায়
      const result = await JobApplication(applicantData);
      if (result.insertedId) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  // Success screen after submission
  if (submitted) {
    return (
      <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl overflow-hidden">
        <ApplicationSuccess
          jobTitle={job.jobTitle}
          companyName={job.companyName}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-5">
        {/* ── Section: Personal Info ── */}
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-base mb-5">
            Personal Information
          </h2>

          <div className="space-y-4">
            {/* Full Name */}
            <Field label="Full Name" required error={errors.fullName?.message}>
              <IconInput
                icon={HiOutlineUser}
                placeholder="John Doe"
                error={errors.fullName}
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </Field>

            {/* Email */}
            <Field label="Email Address" required error={errors.email?.message}>
              <IconInput
                icon={HiOutlineEnvelope}
                type="email"
                placeholder="you@example.com"
                error={errors.email}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </Field>

            {/* Phone */}
            <Field label="Phone Number" error={errors.phone?.message}>
              <IconInput
                icon={HiOutlinePhone}
                type="tel"
                placeholder="+1 (555) 000-0000"
                error={errors.phone}
                {...register("phone", {
                  pattern: {
                    value: /^[+\d\s\-().]{7,20}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />
            </Field>
          </div>
        </div>

        {/* ── Section: Online Presence ── */}
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-base mb-1">
            Online Presence
          </h2>
          <p className="text-gray-500 text-xs mb-5">
            Optional — helps recruiters learn more about you
          </p>

          <div className="space-y-4">
            {/* Portfolio */}
            <Field label="Portfolio URL" error={errors.portfolio?.message}>
              <IconInput
                icon={HiOutlineGlobeAlt}
                type="url"
                placeholder="https://yourportfolio.com"
                error={errors.portfolio}
                {...register("portfolio", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Enter a valid URL starting with https://",
                  },
                })}
              />
            </Field>

            {/* LinkedIn */}
            <Field label="LinkedIn Profile" error={errors.linkedin?.message}>
              <IconInput
                icon={HiOutlineLink}
                type="url"
                placeholder="https://linkedin.com/in/yourname"
                error={errors.linkedin}
                {...register("linkedin", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Enter a valid LinkedIn URL",
                  },
                })}
              />
            </Field>
          </div>
        </div>

        {/* ── Section: Resume Upload ── */}
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-base mb-1">
            Resume <span className="text-red-400">*</span>
          </h2>
          <p className="text-gray-500 text-xs mb-5">PDF only · Max 5MB</p>

          {/* File selected — show preview */}
          {resumeFile ? (
            <div className="flex items-center justify-between bg-gray-800/60 border border-green-500/25 rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-green-500/15 border border-green-500/20 flex items-center justify-center shrink-0">
                  <HiOutlineDocumentText className="text-green-400 text-base" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {resumeFile.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {(resumeFile.size / 1024).toFixed(0)} KB · PDF
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveResume}
                className="text-gray-500 hover:text-red-400 transition-colors duration-200 ml-3 shrink-0"
                aria-label="Remove resume"
              >
                <HiOutlineXMark className="text-lg" />
              </button>
            </div>
          ) : (
            /* Upload drop zone */
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-700/60 hover:border-purple-500/50 rounded-xl py-8 px-4 text-center transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700/50 flex items-center justify-center mx-auto mb-3 group-hover:border-purple-500/40 transition-colors duration-300">
                <HiOutlineArrowUpTray className="text-gray-400 text-lg group-hover:text-purple-400 transition-colors duration-300" />
              </div>
              <p className="text-gray-300 text-sm font-medium mb-1">
                Click to upload your resume
              </p>
              <p className="text-gray-500 text-xs">PDF format only · Max 5MB</p>
            </button>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* ── Section: Cover Letter ── */}
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-base mb-1">
            Cover Letter
          </h2>
          <p className="text-gray-500 text-xs mb-5">
            Optional — explain why you are a great fit for this role
          </p>
          <textarea
            rows={6}
            placeholder={`Tell the recruiter why you're excited about this role at ${job.companyName} and what makes you the right candidate...`}
            className="w-full bg-gray-800/60 border border-gray-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 resize-none transition-all duration-200"
            {...register("coverLetter")}
          />
        </div>

        {/* ── Checklist ── */}
        <ApplicationChecklist
          hasName={watchedName.trim().length >= 2}
          hasEmail={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail)}
          hasResume={!!resumeFile}
        />

        {/* ── Action Buttons ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SubmitApplicationButton isSubmitting={isSubmitting} />
          <SaveDraftButton />
          <CancelButton jobId={job._id} />
        </div>
      </div>
    </form>
  );
};

export default JobApplicationForm;
