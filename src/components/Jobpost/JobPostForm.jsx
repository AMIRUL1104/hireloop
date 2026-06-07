"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  TextArea,
  TextField,
  Label,
  FieldError,
  Select,
  ListBox,
  Switch,
  Button,
  Card,
} from "@heroui/react";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiPlusCircle,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import SubmitButton from "./PostSubmit";

// ── Static options ─────────────────────────────────────────────────────────────
const JOB_CATEGORIES = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "HR",
  "Customer Support",
  "Legal",
];
const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];
const CURRENCIES = ["USD", "EUR", "GBP", "BDT", "AED", "SGD", "CAD", "AUD"];

// ── Main Form ─────────────────────────────────────────────────────────────────
export default function JobPostForm({ recruiter }) {
  const [isRemote, setIsRemote] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      category: "",
      jobType: "",
      currency: "USD",
      salaryMin: "",
      salaryMax: "",
      city: "",
      country: "",
      deadline: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    console.log("Job post payload:", { ...data, isRemote });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <FiCheckCircle className="text-emerald-500 dark:text-emerald-400 text-4xl" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Job Published!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            Your job post is now live on HireLoop and visible to all candidates.
          </p>
        </div>
        <Button
          variant="bordered"
          startContent={<FiPlusCircle />}
          className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 mt-2"
          onPress={() => {
            reset();
            setIsSuccess(false);
          }}
        >
          Post Another Job
        </Button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ── Left Column ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Section: Job Info */}
          <FormSection title="Job Information" icon={<FiBriefcase />}>
            {/* Job Title — TextField wraps Input for label + validation */}
            <TextField
              isRequired
              isInvalid={!!errors.jobTitle}
              className="w-full"
            >
              <Label>Job Title</Label>
              <Input
                fullWidth
                placeholder="e.g. Senior Frontend Developer"
                {...register("jobTitle", { required: "Job title is required" })}
              />
              <FieldError>{errors.jobTitle?.message}</FieldError>
            </TextField>

            {/* Category + Job Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Select */}
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <Select
                      placeholder="Select a category"
                      isInvalid={!!errors.category}
                      value={field.value || null}
                      onChange={(val) => field.onChange(val)}
                      fullWidth
                    >
                      <Label>Job Category</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {JOB_CATEGORIES.map((cat) => (
                            <ListBox.Item key={cat} id={cat} textValue={cat}>
                              {cat}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                    {errors.category && (
                      <p className="text-xs text-red-500">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Job Type Select */}
              <Controller
                name="jobType"
                control={control}
                rules={{ required: "Job type is required" }}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <Select
                      placeholder="Select a type"
                      isInvalid={!!errors.jobType}
                      value={field.value || null}
                      onChange={(val) => field.onChange(val)}
                      fullWidth
                    >
                      <Label>Job Type</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {JOB_TYPES.map((type) => (
                            <ListBox.Item key={type} id={type} textValue={type}>
                              {type}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                    {errors.jobType && (
                      <p className="text-xs text-red-500">
                        {errors.jobType.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </FormSection>

          {/* Section: Job Description */}
          <FormSection title="Job Description" icon={<FiFileText />}>
            {/* Responsibilities */}
            <TextField
              isRequired
              isInvalid={!!errors.responsibilities}
              className="w-full"
            >
              <Label>Responsibilities</Label>
              <TextArea
                fullWidth
                rows={5}
                placeholder="Describe the key responsibilities of this role..."
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 resize-none transition-colors"
                {...register("responsibilities", {
                  required: "Responsibilities are required",
                })}
              />
              <FieldError>{errors.responsibilities?.message}</FieldError>
            </TextField>

            {/* Requirements */}
            <TextField
              isRequired
              isInvalid={!!errors.requirements}
              className="w-full"
            >
              <Label>Requirements</Label>
              <TextArea
                fullWidth
                rows={5}
                placeholder="List required skills, experience, and qualifications..."
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 resize-none transition-colors"
                {...register("requirements", {
                  required: "Requirements are required",
                })}
              />
              <FieldError>{errors.requirements?.message}</FieldError>
            </TextField>

            {/* Benefits (optional) */}
            <TextField className="w-full">
              <Label>
                Benefits{" "}
                <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">
                  (optional)
                </span>
              </Label>
              <TextArea
                fullWidth
                rows={3}
                placeholder="e.g. Health insurance, flexible hours, stock options..."
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 resize-none transition-colors"
                {...register("benefits")}
              />
            </TextField>
          </FormSection>
        </div>

        {/* ── Right Column (sidebar) ──────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Section: Compensation */}
          <FormSection title="Compensation" icon={<FiDollarSign />}>
            {/* Currency Select */}
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || "USD"}
                  onChange={(val) => field.onChange(val)}
                  fullWidth
                >
                  <Label>Currency</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {CURRENCIES.map((cur) => (
                        <ListBox.Item key={cur} id={cur} textValue={cur}>
                          {cur}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />

            {/* Salary Min + Max */}
            <div className="grid grid-cols-2 gap-3">
              <TextField isRequired isInvalid={!!errors.salaryMin}>
                <Label>Min</Label>
                <Input
                  fullWidth
                  type="number"
                  placeholder="50,000"
                  {...register("salaryMin", { required: "Required" })}
                />
                <FieldError>{errors.salaryMin?.message}</FieldError>
              </TextField>

              <TextField isRequired isInvalid={!!errors.salaryMax}>
                <Label>Max</Label>
                <Input
                  fullWidth
                  type="number"
                  placeholder="80,000"
                  {...register("salaryMax", {
                    required: "Required",
                    validate: (val, form) =>
                      Number(val) >= Number(form.salaryMin) || "Must be ≥ min",
                  })}
                />
                <FieldError>{errors.salaryMax?.message}</FieldError>
              </TextField>
            </div>
          </FormSection>

          {/* Section: Location */}
          <FormSection title="Location" icon={<FiMapPin />}>
            {/* Remote toggle */}
            <div className="flex items-center justify-between py-0.5">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Remote Position
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Toggle if fully remote
                </p>
              </div>
              <Switch
                isSelected={isRemote}
                onValueChange={setIsRemote}
                size="sm"
              />
            </div>

            {/* City + Country — hidden when remote */}
            {!isRemote && (
              <div className="space-y-3">
                <TextField isInvalid={!!errors.city} className="w-full">
                  <Label>City</Label>
                  <Input
                    fullWidth
                    placeholder="e.g. Dhaka"
                    {...register("city", {
                      required: !isRemote ? "City is required" : false,
                    })}
                  />
                  <FieldError>{errors.city?.message}</FieldError>
                </TextField>

                <TextField isInvalid={!!errors.country} className="w-full">
                  <Label>Country</Label>
                  <Input
                    fullWidth
                    placeholder="e.g. Bangladesh"
                    {...register("country", {
                      required: !isRemote ? "Country is required" : false,
                    })}
                  />
                  <FieldError>{errors.country?.message}</FieldError>
                </TextField>
              </div>
            )}
          </FormSection>

          {/* Section: Deadline */}
          <FormSection title="Application Deadline" icon={<FiCalendar />}>
            <TextField
              isRequired
              isInvalid={!!errors.deadline}
              className="w-full"
            >
              <Label>Deadline</Label>
              <Input
                fullWidth
                type="date"
                {...register("deadline", {
                  required: "Deadline is required",
                  validate: (val) =>
                    new Date(val) > new Date() || "Must be a future date",
                })}
              />
              <FieldError>{errors.deadline?.message}</FieldError>
            </TextField>
          </FormSection>

          {/* Section: Company (read-only) */}
          <FormSection title="Company" icon={<FaBuilding />}>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50">
              <div className="w-9 h-9 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {recruiter?.name?.[0]?.toUpperCase() ?? "C"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {recruiter?.name ?? "Your Company"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Auto-linked to your account
                </p>
              </div>
            </div>
          </FormSection>

          {/* Submit */}
          <SubmitButton isLoading={isSubmitting} />
        </div>
      </div>
    </form>
  );
}

// ── Reusable Section Card ──────────────────────────────────────────────────────
function FormSection({ title, icon, children }) {
  return (
    <Card className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/50">
      <Card.Header className="border-b border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center gap-2.5">
          <span className="text-blue-600 dark:text-blue-400 text-base">
            {icon}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
        </div>
      </Card.Header>
      <Card.Content className="space-y-4">{children}</Card.Content>
    </Card>
  );
}
