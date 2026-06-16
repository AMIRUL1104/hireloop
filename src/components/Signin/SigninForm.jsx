"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userdata) => {
    setIsSubmitting(true);
    clearErrors();
    setSuccess(false); // নতুন সাবমিশনের আগে আগের সাকসেস স্টেট রিসেট করা ভালো

    try {
      // সাইন-ইনের জন্য শুধু email এবং password প্রয়োজন
      const { email, password } = userdata;

      // ১. ব্যাকএন্ডে সাইন-ইন রিকোয়েস্ট পাঠানো (Real API Call)
      const { data, error } = await authClient.signIn.email({
        email: email, // required
        password: password, // required
      });

      // ২. যদি ব্যাকএন্ড থেকে কোনো এরর আসে (ভুল পাসওয়ার্ড বা ইমেইল)
      if (error) {
        // console.error("Sign in error:", error.message);
        toast.error(error.message || "An error occurred during sign in.");
        // প্রয়োজন হলে এখানে এরর স্টেট সেট করতে পারো

        return; // এরর আসলে ফাংশন এখানেই থেমে যাবে
      }

      // ৩. যদি সাইন-ইন সফল হয় (Success Flow)
      if (data) {
        setSuccess(true);
        // console.log("Sign in successful:", data);

        // ২.২ সেকেন্ড পর সাকসেস মেসেজটি হাইড করার জন্য (তোমার আগের টাইমিং অনুযায়ী)
        setTimeout(() => {
          setSuccess(false);
          // ড্যাশবোর্ড বা হোম পেজে রিডাইরেক্ট করতে চাইলে নিচের লাইনটি আনকমেন্ট করো
          router.push(redirectTo);
        }, 2200);
      }
    } catch (err) {
      // নেটওয়ার্ক ইস্যু বা অন্য কোনো আনএক্সপেক্টেড এরর হ্যান্ডেল করার জন্য
      console.error("An unexpected error occurred during sign in:", err);
    } finally {
      // সাকসেস হোক বা এরর—সবশেষে লোডিং স্টেট বন্ধ হবে
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Email Address
        </label>
        <div className="relative group">
          <Mail
            className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-violet-400 transition-colors"
            size={20}
          />
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 py-3.5 text-white placeholder:text-slate-500 focus:border-violet-500 focus:bg-white/10 focus:ring-1 focus:ring-violet-500/30 transition-all outline-none"
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-slate-400">
            Password
          </label>
          <a
            href="#"
            className="text-xs text-violet-400 hover:text-violet-300 hover:underline transition-colors"
          >
            Forgot Password?
          </a>
        </div>

        <div className="relative group">
          <Lock
            className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-violet-400 transition-colors"
            size={20}
          />
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-3.5 text-white placeholder:text-slate-500 focus:border-violet-500 focus:bg-white/10 focus:ring-1 focus:ring-violet-500/30 transition-all outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1.5">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-linear-to-r from-blue-500 via-violet-600 to-purple-600 rounded-2xl font-semibold text-lg text-white hover:brightness-110 active:scale-[0.985] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 flex items-center justify-center gap-2 text-center">
          <CheckCircle size={20} />
          <strong>Sign in successful! Redirecting ...</strong>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-slate-500 font-medium">
          OR CONTINUE WITH
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-3 py-3.5 border border-white/10 hover:bg-white/5 rounded-2xl transition-all duration-200 hover:border-white/20"
        >
          <Image
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
            width={20}
            height={20}
          />
          <span className="text-sm font-medium text-white">Google</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-3 py-3.5 border border-white/10 hover:bg-white/5 rounded-2xl transition-all duration-200 hover:border-white/20"
        >
          <Image
            src="https://www.linkedin.com/favicon.ico"
            alt="LinkedIn"
            className="w-5 h-5"
            width={20}
            height={20}
          />
          <span className="text-sm font-medium text-white">LinkedIn</span>
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-slate-400 text-sm mt-8">
        Don&apos;t have an account?{" "}
        <a
          href={`/signup?redirect=${redirectTo}`}
          className="text-violet-400 hover:text-violet-300 font-medium hover:underline transition-colors"
        >
          Sign up
        </a>
      </p>
    </form>
  );
};

export default SigninForm;
