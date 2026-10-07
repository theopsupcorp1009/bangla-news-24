"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import UserInfo from "./UserInfo";

type MobileNavProps = {
  navItems: Category[];
};

const MobileNav = ({ navItems }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent page scrolling while sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ================= MENU BUTTON ================= */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="
          cursor-pointer
          flex items-center justify-center
          w-10 h-10
          rounded-lg
          text-gray-700
          hover:bg-gray-100
          active:bg-gray-200
          transition-colors
        "
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed
          top-0
          left-0
          bottom-0
          z-50

          w-[280px]
          max-w-[85vw]

          bg-white
          border-r border-gray-200
          shadow-xl

          overflow-y-auto

          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ================= SIDEBAR HEADER ================= */}
        <div
          className="
            flex items-center justify-between
            h-16
            px-5
            border-b border-gray-100
          "
        >
          <span className="text-lg font-bold text-[#b80000]">
            মেনু
          </span>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="
              cursor-pointer
              flex items-center justify-center
              w-9 h-9
              rounded-lg
              text-gray-600
              hover:bg-gray-100
              hover:text-[#b80000]
              transition-colors
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav>
          {/* Home */}
          <Link
            href="/"
            onClick={closeMenu}
            className="
              flex items-center justify-between
              px-5 py-4
              text-base sm:text-lg
              font-medium
              text-gray-800
              border-b border-gray-100
              hover:bg-gray-50
              hover:text-[#b80000]
              transition-colors
            "
          >
            <span>হোম</span>

            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          {/* Categories */}
          {navItems.map((item) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              onClick={closeMenu}
              className="
                flex items-center justify-between
                px-5 py-4
                text-base sm:text-lg
                font-medium
                text-gray-800
                border-b border-gray-100
                hover:bg-gray-50
                hover:text-[#b80000]
                transition-colors
              "
            >
              <span>{item.title}</span>

              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </nav>

        {/* ================= USER ================= */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <UserInfo
            mobileMenu
            onCloseMenu={closeMenu}
          />
        </div>
      </aside>
    </>
  );
};

export default MobileNav;