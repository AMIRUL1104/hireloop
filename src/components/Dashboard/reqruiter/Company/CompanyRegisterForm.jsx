// src/components/Dashboard/reqruiter/Company/CompanyRegisterForm.jsx
"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiMapPin, FiUploadCloud } from "react-icons/fi";
import { Button } from "@heroui/react";
import Image from "next/image";
import { AddCompany } from "@/lib/Server/actions/company";
import { toast } from "react-toastify";

export default function CompanyRegisterForm({ onClose ,userId}) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target?.files?.[0]; // FileList থেকে প্রথম ফাইলটা নেওয়া

    if (file) {
      setSelectedFile(file);

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview); // পুরোনো URL মেমোরি ক্লিনআপ
      }

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    let logoUrl = "";

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          { method: "POST", body: formData },
        );

        const result = await response.json();

        if (result.success) {
          logoUrl = result.data.url;
        } else {
          throw new Error("ImgBB upload failed");
        }
      }

      const finalPayload = { ...data, logo: logoUrl,userId:userId };
      console.log("Final Payload:", finalPayload);

      // await axios.post('/api/company', finalPayload)

      // alert("Company registered successfully! Status: Pending Admin Approval.");
      const result = await AddCompany(finalPayload);
      if (result.insertedId) {
        toast.success(
          "Company registered successfully! Status: Pending Admin Approval.",
        );
      }
      setImagePreview(null);
      setSelectedFile(null);
      reset();
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong while uploading image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      {/* Form Body */}
      <div className="p-6 space-y-5">
        {/* Row 1: Company Name & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              className={`w-full bg-[#161D30] border ${
                errors.name
                  ? "border-rose-500"
                  : "border-gray-800 focus:border-blue-500"
              } rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-all`}
              {...register("name", { required: "Company name is required" })}
            />
            {errors.name && (
              <p className="text-[11px] text-rose-500 mt-0.5">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Industry / Category
            </label>
            <select
              className={`w-full bg-[#161D30] border ${
                errors.industry
                  ? "border-rose-500"
                  : "border-gray-800 focus:border-blue-500"
              } rounded-lg px-3 py-2 text-sm text-gray-300 outline-none transition-all`}
              {...register("industry", {
                required: "Please select an industry",
              })}
            >
              <option value="">Select Industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Financial Services</option>
              <option value="Marketing">Marketing & Advertising</option>
              <option value="Healthcare">Healthcare</option>
            </select>
            {errors.industry && (
              <p className="text-[11px] text-rose-500 mt-0.5">
                {errors.industry.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Website URL & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Website URL
            </label>
            <div className="flex rounded-lg overflow-hidden border border-gray-800 bg-[#161D30]">
              <span className="bg-gray-900 px-3 py-2 text-xs text-gray-500 flex items-center border-r border-gray-800 select-none">
                https://
              </span>
              <input
                type="text"
                placeholder="www.company.com"
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-gray-500 outline-none"
                {...register("website")}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Location
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="City, Country"
                className={`w-full bg-[#161D30] border ${
                  errors.location
                    ? "border-rose-500"
                    : "border-gray-800 focus:border-blue-500"
                } rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-all`}
                {...register("location", { required: "Location is required" })}
              />
            </div>
            {errors.location && (
              <p className="text-[11px] text-rose-500 mt-0.5">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Employee Count & Logo Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Employee Count Range
            </label>
            <select
              className="w-full bg-[#161D30] border border-gray-800 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none transition-all"
              {...register("size")}
            >
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="50-200 employees">50-200 employees</option>
              <option value="201+ employees">201+ employees</option>
            </select>
          </div>

          {/* Logo Uploader */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Company Logo
            </label>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <div
              onClick={triggerFileSelect}
              className="flex items-center gap-3 bg-[#161D30] border border-dashed border-gray-800 rounded-lg p-2.5 hover:border-gray-600 transition-all cursor-pointer select-none"
            >
              {/* ✅ fill prop-এর জন্য relative + নির্দিষ্ট size দেওয়া হয়েছে */}
              <div className="relative w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 border border-gray-800 overflow-hidden flex-shrink-0">
                {imagePreview ? (
                  <Image
                    fill
                    src={imagePreview}
                    alt="Logo Preview"
                    className="object-cover"
                  />
                ) : (
                  <FiUploadCloud className="text-lg" />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-white truncate">
                  {selectedFile?.name
                    ? selectedFile.name.length > 18
                      ? `${selectedFile.name.slice(0, 18)}...`
                      : selectedFile.name
                    : "Upload Image"}
                </span>
                <span className="text-[10px] text-gray-500">
                  PNG, JPG up to 5MB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-300">
            Brief Description
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about your company's mission and culture..."
            className={`w-full bg-[#161D30] border ${
              errors.description
                ? "border-rose-500"
                : "border-gray-800 focus:border-blue-500"
            } rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-all resize-none`}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-[11px] text-rose-500 mt-0.5">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      {/* Footer — Modal.Footer নেই HeroUI v3-তে, তাই plain div */}
      <div className="p-4 bg-[#0E121F] border-t border-gray-800/80 flex justify-end gap-3">
        <Button
          type="button"
          onPress={onClose}
          className="bg-transparent hover:bg-gray-900 text-gray-400 hover:text-white font-medium px-5 h-9 rounded-lg border border-gray-800 transition-all"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          isLoading={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-6 h-9 rounded-lg shadow-[0_4px_15px_rgba(37,99,235,0.25)] transition-all"
        >
          Register Company
        </Button>
      </div>
    </form>
  );
}
