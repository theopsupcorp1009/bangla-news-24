"use client"

import { signIn, signUp } from "@/lib/auth-client";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const router = useRouter();

    const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {name: string, email:string, image:string, password:string};

    try {
      const { data, error } = await signUp.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        console.error("Sign up failed:", error.message || error);
        toast.error(error.message || "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        return;
      }

      if (data) {
        toast.success("সাইন আপ সফল হয়েছে! আপনার ইমেইলে ভেরিফিকেশন লিংক পাঠানো হয়েছে");
        router.push("/");
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("একটি অপ্রত্যাশিত সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };

  const handleGoogleSignUp = async() => {
      const data = await signIn.social({
          provider: "google",
      })
    }

  return (
    <div className="bg-[#fcfcfc] flex justify-center my-10 p-10 md:p-0 lg:p-0">
      <div className="max-w-md w-full space-y-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#b80000] tracking-wide">
            সাইন আপ
          </h2>
        </div>

        {/* Form Container */}
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800 mb-1.5"
              >
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-3.5 py-2.5 bg-[#fcfcfc] border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-800 mb-1.5"
              >
                Image
              </label>
              <input
                id="image"
                name="image"
                type="text"
                className="w-full px-3.5 py-2.5 bg-[#fcfcfc] border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-1.5"
              >
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 bg-[#fcfcfc] border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-1.5"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-3.5 py-2.5 bg-[#fcfcfc] border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="cursor-pointer w-full py-3 px-4 rounded-md text-white font-medium bg-[#cc0000] hover:bg-[#b80000] active:scale-[0.99] transition-all duration-200 shadow-sm hover:shadow"
            >
              সাইন আপ করুন
            </button>
          </div>

           <div>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="cursor-pointer w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.99] transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google দিয়ে সাইন আপ করুন
          </button>
        </div>

       
          <div className="text-center text-sm text-gray-700 pt-2">
            অ্যাাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className=" cursor-pointer font-semibold text-[#b80000] hover:text-[#960000] hover:underline transition-colors duration-200"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
