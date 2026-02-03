'use client';

import Link from 'next/link';
import Image from 'next/image';
import ProductCard, { Product } from '@/components/market/ProductCard';

// 임시 사용자 데이터
const mockUser = {
  id: 'user1',
  name: '크라운셀러',
  profileImage: '',
  grade: 'GOLD' as const,
  rating: 4.8,
  reviewCount: 24,
  followerCount: 156,
  createdAt: '2024-01-15',
  location: '서울 강남구',
  introduction: '안녕하세요! 전자기기 전문 판매자입니다. 믿을 수 있는 거래를 약속드립니다.',
  responseRate: 98,
  responseTime: '보통 1시간 이내',
};

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
    title: '에어팟 프로 2세대 미개봉',
    price: 2800,
    images: ['https://picsum.photos/seed/airpodspro/400/400'],
    location: '서울 강남구',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likeCount: 8,
    chatCount: 2,
    status: 'ACTIVE',
  },
  {
    id: '3',
    title: '맥북 에어 M2 256GB 스페이스그레이',
    price: 12000,
    images: ['https://picsum.photos/seed/macbookair/400/400'],
    location: '서울 강남구',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likeCount: 15,
    chatCount: 5,
    status: 'RESERVED',
  },
];

const gradeInfo = {
  SUPER_ADMIN: { label: '슈퍼관리자', color: 'bg-purple-600', textColor: 'text-white' },
  CROWN: { label: '크라운', color: 'bg-amber-400', textColor: 'text-neutral-900' },
  DIAMOND: { label: '다이아몬드', color: 'bg-cyan-500', textColor: 'text-white' },
  GOLD: { label: '골드', color: 'bg-amber-500', textColor: 'text-neutral-900' },
  SILVER: { label: '실버', color: 'bg-neutral-400', textColor: 'text-white' },
  BRONZE: { label: '브론즈', color: 'bg-orange-600', textColor: 'text-white' },
};

export default function UserProfilePage() {
  const currentGrade = gradeInfo[mockUser.grade];

  return (
    <div className="pb-6">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/market" className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-base font-semibold">판매자 정보</h1>
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto">
        {/* 프로필 섹션 */}
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-[3px] bg-neutral-200 flex items-center justify-center flex-shrink-0">
              {mockUser.profileImage ? (
                <Image
                  src={mockUser.profileImage}
                  alt={mockUser.name}
                  width={80}
                  height={80}
                  className="rounded-[3px]"
                />
              ) : (
                <svg className="w-10 h-10 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-neutral-900 truncate">{mockUser.name}</h2>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-[3px] ${currentGrade.color} ${currentGrade.textColor}`}>
                  {currentGrade.label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{mockUser.rating}</span>
                </div>
                <span>·</span>
                <span>리뷰 {mockUser.reviewCount}</span>
                <span>·</span>
                <span>팔로워 {mockUser.followerCount}</span>
              </div>
              <p className="text-xs text-neutral-400">{mockUser.location} · 가입일 {mockUser.createdAt}</p>
            </div>
          </div>

          {/* 자기소개 */}
          {mockUser.introduction && (
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              {mockUser.introduction}
            </p>
          )}

          {/* 응답률 */}
          <div className="mt-4 flex gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400">응답률</span>
              <span className="font-medium text-neutral-700">{mockUser.responseRate}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400">응답시간</span>
              <span className="font-medium text-neutral-700">{mockUser.responseTime}</span>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2.5 border border-neutral-300 rounded-[3px] text-sm font-medium hover:bg-neutral-50 transition">
              팔로우
            </button>
            <button className="flex-1 py-2.5 bg-neutral-900 text-white rounded-[3px] text-sm font-medium hover:bg-neutral-800 transition">
              문의하기
            </button>
          </div>
        </div>

        {/* 판매 상품 목록 */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-neutral-900">
              판매 상품 <span className="text-neutral-400 font-normal">{mockProducts.length}</span>
            </h3>
            <button className="text-sm text-neutral-500">
              최신순
            </button>
          </div>

          {mockProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <svg className="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-sm text-neutral-500">판매 중인 상품이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
