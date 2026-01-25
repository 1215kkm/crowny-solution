"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start leading-none">
          <span className="text-xl font-black text-neutral-900 tracking-tight">CROWNY</span>
          <span className="text-[9px] font-medium text-neutral-400 tracking-[0.3em] mt-0.5">PRESENT</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/about" className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 rounded-[3px] hover:bg-neutral-100 transition-all">
            소개
          </Link>
          <Link href="/enterprises" className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 rounded-[3px] hover:bg-neutral-100 transition-all">
            기업
          </Link>
          <Link href="/tv" className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 rounded-[3px] hover:bg-neutral-100 transition-all">
            TV
          </Link>
          <Link href="/dashboard" className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 rounded-[3px] hover:bg-neutral-100 transition-all">
            대시보드
          </Link>
          <Link
            href="/login"
            className="ml-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-[3px] hover:bg-neutral-800 transition-all"
          >
            로그인
          </Link>
        </div>
      </div>
    </nav>
  );
}
