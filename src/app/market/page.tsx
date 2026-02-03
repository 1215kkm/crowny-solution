'use client';

import { useState } from 'react';
import ProductCard, { Product } from '@/components/market/ProductCard';
import Link from 'next/link';

// 카테고리 목록
const categories = [
  { id: 'all', name: '전체', icon: '🏠' },
  { id: 'digital', name: '디지털', icon: '📱' },
  { id: 'fashion', name: '패션', icon: '👗' },
  { id: 'furniture', name: '가구', icon: '🏠' },
  { id: 'car', name: '자동차', icon: '🚗' },
  { id: 'book', name: '도서', icon: '📚' },
  { id: 'game', name: '게임', icon: '🎮' },
  { id: 'baby', name: '유아동', icon: '👶' },
  { id: 'sports', name: '스포츠', icon: '🏃' },
  { id: 'pet', name: '반려동물', icon: '🐕' },
];

// 임시 상품 데이터
const mockProducts: Product[] = [
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
    title: '나이키 에어맥스 270 새상품',
    price: 800,
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    location: '서울 송파구',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    likeCount: 15,
    chatCount: 4,
    status: 'ACTIVE',
  },
];

export default function MarketHomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div>
      {/* 모바일 헤더 */}
      <header className="md:hidden sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="px-[var(--spacing-md)] py-[var(--spacing-sm)]">
          {/* 로고 & 아이콘 */}
          <div className="flex items-center justify-between mb-[var(--spacing-sm)]">
            <h1 className="text-[var(--text-h3)] font-bold">CROWNY</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
            </div>
          </div>

          {/* 검색바 */}
          <Link href="/market/search" className="block">
            <div className="flex items-center gap-2 px-[var(--spacing-md)] py-[var(--spacing-sm)] bg-[var(--background-secondary)] rounded-[var(--border-radius)]">
              <svg className="w-5 h-5 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="text-[var(--text-body-sm)] text-[var(--foreground-muted)]">
                상품명, 지역명으로 검색
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* 카테고리 */}
      <div className="sticky top-[104px] md:top-[var(--header-height)] z-20 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="market-container">
          <div className="tabs py-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`tab ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 지갑 잔액 배너 */}
      <div className="market-container py-[var(--spacing-md)]">
        <Link href="/market/my/wallet" className="block">
          <div className="card p-[var(--spacing-md)] flex items-center justify-between bg-[var(--primary)] text-white">
            <div>
              <p className="text-[var(--text-caption)] opacity-80">내 지갑</p>
              <p className="text-[var(--text-h3)] font-bold">12,500 CROWNY</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-sm bg-white/20 hover:bg-white/30 text-white border-0">
                충전
              </button>
              <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* 상품 그리드 */}
      <div className="market-container pb-[var(--spacing-md)]">
        <div className="flex items-center justify-between mb-[var(--spacing-md)]">
          <h2 className="text-[var(--text-h4)] font-semibold">최신 상품</h2>
          <button className="text-[var(--text-body-sm)] text-[var(--foreground-secondary)] flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            필터
          </button>
        </div>

        <div className="product-grid">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-[var(--spacing-lg)] text-center">
          <button className="btn btn-outline">
            더 많은 상품 보기
          </button>
        </div>
      </div>

      {/* FAB - 판매하기 (모바일에서는 하단 네비로 대체되므로 숨김) */}
      <Link href="/market/sell" className="fab hidden md:flex">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Link>
    </div>
  );
}
