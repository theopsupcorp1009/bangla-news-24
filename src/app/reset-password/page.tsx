"use client";

import { resetPassword } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const password = userData.password as string;
    const confirmPassword = userData.confirmPassword as string;

    // Password mismatch check
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    const resData = await resetPassword({
      newPassword: password,
      token: token as string,
    });

    if (resData.error) {
      toast.error(
        resData.error.message || "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে।",
      );
      return;
    }

    toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।");

    setTimeout(() => {
      router.push("/sign-in");
    }, 1500);
  };

  return (
    <main className="min-h-[80vh] bg-[#fcfcfc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#b80000] to-[#960000] px-6 py-8 text-center">
            <h1 className="text-2xl font-bold text-white">
              নতুন পাসওয়ার্ড সেট করুন
            </h1>

            <p className="text-sm text-red-100 mt-2 leading-relaxed">
              আপনার অ্যাকাউন্টের জন্য একটি নতুন ও নিরাপদ পাসওয়ার্ড তৈরি করুন।
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  নতুন পাসওয়ার্ড
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="নতুন পাসওয়ার্ড লিখুন"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent transition"
                />

                <p className="text-xs text-gray-400 mt-2">
                  কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড ব্যবহার করুন।
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="পাসওয়ার্ডটি আবার লিখুন"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer py-3 px-4 rounded-lg bg-[#cc0000] hover:bg-[#b80000] text-white text-sm font-semibold transition-colors duration-200"
              >
                পাসওয়ার্ড পরিবর্তন করুন
              </button>
            </form>

            {/* Back to Sign In */}
            <div className="mt-6 text-center">
              <a
                href="/sign-in"
                className="text-sm font-medium text-[#b80000] hover:text-[#960000] transition-colors"
              >
                ← লগইন পেজে ফিরে যান
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে শক্তিশালী পাসওয়ার্ড ব্যবহার
          করুন।
        </p>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
