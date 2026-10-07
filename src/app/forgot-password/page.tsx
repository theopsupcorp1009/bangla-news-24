"use client";

import { requestPasswordReset } from "@/lib/auth-client";
import React from "react";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const handleSubmit = async(e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    
    const {data: resData, error} = await requestPasswordReset({
        email: userData.email as string,
        redirectTo: '/reset-password'
    });

    if (error) {
    toast.error(error.message || "ইমেইল পাঠাতে সমস্যা হয়েছে।");
    return;
  }

  toast.success("পাসওয়ার্ড পরিবর্তনের লিংক আপনার ইমেইলে পাঠানো হয়েছে।");

  };

  return (
    <main className="min-h-[80vh] bg-[#fcfcfc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#b80000] to-[#960000] px-6 py-8 text-center">
            <h1 className="text-2xl font-bold text-white">
              পাসওয়ার্ড ভুলে গেছেন?
            </h1>

            <p className="text-sm text-red-100 mt-2 leading-relaxed">
              চিন্তার কিছু নেই। আপনার ইমেইল ঠিকানা দিন,
              আমরা পাসওয়ার্ড পরিবর্তনের জন্য একটি লিংক পাঠাব।
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  ইমেইল ঠিকানা
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer py-3 px-4 rounded-lg bg-[#cc0000] hover:bg-[#b80000] text-white text-sm font-semibold transition-colors duration-200"
              >
                পাসওয়ার্ড পরিবর্তনের লিংক পাঠান
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

        {/* Footer text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          আপনার অ্যাকাউন্টের নিরাপত্তা আমাদের কাছে গুরুত্বপূর্ণ।
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;