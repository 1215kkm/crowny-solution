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
    <header className="hidden md:block sticky top-0 z-40 bg-[var(--background)] border-b border-[var(--border-color)]">
      <div className="market-container">
        <div className="h-[var(--header-height)] flex items-center justify-between">
          {/* 로고 */}
          <Link href="/market" className="flex items-center gap-2">
            <span className="text-[var(--text-h3)] font-bold">CROWNY</span>
            <span className="text-[var(--text-caption)] text-[var(--foreground-muted)]">MARKET</span>
          </Link>

          {/* 검색바 */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="상품명, 지역명으로 검색"
                className="input pl-10 bg-[var(--background-secondary)] border-transparent focus:border-[var(--primary)] focus:bg-[var(--background)]"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground-muted)]"
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
                className={`px-4 py-2 text-[var(--text-body-sm)] font-medium rounded-[var(--border-radius)] transition-colors ${
                  isActive(item.href)
                    ? 'text-[var(--foreground)] bg-[var(--background-secondary)]'
                    : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/market/sell"
              className="btn btn-primary ml-2"
            >
              판매하기
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
