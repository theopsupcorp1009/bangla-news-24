"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

type UserInfoProps = {
  mobileMenu?: boolean;
  onCloseMenu?: () => void;
};

const UserInfo = ({
  mobileMenu = false,
  onCloseMenu,
}: UserInfoProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [showMobileActions, setShowMobileActions] = useState(false);

  const handleSignOut = async () => {
    onCloseMenu?.();
    setShowMobileActions(false);

    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

if (mobileMenu) {
  return (
    <div className="w-full">
      {user ? (
        <>
          {/* Profile */}
          <Link
            href="/profile"
            onClick={onCloseMenu}
            className="
              flex items-center justify-between
              px-5 py-4
              text-base sm:text-lg
              font-medium
              text-gray-800
              border-b border-gray-200
              hover:bg-gray-50
              hover:text-[#b80000]
              transition-colors
            "
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="
                  relative
                  w-9 h-9
                  rounded-full
                  overflow-hidden
                  shrink-0
                "
              >
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate">
                  {user.name}
                </p>

                <p className="text-xs sm:text-sm text-gray-500 font-normal">
                  প্রোফাইল
                </p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
          </Link>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="
              cursor-pointer
              flex items-center justify-between
              w-full
              px-5 py-4
              text-base sm:text-lg
              font-medium
              text-gray-800
              border-b border-gray-200
              hover:bg-gray-50
              hover:text-[#b80000]
              transition-colors
            "
          >
            <span>সাইন আউট</span>

            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </>
      ) : (
        <>
          {/* Sign In */}
          <Link
            href="/sign-in"
            onClick={onCloseMenu}
            className="
              flex items-center justify-between
              px-5 py-4
              text-base sm:text-lg
              font-medium
              text-gray-800
              border-b border-gray-200
              hover:bg-gray-50
              hover:text-[#b80000]
              transition-colors
            "
          >
            <span>সাইন ইন</span>

            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          {/* Sign Up */}
          <Link
            href="/sign-up"
            onClick={onCloseMenu}
            className="
              flex items-center justify-between
              px-5 py-4
              text-base sm:text-lg
              font-medium
              text-gray-800
              hover:bg-gray-50
              hover:text-[#b80000]
              transition-colors
            "
          >
            <span>সাইন আপ</span>

            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </>
      )}
    </div>
  );
}

  return (
    <div className="justify-self-end">
      {user ? (
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setShowMobileActions((prev) => !prev)
            }
            aria-label="User menu"
            aria-expanded={showMobileActions}
            className="
              cursor-pointer
              flex md:hidden
              items-center justify-center
              w-9 h-9
              sm:w-10 sm:h-10
              rounded-full
              overflow-hidden
              border border-gray-200
            "
          >
            <Image
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </button>

          {showMobileActions && (
            <>
              <button
                type="button"
                aria-label="Close user menu"
                onClick={() => setShowMobileActions(false)}
                className="fixed inset-0 z-40 cursor-default"
              />

              <div
                className="
                  absolute
                  right-0
                  top-12
                  sm:top-14
                  z-50
                  w-44
                  bg-white
                  border border-gray-100
                  rounded-lg
                  shadow-lg
                  overflow-hidden
                "
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user.name}
                  </p>
                </div>

                <Link
                  href="/profile"
                  onClick={() =>
                    setShowMobileActions(false)
                  }
                  className="
                    block
                    px-4 py-3
                    text-sm
                    font-medium
                    text-gray-700
                    hover:bg-gray-50
                    hover:text-[#b80000]
                    transition-colors
                  "
                >
                  প্রোফাইল দেখুন
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="
                    cursor-pointer
                    w-full
                    text-left
                    px-4 py-3
                    text-sm
                    font-medium
                    text-gray-700
                    hover:bg-gray-50
                    hover:text-[#b80000]
                    transition-colors
                    border-t border-gray-100
                  "
                >
                  সাইন আউট
                </button>
              </div>
            </>
          )}

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-2"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>

              <span
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  max-w-28
                  truncate
                "
              >
                {user.name}
              </span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="
                cursor-pointer
                text-sm
                font-medium
                text-gray-700
                hover:text-[#b80000]
                transition-colors
                px-3 py-1.5
                rounded-md
                hover:bg-gray-50
              "
            >
              সাইন আউট
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/sign-in"
            className="
              text-sm
              font-medium
              text-gray-700
              hover:text-[#b80000]
              px-2 lg:px-3
              py-1.5
              transition-colors
            "
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="
              text-sm
              font-medium
              text-white
              bg-[#b80000]
              hover:bg-[#960000]
              px-3 lg:px-4
              py-1.5
              rounded
              transition-colors
            "
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;