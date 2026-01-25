"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "소개" },
  { href: "/enterprises", label: "기업" },
  { href: "/tv", label: "TV" },
  { href: "/dashboard", label: "대시보드" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start leading-none">
          <span className="text-xl font-black text-neutral-900 tracking-tight">CROWNY</span>
          <span className="text-[9px] font-medium text-neutral-400 tracking-[0.3em] mt-0.5">PRESENT</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 rounded-[3px] hover:bg-neutral-100 transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="ml-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-[3px] hover:bg-neutral-800 transition-all"
          >
            로그인
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-[3px] hover:bg-neutral-100 transition-all"
          aria-label="메뉴 열기"
        >
          <span className={`block w-5 h-0.5 bg-neutral-700 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""}`} />
          <span className={`block w-5 h-0.5 bg-neutral-700 my-1 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-neutral-700 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 border-t border-neutral-200" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 space-y-1 bg-white/95 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-[3px] transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block mt-2 px-4 py-3 text-sm font-medium text-center text-white bg-neutral-900 rounded-[3px] hover:bg-neutral-800 transition-all"
          >
            로그인
          </Link>
        </div>
      </div>
    </nav>
  );
}
