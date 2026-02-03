'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 임시 상품 데이터
const mockProduct = {
  id: '1',
  title: '아이폰 15 Pro 256GB 블랙 풀박스',
  description: `2개월 사용한 아이폰입니다.
액정 기스 없고 케이스 항상 사용했습니다.
풀박스이고 충전기, 케이블 모두 포함입니다.

직거래 강남역 선호합니다.
택배거래도 가능해요.`,
  price: 15000,
  images: [],
  category: '디지털/가전',
  condition: 'LIKE_NEW' as const,
  location: '서울 강남구',
  createdAt: new Date(Date.now() - 3600000).toISOString(),
  viewCount: 42,
  likeCount: 12,
  chatCount: 3,
  status: 'ACTIVE' as const,
  shippingType: 'BOTH' as const,
  negotiable: true,
  seller: {
    id: 'user1',
    name: '크라운셀러',
    grade: 'GOLD' as const,
    rating: 4.8,
    reviewCount: 24,
    profileImage: '',
  },
};

const conditionLabels = {
  NEW: '새상품',
  LIKE_NEW: '거의 새것',
  GOOD: '양호',
  FAIR: '사용감 있음',
};

const gradeColors = {
  SUPER_ADMIN: 'bg-[var(--grade-super-admin)]',
  CROWN: 'bg-[var(--grade-crown)] text-[var(--foreground)]',
  DIAMOND: 'bg-[var(--grade-diamond)]',
  GOLD: 'bg-[var(--grade-gold)] text-[var(--foreground)]',
  SILVER: 'bg-[var(--grade-silver)]',
  BRONZE: 'bg-[var(--grade-bronze)]',
};

export default function ProductDetailPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);

    if (hours < 24) return `${hours}시간 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between px-[var(--spacing-md)] h-[var(--header-height)]">
          <Link href="/market" className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 이미지 슬라이더 */}
      <div className="relative aspect-square bg-[var(--background-secondary)]">
        {mockProduct.images.length > 0 ? (
          <>
            <Image
              src={mockProduct.images[currentImageIndex]}
              alt={mockProduct.title}
              fill
              className="object-cover"
            />
            {mockProduct.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                {mockProduct.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? 'bg-white'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-24 h-24 text-[var(--foreground-muted)]"
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

      {/* 판매자 정보 */}
      <Link href={`/market/user/${mockProduct.seller.id}`} className="block">
        <div className="flex items-center gap-3 p-[var(--spacing-md)] border-b border-[var(--border-color)]">
          <div className="w-12 h-12 rounded-full bg-[var(--background-secondary)] flex items-center justify-center">
            {mockProduct.seller.profileImage ? (
              <Image
                src={mockProduct.seller.profileImage}
                alt={mockProduct.seller.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <svg className="w-6 h-6 text-[var(--foreground-muted)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{mockProduct.seller.name}</span>
              <span className={`badge text-white ${gradeColors[mockProduct.seller.grade]}`}>
                {mockProduct.seller.grade}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[var(--text-caption)] text-[var(--foreground-secondary)]">
              <svg className="w-3 h-3 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{mockProduct.seller.rating}</span>
              <span>·</span>
              <span>리뷰 {mockProduct.seller.reviewCount}</span>
            </div>
          </div>
          <svg className="w-5 h-5 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </Link>

      {/* 상품 정보 */}
      <div className="p-[var(--spacing-md)]">
        <h1 className="text-[var(--text-h3)] font-bold mb-2">{mockProduct.title}</h1>

        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-info">{mockProduct.category}</span>
          <span className="text-[var(--text-caption)] text-[var(--foreground-muted)]">
            {formatTime(mockProduct.createdAt)}
          </span>
        </div>

        <p className="price text-[var(--text-h2)]">
          {formatPrice(mockProduct.price)}
          <span className="price-currency text-[var(--text-body)]">CROWNY</span>
        </p>
        {mockProduct.negotiable && (
          <p className="text-[var(--text-caption)] text-[var(--foreground-secondary)] mt-1">
            가격 제안 가능
          </p>
        )}

        <div className="divider" />

        {/* 상품 상태 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">상품 상태</p>
            <p className="text-[var(--text-body-sm)] font-medium">{conditionLabels[mockProduct.condition]}</p>
          </div>
          <div>
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">거래 방법</p>
            <p className="text-[var(--text-body-sm)] font-medium">
              {mockProduct.shippingType === 'DIRECT' ? '직거래' : mockProduct.shippingType === 'DELIVERY' ? '배송' : '직거래, 배송'}
            </p>
          </div>
          <div>
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">거래 희망 지역</p>
            <p className="text-[var(--text-body-sm)] font-medium">{mockProduct.location}</p>
          </div>
        </div>

        {/* 상품 설명 */}
        <div>
          <h2 className="text-[var(--text-body)] font-semibold mb-2">상품 설명</h2>
          <p className="text-[var(--text-body-sm)] text-[var(--foreground-secondary)] whitespace-pre-line">
            {mockProduct.description}
          </p>
        </div>

        <div className="divider" />

        {/* 통계 */}
        <div className="flex items-center gap-4 text-[var(--text-caption)] text-[var(--foreground-muted)]">
          <span>조회 {mockProduct.viewCount}</span>
          <span>·</span>
          <span>찜 {mockProduct.likeCount}</span>
          <span>·</span>
          <span>채팅 {mockProduct.chatCount}</span>
        </div>
      </div>

      {/* 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border-color)] p-[var(--spacing-md)] flex items-center gap-3 z-40">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="p-3 border border-[var(--border-color)] rounded-[var(--border-radius)]"
        >
          <svg
            className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-[var(--foreground-muted)]'}`}
            fill={isLiked ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <div className="flex-1 flex gap-2">
          <button className="btn btn-outline flex-1">
            채팅하기
          </button>
          <button className="btn btn-primary flex-1">
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
