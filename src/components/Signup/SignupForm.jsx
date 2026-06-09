"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiCheckCircle, BiLock } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FaMailBulk, FaUser } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: { role: "seeker" } });

  const password = watch("password");
  const role = watch("role");

  const checkStrength = (val) => {
    if (!val) return setPasswordStrength({ score: 0, label: "", color: "" });
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^a-zA-Z0-9]/.test(val)) score++;
    const labels = ["Weak", "Fair", "Good", "Strong"];
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
    setPasswordStrength({
      score,
      label: labels[Math.max(0, score - 1)],
      color: colors[Math.max(0, score - 1)],
    });
  };

  const onSubmit = async (userdata) => {
    setIsSubmitting(true);
    clearErrors();
    setSuccess(false);
    try {
      const { name, email, password, role } = userdata;
      const { data, error } = await authClient.signUp.email({
        role,
        name,
        email,
        password,
        callbackURL: "/",
      });
      if (error) {
        console.error("Signup error:", error.message);
        return;
      }
      if (data) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          redirect("/");
        }, 2500);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Role Radio */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-400 mb-3">
          I am a
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "seeker", label: "Job Seeker", emoji: "👤" },
            { value: "recruiter", label: "Recruiter", emoji: "🏢" },
          ].map(({ value, label, emoji }) => (
            <label
              key={value}
              className={`relative flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border cursor-pointer transition-all text-sm font-semibold select-none
                ${
                  role === value
                    ? "bg-linear-to-r from-blue-500/20 to-violet-500/20 border-violet-500/60 text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/8 hover:border-white/20"
                }`}
            >
              <input
                type="radio"
                value={value}
                {...register("role", { required: true })}
                className="sr-only"
              />
              <span>{emoji}</span>
              <span>{label}</span>
              {role === value && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-400" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Full Name
        </label>
        <div className="relative">
          <FaUser
            className="absolute left-4 top-3.5 text-slate-500"
            size={20}
          />
          <input
            {...register("name", { required: true, minLength: 2 })}
            type="text"
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:bg-white/10 transition-all outline-none"
          />
        </div>
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">
            Name must be at least 2 characters
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Email Address
        </label>
        <div className="relative">
          <FaMailBulk
            className="absolute left-4 top-3.5 text-slate-500"
            size={20}
          />
          <input
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:bg-white/10 transition-all outline-none"
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">
            Please enter a valid email
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Password
        </label>
        <div className="relative">
          <BiLock
            className="absolute left-4 top-3.5 text-slate-500"
            size={20}
          />
          <input
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            onChange={(e) => checkStrength(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:bg-white/10 transition-all outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300"
          >
            {showPassword ? <FiEyeOff size={20} /> : <BsEye size={20} />}
          </button>
        </div>
        {password && (
          <div className="mt-3">
            <div className="flex gap-1.5 mb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all"
                  style={{
                    background:
                      i <= passwordStrength.score
                        ? passwordStrength.color
                        : "#334155",
                  }}
                />
              ))}
            </div>
            <p className="text-xs" style={{ color: passwordStrength.color }}>
              Strength: {passwordStrength.label}
            </p>
          </div>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register("terms", { required: true })}
          className="mt-1 w-4 h-4 accent-violet-600 cursor-pointer"
        />
        <label className="text-sm text-slate-400 cursor-pointer">
          I agree to the{" "}
          <a href="#" className="text-violet-400 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-violet-400 hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-400 text-xs">You must accept the terms</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-linear-to-r from-blue-500 to-violet-600 rounded-2xl font-semibold text-lg text-white hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>

      {/* Success */}
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-center flex items-center justify-center gap-2">
          <BiCheckCircle size={20} />
          <strong>Account created successfully! Redirecting...</strong>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-slate-500">Or continue with</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-3 py-3.5 border border-white/10 hover:bg-white/5 rounded-2xl transition-all text-slate-300 text-sm"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-3 py-3.5 border border-white/10 hover:bg-white/5 rounded-2xl transition-all text-slate-300 text-sm"
        >
          <img
            src="https://www.linkedin.com/favicon.ico"
            alt="LinkedIn"
            className="w-5 h-5"
          />
          LinkedIn
        </button>
      </div>

      <p className="text-center text-slate-400 text-sm mt-8">
        Already have an account?{" "}
        <a
          href="/signin"
          className="text-violet-400 hover:underline font-medium"
        >
          Sign in
        </a>
      </p>
    </form>
  );
};

export default SignupForm;
