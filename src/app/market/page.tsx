'use client';

import { useState, ReactNode } from 'react';
import ProductCard, { Product } from '@/components/market/ProductCard';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  HomeIcon,
  PhoneIcon,
  StyleIcon,
  ChairIcon,
  CarIcon,
  BookIcon,
  GamepadIcon,
  ChildIcon,
  SportsIcon,
  PetsIcon,
} from '@/components/Icons';

// 카테고리 목록 (labelKey로 번역 키 참조)
const categories: { id: string; labelKey: string; icon: ReactNode }[] = [
  { id: 'all', labelKey: 'market.cat_all', icon: <HomeIcon className="w-4 h-4" /> },
  { id: 'digital', labelKey: 'market.cat_digital', icon: <PhoneIcon className="w-4 h-4" /> },
  { id: 'fashion', labelKey: 'market.cat_fashion', icon: <StyleIcon className="w-4 h-4" /> },
  { id: 'furniture', labelKey: 'market.cat_furniture', icon: <ChairIcon className="w-4 h-4" /> },
  { id: 'car', labelKey: 'market.cat_car', icon: <CarIcon className="w-4 h-4" /> },
  { id: 'book', labelKey: 'market.cat_book', icon: <BookIcon className="w-4 h-4" /> },
  { id: 'game', labelKey: 'market.cat_game', icon: <GamepadIcon className="w-4 h-4" /> },
  { id: 'baby', labelKey: 'market.cat_baby', icon: <ChildIcon className="w-4 h-4" /> },
  { id: 'sports', labelKey: 'market.cat_sports', icon: <SportsIcon className="w-4 h-4" /> },
  { id: 'pet', labelKey: 'market.cat_pet', icon: <PetsIcon className="w-4 h-4" /> },
];

// 임시 상품 데이터
const mockProducts: Product[] = [
  {
    id: '1',
    title: '아이폰 15 Pro 256GB 블랙 풀박스',
    price: 15000,
    images: ['https://picsum.photos/seed/iphone15/400/400'],
    location: '서울 강남구',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likeCount: 12,
    chatCount: 3,
    status: 'ACTIVE',
  },
  {
    id: '2',
    title: '나이키 에어맥스 270 새상품',
    price: 800,
    images: ['https://picsum.photos/seed/nike270/400/400'],
    location: '서울 서초구',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    likeCount: 5,
    chatCount: 1,
    status: 'ACTIVE',
  },
  {
    id: '3',
    title: '이케아 책상 + 의자 세트',
    price: 500,
    images: ['https://picsum.photos/seed/ikeadesk/400/400'],
    location: '경기 성남시',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likeCount: 8,
    chatCount: 2,
    status: 'RESERVED',
  },
  {
    id: '4',
    title: '맥북 프로 14인치 M3 Pro',
    price: 32000,
    images: ['https://picsum.photos/seed/macbookpro/400/400'],
    location: '서울 마포구',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likeCount: 24,
    chatCount: 7,
    status: 'ACTIVE',
  },
  {
    id: '5',
    title: '캠핑 텐트 4인용 원터치',
    price: 1200,
    images: ['https://picsum.photos/seed/campingtent/400/400'],
    location: '경기 용인시',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    likeCount: 3,
    chatCount: 0,
    status: 'SOLD',
  },
  {
    id: '6',
    title: '소니 WH-1000XM5 헤드폰',
    price: 2500,
    images: ['https://picsum.photos/seed/sonyxm5/400/400'],
    location: '서울 송파구',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    likeCount: 15,
    chatCount: 4,
    status: 'ACTIVE',
  },
];

export default function MarketHomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useTranslation();

  return (
    <div>
      {/* 모바일 헤더 */}
      <header className="md:hidden sticky top-0 z-30 bg-neutral-950 border-b border-neutral-800">
        <div className="px-4 py-3">
          {/* 로고 & 아이콘 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col items-start leading-none">
              <span className="text-base font-black text-white tracking-tight">CROWNY</span>
              <span className="text-[8px] font-medium text-amber-400 tracking-[0.2em]">MARKET</span>
            </div>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <button className="p-2 text-neutral-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
            </div>
          </div>

          {/* 검색바 */}
          <Link href="/market/search" className="block">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-[3px]">
              <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="text-sm text-neutral-500">
                {t('market.searchPlaceholder')}
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* 카테고리 */}
      <div className="sticky top-[104px] md:top-14 z-20 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-[3px] transition ${
                  selectedCategory === category.id
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {category.icon}
                {t(category.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 지갑 잔액 배너 - Aurora 스타일 */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <Link href="/market/my/wallet" className="block">
          <div className="relative overflow-hidden bg-neutral-950 rounded-[3px] p-5">
            {/* Aurora 효과 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="aurora-blob-1 absolute -top-[20%] -left-[10%] w-[50%] h-[100%] rounded-full blur-[60px] bg-amber-500 opacity-20" />
              <div className="aurora-blob-2 absolute -bottom-[20%] -right-[10%] w-[40%] h-[80%] rounded-full blur-[60px] bg-cyan-500 opacity-15" />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 mb-1">{t('market.wallet')}</p>
                <p className="text-2xl font-bold text-white">12,500 <span className="text-sm text-amber-400">CROWNY</span></p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-[3px] transition">
                  {t('market.deposit')}
                </button>
                <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* 상품 그리드 */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-900">{t('market.nearbyProducts')}</h2>
          <button className="text-sm text-neutral-500 flex items-center gap-1 hover:text-neutral-700 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            {t('filter')}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-[3px] hover:bg-neutral-100 transition">
            {t('more')}
          </button>
        </div>
      </div>

      {/* FAB - 판매하기 (PC에서만 표시) */}
      <Link
        href="/market/sell"
        className="hidden md:flex fixed bottom-8 right-8 w-14 h-14 bg-neutral-900 text-white items-center justify-center rounded-[3px] shadow-lg hover:bg-neutral-800 transition z-40"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Link>
    </div>
  );
}
