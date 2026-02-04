'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation, type Locale } from '@/i18n';

type MarketGrade = 'SUPER_ADMIN' | 'CROWN' | 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE';

interface Commission {
  id: string;
  orderId: string;
  productTitle: string;
  buyerName: string;
  sellerName: string;
  orderAmount: number;
  rate: number;
  amount: number;
  grade: MarketGrade;
  createdAt: string;
}

// 임시 수수료 데이터
const mockCommissions: Commission[] = [
  {
    id: 'c1',
    orderId: 'o1',
    productTitle: '아이폰 15 Pro 256GB',
    buyerName: '구매자A',
    sellerName: '판매자B',
    orderAmount: 15000,
    rate: 0.25,
    amount: 37,
    grade: 'SILVER',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'c2',
    orderId: 'o2',
    productTitle: '맥북 프로 M3',
    buyerName: '구매자C',
    sellerName: '판매자D',
    orderAmount: 32000,
    rate: 0.25,
    amount: 80,
    grade: 'SILVER',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'c3',
    orderId: 'o3',
    productTitle: '에어팟 프로 2세대',
    buyerName: '구매자E',
    sellerName: '판매자F',
    orderAmount: 2800,
    rate: 0.25,
    amount: 7,
    grade: 'SILVER',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: 'c4',
    orderId: 'o4',
    productTitle: '갤럭시 워치 6',
    buyerName: '구매자G',
    sellerName: '판매자H',
    orderAmount: 3500,
    rate: 0.25,
    amount: 8,
    grade: 'SILVER',
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
  },
];

const mockStats = {
  thisMonth: 150,
  lastMonth: 280,
  total: 1250,
  grade: 'SILVER' as MarketGrade,
  rate: 0.25,
};

const LOCALE_MAP: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  zh: 'zh-CN',
  ja: 'ja-JP',
  vi: 'vi-VN',
  th: 'th-TH',
};

export default function CommissionsPage() {
  const { t, locale } = useTranslation();
  const [period, setPeriod] = useState<'all' | 'month' | 'week'>('all');

  const gradeInfo: Record<MarketGrade, { label: string; color: string; rate: string }> = {
    SUPER_ADMIN: { label: t('grade_super_admin'), color: 'bg-[var(--grade-super-admin)]', rate: '0.5%' },
    CROWN: { label: t('grade_crown'), color: 'bg-[var(--grade-crown)] text-[var(--foreground)]', rate: '1.5%' },
    DIAMOND: { label: t('grade_diamond'), color: 'bg-[var(--grade-diamond)]', rate: '1.0%' },
    GOLD: { label: t('grade_gold'), color: 'bg-[var(--grade-gold)] text-[var(--foreground)]', rate: '0.75%' },
    SILVER: { label: t('grade_silver'), color: 'bg-[var(--grade-silver)]', rate: '0.25%' },
    BRONZE: { label: t('grade_bronze'), color: 'bg-[var(--grade-bronze)]', rate: '0%' },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(LOCALE_MAP[locale]).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(LOCALE_MAP[locale], {
      month: 'long',
      day: 'numeric',
    });
  };

  const currentGrade = gradeInfo[mockStats.grade];

  return (
    <div>
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center px-[var(--spacing-md)] h-[var(--header-height)]">
          <Link href="/market/my" className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-[var(--text-body)] font-semibold ml-2">{t('market.commissionHistory')}</h1>
        </div>
      </header>

      <div className="market-container py-[var(--spacing-md)]">
        {/* 현재 등급 & 수수료율 */}
        <div className="card p-[var(--spacing-lg)] mb-[var(--spacing-md)] text-center">
          <span className={`badge ${currentGrade.color} text-white mb-2`}>
            {currentGrade.label}
          </span>
          <p className="text-[var(--text-caption)] text-[var(--foreground-secondary)] mb-1">{t('market.myCommissionRate')}</p>
          <p className="text-[var(--text-display)] font-bold text-[var(--accent)]">
            {currentGrade.rate}
          </p>
          <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mt-2">
            {t('market.commissionDesc')}
          </p>
        </div>

        {/* 수익 통계 */}
        <div className="grid grid-cols-3 gap-[var(--spacing-sm)] mb-[var(--spacing-lg)]">
          <div className="card p-[var(--spacing-md)] text-center">
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">{t('market.thisMonth')}</p>
            <p className="text-[var(--text-h4)] font-bold text-[var(--success)]">
              +{formatPrice(mockStats.thisMonth)}
            </p>
          </div>
          <div className="card p-[var(--spacing-md)] text-center">
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">{t('market.lastMonth')}</p>
            <p className="text-[var(--text-h4)] font-bold">
              +{formatPrice(mockStats.lastMonth)}
            </p>
          </div>
          <div className="card p-[var(--spacing-md)] text-center">
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">{t('market.cumulative')}</p>
            <p className="text-[var(--text-h4)] font-bold">
              +{formatPrice(mockStats.total)}
            </p>
          </div>
        </div>

        {/* 등급별 수수료율 안내 */}
        <div className="card p-[var(--spacing-md)] mb-[var(--spacing-lg)]">
          <h3 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-sm)]">{t('market.gradeCommissionRates')}</h3>
          <div className="space-y-2">
            {Object.entries(gradeInfo).map(([grade, info]) => (
              <div
                key={grade}
                className={`flex items-center justify-between py-1 ${
                  grade === mockStats.grade ? 'font-medium' : 'text-[var(--foreground-secondary)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`badge text-white text-[var(--text-tiny)] ${info.color}`}>
                    {info.label}
                  </span>
                  {grade === mockStats.grade && (
                    <span className="text-[var(--text-tiny)] text-[var(--accent)]">{t('market.current')}</span>
                  )}
                </div>
                <span className="text-[var(--text-body-sm)]">{info.rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 수수료 내역 */}
        <div className="mb-[var(--spacing-md)]">
          <div className="flex items-center justify-between mb-[var(--spacing-sm)]">
            <h2 className="text-[var(--text-body-sm)] font-semibold">{t('market.detailedHistory')}</h2>
            <div className="flex gap-1">
              {[
                { id: 'all', label: t('all') },
                { id: 'month', label: t('market.thisMonth') },
                { id: 'week', label: t('market.thisWeek') },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPeriod(option.id as 'all' | 'month' | 'week')}
                  className={`px-3 py-1 rounded-[var(--border-radius-full)] text-[var(--text-caption)] transition-colors ${
                    period === option.id
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--background-secondary)] text-[var(--foreground-secondary)]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {mockCommissions.length > 0 ? (
          <div className="space-y-[var(--spacing-sm)]">
            {mockCommissions.map((commission) => (
              <div key={commission.id} className="card p-[var(--spacing-md)]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[var(--text-body-sm)] font-medium line-clamp-1">
                      {commission.productTitle}
                    </p>
                    <p className="text-[var(--text-caption)] text-[var(--foreground-muted)]">
                      {commission.sellerName} → {commission.buyerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[var(--text-body)] font-bold text-[var(--success)]">
                      +{formatPrice(commission.amount)} CROWNY
                    </p>
                    <p className="text-[var(--text-caption)] text-[var(--foreground-muted)]">
                      {formatDate(commission.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-caption)] text-[var(--foreground-secondary)]">
                  <span>{t('market.transactionAmount')}: {formatPrice(commission.orderAmount)}</span>
                  <span>·</span>
                  <span>{t('market.commissionRate')}: {commission.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state py-12">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[var(--text-body-sm)]">{t('market.noCommissions')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
