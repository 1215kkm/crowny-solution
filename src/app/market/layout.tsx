'use client';

import { ReactNode, useMemo } from 'react';
import BottomNav from '@/components/market/BottomNav';
import MarketHeader from '@/components/market/MarketHeader';
import { I18nProvider, Namespace } from '@/i18n';

interface MarketLayoutProps {
  children: ReactNode;
}

export default function MarketLayout({ children }: MarketLayoutProps) {
  const namespaces = useMemo<Namespace[]>(() => ['common', 'market'], []);

  return (
    <I18nProvider namespaces={namespaces}>
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
    </I18nProvider>
  );
}
