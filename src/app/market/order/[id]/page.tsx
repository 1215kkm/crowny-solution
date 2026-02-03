'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 임시 주문 데이터
const mockOrder = {
  id: 'order1',
  product: {
    id: 'p1',
    title: '아이폰 15 Pro 256GB 블랙 풀박스',
    image: '',
    price: 15000,
    condition: 'LIKE_NEW',
  },
  seller: {
    id: 'u1',
    name: '크라운셀러',
    grade: 'GOLD' as const,
  },
  shippingType: 'BOTH' as 'DIRECT' | 'DELIVERY' | 'BOTH',
  shippingFee: 30,
};

const mockWallet = {
  balance: 12500,
  pendingBalance: 2000,
};

export default function OrderPage() {
  const [shippingMethod, setShippingMethod] = useState<'DIRECT' | 'DELIVERY'>('DIRECT');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const totalPrice = shippingMethod === 'DELIVERY'
    ? mockOrder.product.price + mockOrder.shippingFee
    : mockOrder.product.price;

  const hasEnoughBalance = mockWallet.balance >= totalPrice;

  const handlePayment = () => {
    if (!hasEnoughBalance) return;
    setShowConfirmModal(true);
  };

  const confirmPayment = async () => {
    setIsProcessing(true);
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    // 결제 완료 후 주문 상세로 이동
    window.location.href = '/market/my/purchases';
  };

  return (
    <div className="pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between px-[var(--spacing-md)] h-[var(--header-height)]">
          <Link href={`/market/product/${mockOrder.product.id}`} className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-[var(--text-body)] font-semibold">결제하기</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="market-container py-[var(--spacing-md)]">
        {/* 상품 정보 */}
        <div className="card p-[var(--spacing-md)] mb-[var(--spacing-md)]">
          <h2 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-sm)]">주문 상품</h2>
          <div className="flex gap-3">
            <div className="w-20 h-20 rounded-[var(--border-radius)] bg-[var(--background-secondary)] flex-shrink-0 overflow-hidden">
              {mockOrder.product.image ? (
                <Image
                  src={mockOrder.product.image}
                  alt={mockOrder.product.title}
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
            <div className="flex-1">
              <p className="text-[var(--text-body-sm)] line-clamp-2 mb-1">{mockOrder.product.title}</p>
              <p className="text-[var(--text-h4)] font-bold">
                {formatPrice(mockOrder.product.price)}
                <span className="text-[var(--text-caption)] text-[var(--foreground-secondary)] ml-1">CROWNY</span>
              </p>
            </div>
          </div>
        </div>

        {/* 판매자 정보 */}
        <div className="card p-[var(--spacing-md)] mb-[var(--spacing-md)]">
          <h2 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-sm)]">판매자</h2>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[var(--background-secondary)] flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--foreground-muted)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-[var(--text-body-sm)] font-medium">{mockOrder.seller.name}</p>
              <p className="text-[var(--text-caption)] text-[var(--foreground-secondary)]">{mockOrder.seller.grade} 등급</p>
            </div>
          </div>
        </div>

        {/* 거래 방법 */}
        <div className="card p-[var(--spacing-md)] mb-[var(--spacing-md)]">
          <h2 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-sm)]">거래 방법</h2>
          <div className="flex gap-2">
            {mockOrder.shippingType !== 'DELIVERY' && (
              <button
                onClick={() => setShippingMethod('DIRECT')}
                className={`flex-1 py-3 px-4 border rounded-[var(--border-radius)] text-center transition-colors ${
                  shippingMethod === 'DIRECT'
                    ? 'border-[var(--primary)] bg-[var(--background-secondary)]'
                    : 'border-[var(--border-color)]'
                }`}
              >
                <p className="text-[var(--text-body-sm)] font-medium">직거래</p>
                <p className="text-[var(--text-caption)] text-[var(--foreground-muted)]">배송비 없음</p>
              </button>
            )}
            {mockOrder.shippingType !== 'DIRECT' && (
              <button
                onClick={() => setShippingMethod('DELIVERY')}
                className={`flex-1 py-3 px-4 border rounded-[var(--border-radius)] text-center transition-colors ${
                  shippingMethod === 'DELIVERY'
                    ? 'border-[var(--primary)] bg-[var(--background-secondary)]'
                    : 'border-[var(--border-color)]'
                }`}
              >
                <p className="text-[var(--text-body-sm)] font-medium">배송</p>
                <p className="text-[var(--text-caption)] text-[var(--foreground-muted)]">
                  +{formatPrice(mockOrder.shippingFee)} CROWNY
                </p>
              </button>
            )}
          </div>

          {/* 배송지 입력 */}
          {shippingMethod === 'DELIVERY' && (
            <div className="mt-[var(--spacing-md)]">
              <label className="block text-[var(--text-caption)] text-[var(--foreground-secondary)] mb-1">
                배송지
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="배송받으실 주소를 입력하세요"
                className="input min-h-[80px] resize-none"
              />
            </div>
          )}
        </div>

        {/* 결제 정보 */}
        <div className="card p-[var(--spacing-md)] mb-[var(--spacing-md)]">
          <h2 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-sm)]">결제 정보</h2>

          <div className="space-y-2 text-[var(--text-body-sm)]">
            <div className="flex justify-between">
              <span className="text-[var(--foreground-secondary)]">상품 금액</span>
              <span>{formatPrice(mockOrder.product.price)} CROWNY</span>
            </div>
            {shippingMethod === 'DELIVERY' && (
              <div className="flex justify-between">
                <span className="text-[var(--foreground-secondary)]">배송비</span>
                <span>{formatPrice(mockOrder.shippingFee)} CROWNY</span>
              </div>
            )}
            <div className="divider" />
            <div className="flex justify-between text-[var(--text-body)] font-bold">
              <span>총 결제 금액</span>
              <span className="text-[var(--primary)]">{formatPrice(totalPrice)} CROWNY</span>
            </div>
          </div>
        </div>

        {/* 내 지갑 */}
        <div className="card p-[var(--spacing-md)] mb-[var(--spacing-md)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[var(--text-body-sm)] font-semibold mb-1">내 지갑</h2>
              <p className="text-[var(--text-h4)] font-bold">
                {formatPrice(mockWallet.balance)}
                <span className="text-[var(--text-caption)] text-[var(--foreground-secondary)] ml-1">CROWNY</span>
              </p>
            </div>
            {!hasEnoughBalance && (
              <Link href="/market/my/wallet" className="btn btn-primary btn-sm">
                충전하기
              </Link>
            )}
          </div>
          {!hasEnoughBalance && (
            <p className="text-[var(--text-caption)] text-[var(--error)] mt-2">
              잔액이 부족합니다. {formatPrice(totalPrice - mockWallet.balance)} CROWNY가 더 필요합니다.
            </p>
          )}
        </div>

        {/* 안내 사항 */}
        <div className="bg-[var(--background-secondary)] rounded-[var(--border-radius)] p-[var(--spacing-md)]">
          <h3 className="text-[var(--text-body-sm)] font-semibold mb-2 flex items-center gap-1">
            <svg className="w-4 h-4 text-[var(--info)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            안전거래 안내
          </h3>
          <ul className="text-[var(--text-caption)] text-[var(--foreground-secondary)] space-y-1">
            <li>• 결제 금액은 거래 완료 전까지 에스크로 계정에 안전하게 보관됩니다.</li>
            <li>• 구매 확정 시 판매자에게 대금이 지급됩니다.</li>
            <li>• 거래 중 문제 발생 시 고객센터로 문의해주세요.</li>
          </ul>
        </div>
      </div>

      {/* 하단 결제 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border-color)] p-[var(--spacing-md)] z-40">
        <button
          onClick={handlePayment}
          disabled={!hasEnoughBalance || (shippingMethod === 'DELIVERY' && !address)}
          className="btn btn-primary btn-lg btn-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formatPrice(totalPrice)} CROWNY 결제하기
        </button>
      </div>

      {/* 결제 확인 모달 */}
      {showConfirmModal && (
        <>
          <div className="overlay" onClick={() => !isProcessing && setShowConfirmModal(false)} />
          <div className="modal p-[var(--spacing-lg)]">
            {!isProcessing ? (
              <>
                <div className="text-center mb-[var(--spacing-lg)]">
                  <div className="w-16 h-16 rounded-full bg-[var(--background-secondary)] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <h2 className="text-[var(--text-h4)] font-bold mb-2">결제를 진행하시겠습니까?</h2>
                  <p className="text-[var(--text-body-sm)] text-[var(--foreground-secondary)]">
                    {formatPrice(totalPrice)} CROWNY가 에스크로 계정으로 이체됩니다.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="btn btn-outline flex-1"
                  >
                    취소
                  </button>
                  <button
                    onClick={confirmPayment}
                    className="btn btn-primary flex-1"
                  >
                    결제하기
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[var(--text-body)] font-medium">결제 처리 중...</p>
                <p className="text-[var(--text-caption)] text-[var(--foreground-muted)]">잠시만 기다려주세요</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
