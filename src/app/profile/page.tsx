"use client";

import Image from "next/image";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[70vh] bg-[#fcfcfc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#b80000]" />
      </div>
    );
  }

  // TypeScript now knows user exists
  const user = session.user;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট করতে সমস্যা হয়েছে");
        },
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUser = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };

    try {
      const { error } = await updateUser({
        ...newUser,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
      setIsEditing(false);
    } catch {
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#fcfcfc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#b80000] to-[#960000]" />

          <div className="px-6 pb-8">
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User Avatar"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-[#b80000]">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                )}
              </div>
            </div>

            {!isEditing ? (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4 text-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name || "ব্যবহারকারী"}
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    {user.email}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#fcfcfc] border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-1">
                      পূর্ণ নাম
                    </span>
                    <p className="text-sm font-semibold text-gray-800">
                      {user.name || "N/A"}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#fcfcfc] border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-1">
                      ইমেইল ঠিকানা
                    </span>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#fcfcfc] border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-1">
                      ইমেইল ভেরিফিকেশন
                    </span>

                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.emailVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {user.emailVerified ? "ভেরিফাইড" : "আনভেরিফাইড"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#fcfcfc] border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-1">
                      অ্যাকাউন্ট প্রকার
                    </span>
                    <p className="text-sm font-semibold text-gray-800">
                      সাধারণ ব্যবহারকারী
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer px-5 py-2.5 rounded-md text-sm font-medium text-white bg-[#cc0000] hover:bg-[#b80000] transition-all duration-200"
                  >
                    প্রোফাইল এডিট করুন
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="cursor-pointer px-5 py-2.5 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                  >
                    সাইন আউট
                  </button>
                </div>
              </div>
            ) : (
              <form className="mt-4 space-y-5" onSubmit={handleSubmit}>
                <div className="text-center border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    প্রোফাইল এডিট করুন
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    আপনার প্রোফাইলের তথ্য পরিবর্তন করুন
                  </p>
                </div>

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
                    defaultValue={user.name || ""}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#fcfcfc] border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-800 mb-1.5"
                  >
                    প্রোফাইল ছবির URL
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="text"
                    defaultValue={user.image || ""}
                    className="w-full px-3.5 py-2.5 bg-[#fcfcfc] border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#b80000] focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="cursor-pointer flex-1 py-2.5 rounded-md text-white font-medium bg-[#cc0000] hover:bg-[#b80000] transition-colors"
                  >
                    পরিবর্তন সংরক্ষণ করুন
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="cursor-pointer px-5 py-2.5 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;