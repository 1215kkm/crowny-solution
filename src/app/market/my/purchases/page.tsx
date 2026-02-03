'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPING' | 'DELIVERED' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED';

interface Order {
  id: string;
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
  };
  seller: {
    id: string;
    name: string;
  };
  status: OrderStatus;
  shippingType: 'DIRECT' | 'DELIVERY';
  totalAmount: number;
  createdAt: string;
  completedAt?: string;
}

// 임시 주문 데이터
const mockOrders: Order[] = [
  {
    id: 'o1',
    product: {
      id: 'p1',
      title: '아이폰 15 Pro 256GB 블랙 풀박스',
      image: '',
      price: 15000,
    },
    seller: { id: 'u1', name: '크라운셀러' },
    status: 'PAID',
    shippingType: 'DELIVERY',
    totalAmount: 15030,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'o2',
    product: {
      id: 'p2',
      title: '맥북 프로 14인치 M3 Pro 512GB',
      image: '',
      price: 32000,
    },
    seller: { id: 'u2', name: '디지털매니아' },
    status: 'SHIPPING',
    shippingType: 'DELIVERY',
    totalAmount: 32030,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'o3',
    product: {
      id: 'p3',
      title: '소니 WH-1000XM5 헤드폰',
      image: '',
      price: 2500,
    },
    seller: { id: 'u3', name: '오디오킹' },
    status: 'CONFIRMED',
    shippingType: 'DIRECT',
    totalAmount: 2500,
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    completedAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: 'o4',
    product: {
      id: 'p4',
      title: '나이키 에어맥스 270 새상품',
      image: '',
      price: 800,
    },
    seller: { id: 'u4', name: '슈즈마스터' },
    status: 'CANCELLED',
    shippingType: 'DELIVERY',
    totalAmount: 830,
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
  },
];

const statusLabels: Record<OrderStatus, { label: string; color: string }> = {
  PENDING: { label: '결제 대기', color: 'badge-warning' },
  PAID: { label: '결제 완료', color: 'badge-info' },
  SHIPPING: { label: '배송중', color: 'badge-info' },
  DELIVERED: { label: '배송 완료', color: 'badge-success' },
  CONFIRMED: { label: '구매 확정', color: 'badge-success' },
  CANCELLED: { label: '취소', color: 'badge-error' },
  REFUNDED: { label: '환불 완료', color: 'badge-error' },
};

const tabs = [
  { id: 'all', label: '전체' },
  { id: 'ongoing', label: '진행중' },
  { id: 'completed', label: '완료' },
  { id: 'cancelled', label: '취소/환불' },
];

export default function PurchasesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ongoing') return ['PENDING', 'PAID', 'SHIPPING', 'DELIVERED'].includes(order.status);
    if (activeTab === 'completed') return order.status === 'CONFIRMED';
    if (activeTab === 'cancelled') return ['CANCELLED', 'REFUNDED'].includes(order.status);
    return true;
  });

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
          <h1 className="text-[var(--text-body)] font-semibold ml-2">구매 내역</h1>
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
            </button>
          ))}
        </div>
      </header>

      {/* 주문 목록 */}
      <div className="market-container py-[var(--spacing-md)]">
        {filteredOrders.length > 0 ? (
          <div className="space-y-[var(--spacing-md)]">
            {filteredOrders.map((order) => (
              <div key={order.id} className="card">
                {/* 주문 헤더 */}
                <div className="flex items-center justify-between p-[var(--spacing-md)] border-b border-[var(--border-color)]">
                  <div>
                    <p className="text-[var(--text-caption)] text-[var(--foreground-muted)]">
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="text-[var(--text-caption)] text-[var(--foreground-secondary)]">
                      주문번호: {order.id}
                    </p>
                  </div>
                  <span className={`badge ${statusLabels[order.status].color}`}>
                    {statusLabels[order.status].label}
                  </span>
                </div>

                {/* 상품 정보 */}
                <Link href={`/market/my/purchases/${order.id}`} className="block">
                  <div className="flex gap-3 p-[var(--spacing-md)]">
                    <div className="w-20 h-20 rounded-[var(--border-radius)] bg-[var(--background-secondary)] flex-shrink-0 overflow-hidden">
                      {order.product.image ? (
                        <Image
                          src={order.product.image}
                          alt={order.product.title}
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
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--text-body-sm)] line-clamp-2 mb-1">{order.product.title}</p>
                      <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">
                        판매자: {order.seller.name}
                      </p>
                      <p className="text-[var(--text-body)] font-bold">
                        {formatPrice(order.totalAmount)} CROWNY
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-[var(--foreground-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>

                {/* 액션 버튼 */}
                <div className="flex gap-2 p-[var(--spacing-md)] pt-0">
                  {order.status === 'DELIVERED' && (
                    <button className="btn btn-primary btn-sm flex-1">
                      구매 확정
                    </button>
                  )}
                  {order.status === 'CONFIRMED' && (
                    <button className="btn btn-outline btn-sm flex-1">
                      리뷰 작성
                    </button>
                  )}
                  {['PAID', 'SHIPPING', 'DELIVERED'].includes(order.status) && (
                    <Link href={`/market/chat/${order.id}`} className="btn btn-outline btn-sm flex-1">
                      채팅하기
                    </Link>
                  )}
                  {order.status === 'PENDING' && (
                    <>
                      <button className="btn btn-primary btn-sm flex-1">
                        결제하기
                      </button>
                      <button className="btn btn-outline btn-sm flex-1 text-[var(--error)]">
                        주문 취소
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state py-20">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="text-[var(--text-body)]">구매 내역이 없습니다</p>
            <Link href="/market" className="btn btn-primary mt-4">
              쇼핑하러 가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
