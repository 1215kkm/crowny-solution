'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/i18n';

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  location: string;
  createdAt: string;
  likeCount: number;
  chatCount: number;
  status: 'ACTIVE' | 'RESERVED' | 'SOLD';
}

interface ProductCardProps {
  product: Product;
}

const LOCALE_MAP: Record<string, string> = {
  ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { t, locale } = useTranslation();
  const intlLocale = LOCALE_MAP[locale] || 'en-US';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(intlLocale).format(price);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t('market.time_justNow');
    if (minutes < 60) return t('market.time_minutesAgo', { count: String(minutes) });
    if (hours < 24) return t('market.time_hoursAgo', { count: String(hours) });
    if (days < 7) return t('market.time_daysAgo', { count: String(days) });
    return date.toLocaleDateString(intlLocale);
  };

  return (
    <Link
      href={`/market/product/${product.id}`}
      className="block bg-white border border-neutral-200 rounded-[3px] overflow-hidden hover:border-neutral-400 hover:shadow-md transition-all"
    >
      <div className="relative">
        <div className="aspect-square relative bg-neutral-100">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-neutral-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}
        </div>

        {product.status !== 'ACTIVE' && (
          <div className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-medium rounded-[3px] ${
            product.status === 'RESERVED'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-neutral-900 text-white'
          }`}>
            {product.status === 'RESERVED' ? t('status_reserved') : t('status_sold')}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-neutral-800 line-clamp-2 mb-1 leading-snug">
          {product.title}
        </h3>
        <p className="text-base font-bold text-neutral-900">
          {formatPrice(product.price)}
          <span className="text-xs font-medium text-neutral-500 ml-1">CROWNY</span>
        </p>
        <div className="flex items-center gap-1 mt-2 text-xs text-neutral-500">
          <span>{product.location}</span>
          <span>·</span>
          <span>{formatTime(product.createdAt)}</span>
        </div>
        {(product.likeCount > 0 || product.chatCount > 0) && (
          <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-400">
            {product.likeCount > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {product.likeCount}
              </span>
            )}
            {product.chatCount > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                {product.chatCount}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
