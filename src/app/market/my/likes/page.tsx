'use client';

import Link from 'next/link';
import ProductCard, { Product } from '@/components/market/ProductCard';
import { useTranslation } from '@/i18n';

// 임시 찜 목록 데이터
const mockLikes: Product[] = [
  {
    id: '1',
    title: '아이폰 15 Pro 256GB 블랙 풀박스',
    price: 15000,
    images: [],
    location: '서울 강남구',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likeCount: 12,
    chatCount: 3,
    status: 'ACTIVE',
  },
  {
    id: '2',
    title: '맥북 프로 14인치 M3 Pro',
    price: 32000,
    images: [],
    location: '서울 마포구',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likeCount: 24,
    chatCount: 7,
    status: 'ACTIVE',
  },
  {
    id: '3',
    title: '소니 WH-1000XM5 헤드폰',
    price: 2500,
    images: [],
    location: '서울 송파구',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likeCount: 15,
    chatCount: 4,
    status: 'RESERVED',
  },
  {
    id: '4',
    title: '나이키 에어맥스 270 새상품',
    price: 800,
    images: [],
    location: '서울 서초구',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    likeCount: 5,
    chatCount: 1,
    status: 'SOLD',
  },
];

export default function LikesPage() {
  const { t } = useTranslation();

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
          <h1 className="text-[var(--text-body)] font-semibold ml-2">{t('market.wishlist')}</h1>
        </div>
      </header>

      <div className="market-container py-[var(--spacing-md)]">
        {mockLikes.length > 0 ? (
          <>
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-[var(--spacing-md)]">
              {t('market.totalItems', { count: String(mockLikes.length) })}
            </p>
            <div className="product-grid">
              {mockLikes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state py-20">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <p className="text-[var(--text-body)]">{t('market.noLikes')}</p>
            <p className="text-[var(--text-body-sm)] text-[var(--foreground-muted)]">
              {t('market.tryLikeProduct')}
            </p>
            <Link href="/market" className="btn btn-primary mt-4">
              {t('market.browseProducts')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
