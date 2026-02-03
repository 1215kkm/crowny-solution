'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/market', label: '홈' },
  { href: '/market/search', label: '검색' },
  { href: '/market/chat', label: '채팅' },
  { href: '/market/my', label: 'MY' },
];

export default function MarketHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/market') {
      return pathname === '/market';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="hidden md:block sticky top-0 z-40 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-14 flex items-center justify-between">
          {/* 로고 */}
          <Link href="/market" className="flex items-center gap-2">
            <div className="flex flex-col items-start leading-none">
              <span className="text-base font-black text-white tracking-tight">CROWNY</span>
              <span className="text-[8px] font-medium text-amber-400 tracking-[0.2em]">MARKET</span>
            </div>
          </Link>

          {/* 검색바 */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="상품명, 지역명으로 검색"
                className="w-full px-4 py-2 pl-10 bg-neutral-900 border border-neutral-800 rounded-[3px] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-[3px] transition ${
                  isActive(item.href)
                    ? 'text-white bg-neutral-800'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/market/sell"
              className="ml-2 px-4 py-2 bg-white text-neutral-900 text-sm font-semibold rounded-[3px] hover:bg-neutral-100 transition"
            >
              판매하기
            </Link>
            <Link
              href="/"
              className="ml-2 px-3 py-2 text-sm text-neutral-500 hover:text-neutral-300 transition"
            >
              메인으로
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
