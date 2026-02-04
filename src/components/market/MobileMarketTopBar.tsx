'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function MobileMarketTopBar() {
  const { t } = useTranslation();

  return (
    <div className="md:hidden bg-neutral-950 border-b border-neutral-800">
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/market" className="flex items-center gap-1.5">
          <span className="text-sm font-black text-white tracking-tight">CROWNY</span>
          <span className="text-[8px] font-medium text-amber-400 tracking-[0.15em]">MARKET</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-neutral-400 border border-neutral-700 rounded-[3px] hover:text-white hover:border-neutral-500 transition"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {t('nav_companySite')}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
