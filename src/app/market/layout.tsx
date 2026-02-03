'use client';

import { ReactNode } from 'react';
import BottomNav from '@/components/market/BottomNav';
import MarketHeader from '@/components/market/MarketHeader';

interface MarketLayoutProps {
  children: ReactNode;
}

export default function MarketLayout({ children }: MarketLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 헤더 (PC에서만 표시) */}
      <MarketHeader />

      {/* 메인 콘텐츠 */}
      <main className="pb-20 md:pb-8">
        {children}
      </main>

      {/* 하단 네비게이션 (모바일에서만 표시) */}
      <BottomNav />
    </div>
  );
}
