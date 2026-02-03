'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ProductStatus = 'DRAFT' | 'ACTIVE' | 'RESERVED' | 'SOLD' | 'HIDDEN';
type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPING' | 'DELIVERED' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED';

interface SaleItem {
  id: string;
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    status: ProductStatus;
  };
  order?: {
    id: string;
    status: OrderStatus;
    buyer: {
      id: string;
      name: string;
    };
    totalAmount: number;
    createdAt: string;
  };
  createdAt: string;
  viewCount: number;
  likeCount: number;
  chatCount: number;
}

// 임시 판매 데이터
const mockSales: SaleItem[] = [
  {
    id: 's1',
    product: {
      id: 'p1',
      title: '아이폰 14 Pro 128GB 실버',
      image: '',
      price: 11000,
      status: 'RESERVED',
    },
    order: {
      id: 'o1',
      status: 'PAID',
      buyer: { id: 'u1', name: '구매자A' },
      totalAmount: 11030,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    viewCount: 156,
    likeCount: 23,
    chatCount: 8,
  },
  {
    id: 's2',
    product: {
      id: 'p2',
      title: '갤럭시 워치 6 클래식 47mm',
      image: '',
      price: 3500,
      status: 'ACTIVE',
    },
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    viewCount: 89,
    likeCount: 12,
    chatCount: 4,
  },
  {
    id: 's3',
    product: {
      id: 'p3',
      title: '캠핑 텐트 4인용 원터치',
      image: '',
      price: 1200,
      status: 'SOLD',
    },
    order: {
      id: 'o2',
      status: 'CONFIRMED',
      buyer: { id: 'u2', name: '캠퍼맨' },
      totalAmount: 1230,
      createdAt: new Date(Date.now() - 604800000).toISOString(),
    },
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
    viewCount: 234,
    likeCount: 31,
    chatCount: 12,
  },
  {
    id: 's4',
    product: {
      id: 'p4',
      title: '이케아 말름 서랍장 6칸',
      image: '',
      price: 500,
      status: 'HIDDEN',
    },
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    viewCount: 45,
    likeCount: 3,
    chatCount: 1,
  },
];

const productStatusLabels: Record<ProductStatus, { label: string; color: string }> = {
  DRAFT: { label: '임시저장', color: 'bg-[var(--foreground-muted)] text-white' },
  ACTIVE: { label: '판매중', color: 'badge-success' },
  RESERVED: { label: '예약중', color: 'badge-warning' },
  SOLD: { label: '판매완료', color: 'badge-info' },
  HIDDEN: { label: '숨김', color: 'bg-[var(--foreground-muted)] text-white' },
};

const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: '결제 대기',
  PAID: '결제 완료',
  SHIPPING: '배송중',
  DELIVERED: '배송 완료',
  CONFIRMED: '거래 완료',
  CANCELLED: '취소됨',
  REFUNDED: '환불됨',
};

const tabs = [
  { id: 'all', label: '전체' },
  { id: 'active', label: '판매중' },
  { id: 'reserved', label: '거래중' },
  { id: 'sold', label: '판매완료' },
];

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (days < 1) return '오늘';
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const filteredSales = mockSales.filter((sale) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return sale.product.status === 'ACTIVE';
    if (activeTab === 'reserved') return sale.product.status === 'RESERVED';
    if (activeTab === 'sold') return sale.product.status === 'SOLD';
    return true;
  });

  // 통계
  const stats = {
    total: mockSales.length,
    active: mockSales.filter((s) => s.product.status === 'ACTIVE').length,
    reserved: mockSales.filter((s) => s.product.status === 'RESERVED').length,
    sold: mockSales.filter((s) => s.product.status === 'SOLD').length,
  };

  return (
    <div>
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between px-[var(--spacing-md)] h-[var(--header-height)]">
          <div className="flex items-center">
            <Link href="/market/my" className="p-2 -ml-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>
            <h1 className="text-[var(--text-body)] font-semibold ml-2">판매 내역</h1>
          </div>
          <Link href="/market/sell" className="btn btn-primary btn-sm">
            + 판매하기
          </Link>
        </div>

        {/* 탭 */}
        <div className="tabs px-[var(--spacing-md)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
              <span className="ml-1 text-[var(--foreground-muted)]">
                {tab.id === 'all' ? stats.total :
                 tab.id === 'active' ? stats.active :
                 tab.id === 'reserved' ? stats.reserved :
                 stats.sold}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* 판매 목록 */}
      <div className="market-container py-[var(--spacing-md)]">
        {filteredSales.length > 0 ? (
          <div className="space-y-[var(--spacing-md)]">
            {filteredSales.map((sale) => (
              <div key={sale.id} className="card">
                {/* 상품 정보 */}
                <Link href={`/market/product/${sale.product.id}`} className="block">
                  <div className="flex gap-3 p-[var(--spacing-md)]">
                    <div className="w-20 h-20 rounded-[var(--border-radius)] bg-[var(--background-secondary)] flex-shrink-0 overflow-hidden relative">
                      {sale.product.image ? (
                        <Image
                          src={sale.product.image}
                          alt={sale.product.title}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                      {/* 상태 오버레이 */}
                      {sale.product.status === 'SOLD' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white text-[var(--text-caption)] font-medium">판매완료</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`badge text-[var(--text-tiny)] ${productStatusLabels[sale.product.status].color}`}>
                          {productStatusLabels[sale.product.status].label}
                        </span>
                      </div>
                      <p className="text-[var(--text-body-sm)] line-clamp-1 mb-1">{sale.product.title}</p>
                      <p className="text-[var(--text-body)] font-bold mb-1">
                        {formatPrice(sale.product.price)} CROWNY
                      </p>
                      <div className="flex items-center gap-3 text-[var(--text-caption)] text-[var(--foreground-muted)]">
                        <span>조회 {sale.viewCount}</span>
                        <span>찜 {sale.likeCount}</span>
                        <span>채팅 {sale.chatCount}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* 거래 정보 (예약중일 때) */}
                {sale.order && sale.product.status === 'RESERVED' && (
                  <div className="mx-[var(--spacing-md)] mb-[var(--spacing-md)] p-[var(--spacing-sm)] bg-[var(--background-secondary)] rounded-[var(--border-radius)]">
                    <div className="flex items-center justify-between text-[var(--text-caption)]">
                      <span className="text-[var(--foreground-secondary)]">
                        구매자: {sale.order.buyer.name}
                      </span>
                      <span className="font-medium text-[var(--info)]">
                        {orderStatusLabels[sale.order.status]}
                      </span>
                    </div>
                  </div>
                )}

                {/* 액션 버튼 */}
                <div className="flex gap-2 p-[var(--spacing-md)] pt-0">
                  {sale.product.status === 'ACTIVE' && (
                    <>
                      <Link href={`/market/product/${sale.product.id}/edit`} className="btn btn-outline btn-sm flex-1">
                        수정
                      </Link>
                      <button className="btn btn-outline btn-sm flex-1">
                        끌어올리기
                      </button>
                      <button className="btn btn-outline btn-sm flex-1 text-[var(--foreground-muted)]">
                        숨기기
                      </button>
                    </>
                  )}
                  {sale.product.status === 'RESERVED' && sale.order && (
                    <>
                      {sale.order.status === 'PAID' && (
                        <button className="btn btn-primary btn-sm flex-1">
                          발송하기
                        </button>
                      )}
                      <Link href={`/market/chat/${sale.order.id}`} className="btn btn-outline btn-sm flex-1">
                        채팅하기
                      </Link>
                    </>
                  )}
                  {sale.product.status === 'SOLD' && (
                    <Link href={`/market/my/sales/${sale.id}`} className="btn btn-outline btn-sm flex-1">
                      거래 상세
                    </Link>
                  )}
                  {sale.product.status === 'HIDDEN' && (
                    <button className="btn btn-outline btn-sm flex-1">
                      다시 판매하기
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state py-20">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <p className="text-[var(--text-body)]">판매 중인 상품이 없습니다</p>
            <Link href="/market/sell" className="btn btn-primary mt-4">
              상품 등록하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
