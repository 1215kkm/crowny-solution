'use client';

import { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ShoppingCartIcon,
  MoneyIcon,
  SparkleIcon,
  SwapIcon,
  LockIcon,
  LockOpenIcon,
} from '@/components/Icons';

type TransactionType = 'DEPOSIT' | 'WITHDRAW' | 'PURCHASE' | 'SALE' | 'COMMISSION' | 'TRANSFER' | 'ESCROW_LOCK' | 'ESCROW_RELEASE';

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  referenceId?: string;
  createdAt: string;
}

// 임시 지갑 데이터
const mockWallet = {
  balance: 12500,
  pendingBalance: 2000,
  lockedBalance: 0,
  walletAddress: 'CRW-KR-A1B2C3D4-E5F6',
};

// 임시 거래 내역
const mockTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'COMMISSION',
    amount: 50,
    description: '판매 수수료 (아이폰 15 Pro)',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 't2',
    type: 'SALE',
    amount: 5000,
    description: '상품 판매 (에어팟 프로 2세대)',
    referenceId: 'o123',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 't3',
    type: 'ESCROW_LOCK',
    amount: -2000,
    description: '결제 진행중 (갤럭시 버즈)',
    referenceId: 'o124',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 't4',
    type: 'PURCHASE',
    amount: -3500,
    description: '상품 구매 (맥북 충전기)',
    referenceId: 'o125',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 't5',
    type: 'DEPOSIT',
    amount: 10000,
    description: '지갑 충전',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: 't6',
    type: 'COMMISSION',
    amount: 75,
    description: '판매 수수료 (나이키 신발)',
    createdAt: new Date(Date.now() - 864000000).toISOString(),
  },
  {
    id: 't7',
    type: 'WITHDRAW',
    amount: -5000,
    description: '출금 완료',
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
  },
];

const transactionTypeLabels: Record<TransactionType, { label: string; icon: ReactNode; color: string }> = {
  DEPOSIT: { label: '충전', icon: <ArrowDownIcon className="w-5 h-5" />, color: 'text-[var(--success)]' },
  WITHDRAW: { label: '출금', icon: <ArrowUpIcon className="w-5 h-5" />, color: 'text-[var(--error)]' },
  PURCHASE: { label: '구매', icon: <ShoppingCartIcon className="w-5 h-5" />, color: 'text-[var(--error)]' },
  SALE: { label: '판매', icon: <MoneyIcon className="w-5 h-5" />, color: 'text-[var(--success)]' },
  COMMISSION: { label: '수수료', icon: <SparkleIcon className="w-5 h-5" />, color: 'text-[var(--accent)]' },
  TRANSFER: { label: '송금', icon: <SwapIcon className="w-5 h-5" />, color: 'text-[var(--info)]' },
  ESCROW_LOCK: { label: '에스크로', icon: <LockIcon className="w-5 h-5" />, color: 'text-[var(--warning)]' },
  ESCROW_RELEASE: { label: '에스크로 해제', icon: <LockOpenIcon className="w-5 h-5" />, color: 'text-[var(--success)]' },
};

const tabs = [
  { id: 'all', label: '전체' },
  { id: 'income', label: '수입' },
  { id: 'expense', label: '지출' },
];

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.abs(price));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return '방금';
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'income') return tx.amount > 0;
    if (activeTab === 'expense') return tx.amount < 0;
    return true;
  });

  // 통계 계산
  const stats = {
    totalIncome: mockTransactions.filter((tx) => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0),
    totalExpense: mockTransactions.filter((tx) => tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
  };

  return (
    <div>
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--primary)] text-white">
        <div className="flex items-center justify-between px-[var(--spacing-md)] h-[var(--header-height)]">
          <Link href="/market/my" className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-[var(--text-body)] font-semibold">내 지갑</h1>
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
        </div>

        {/* 잔액 */}
        <div className="px-[var(--spacing-md)] pb-[var(--spacing-lg)]">
          <p className="text-[var(--text-caption)] opacity-70 mb-1">사용 가능</p>
          <p className="text-[var(--text-display)] font-bold mb-2">
            {formatPrice(mockWallet.balance)}
            <span className="text-[var(--text-body)] ml-1 opacity-80">CROWNY</span>
          </p>

          <div className="flex gap-4 text-[var(--text-caption)] opacity-70 mb-4">
            {mockWallet.pendingBalance > 0 && (
              <span>거래 중: {formatPrice(mockWallet.pendingBalance)}</span>
            )}
            {mockWallet.lockedBalance > 0 && (
              <span>잠금: {formatPrice(mockWallet.lockedBalance)}</span>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowDepositModal(true)}
              className="btn flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
              </svg>
              충전
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="btn flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
              </svg>
              출금
            </button>
            <button className="btn flex-1 bg-white/20 hover:bg-white/30 text-white border-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              송금
            </button>
          </div>
        </div>
      </header>

      {/* 지갑 주소 */}
      <div className="market-container py-[var(--spacing-md)]">
        <div className="card p-[var(--spacing-md)] mb-[var(--spacing-md)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">지갑 주소</p>
              <p className="text-[var(--text-body-sm)] font-mono">{mockWallet.walletAddress}</p>
            </div>
            <button className="btn btn-ghost btn-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            </button>
          </div>
        </div>

        {/* 월간 통계 */}
        <div className="grid grid-cols-2 gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
          <div className="card p-[var(--spacing-md)]">
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">이번달 수입</p>
            <p className="text-[var(--text-h4)] font-bold text-[var(--success)]">
              +{formatPrice(stats.totalIncome)}
            </p>
          </div>
          <div className="card p-[var(--spacing-md)]">
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-1">이번달 지출</p>
            <p className="text-[var(--text-h4)] font-bold text-[var(--error)]">
              -{formatPrice(stats.totalExpense)}
            </p>
          </div>
        </div>

        {/* 탭 */}
        <div className="tabs mb-[var(--spacing-md)]">
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

        {/* 거래 내역 */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-1">
            {filteredTransactions.map((tx) => {
              const typeInfo = transactionTypeLabels[tx.type];
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 p-[var(--spacing-md)] hover:bg-[var(--background-secondary)] rounded-[var(--border-radius)] transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full bg-[var(--background-secondary)] flex items-center justify-center ${typeInfo.color}`}>
                    {typeInfo.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[var(--text-body-sm)] font-medium">{typeInfo.label}</span>
                      <span className="text-[var(--text-caption)] text-[var(--foreground-muted)]">
                        {formatDate(tx.createdAt)}
                      </span>
                    </div>
                    <p className="text-[var(--text-caption)] text-[var(--foreground-secondary)] line-clamp-1">
                      {tx.description}
                    </p>
                  </div>
                  <div className={`text-[var(--text-body)] font-bold ${tx.amount > 0 ? 'text-[var(--success)]' : 'text-[var(--foreground)]'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatPrice(tx.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state py-12">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            <p className="text-[var(--text-body-sm)]">거래 내역이 없습니다</p>
          </div>
        )}
      </div>

      {/* 충전 모달 */}
      {showDepositModal && (
        <>
          <div className="overlay" onClick={() => setShowDepositModal(false)} />
          <div className="modal p-[var(--spacing-lg)]">
            <div className="flex items-center justify-between mb-[var(--spacing-lg)]">
              <h2 className="text-[var(--text-h4)] font-bold">충전하기</h2>
              <button onClick={() => setShowDepositModal(false)} className="p-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-[var(--spacing-md)]">
              <label className="block text-[var(--text-body-sm)] font-medium mb-2">충전 금액</label>
              <div className="grid grid-cols-3 gap-2 mb-[var(--spacing-sm)]">
                {[1000, 5000, 10000, 50000, 100000, 500000].map((amount) => (
                  <button key={amount} className="btn btn-outline btn-sm">
                    {formatPrice(amount)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="직접 입력"
                  className="input pr-20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-secondary)]">
                  CROWNY
                </span>
              </div>
            </div>

            <div className="bg-[var(--background-secondary)] rounded-[var(--border-radius)] p-[var(--spacing-md)] mb-[var(--spacing-lg)]">
              <p className="text-[var(--text-caption)] text-[var(--foreground-secondary)]">
                외부 지갑 또는 거래소에서 위 지갑 주소로 CROWNY를 전송하시면 자동으로 충전됩니다.
              </p>
            </div>

            <button className="btn btn-primary btn-lg btn-full">
              충전 주소 복사
            </button>
          </div>
        </>
      )}

      {/* 출금 모달 */}
      {showWithdrawModal && (
        <>
          <div className="overlay" onClick={() => setShowWithdrawModal(false)} />
          <div className="modal p-[var(--spacing-lg)]">
            <div className="flex items-center justify-between mb-[var(--spacing-lg)]">
              <h2 className="text-[var(--text-h4)] font-bold">출금하기</h2>
              <button onClick={() => setShowWithdrawModal(false)} className="p-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-[var(--spacing-md)]">
              <label className="block text-[var(--text-body-sm)] font-medium mb-2">출금 주소</label>
              <input
                type="text"
                placeholder="외부 지갑 주소 입력"
                className="input font-mono"
              />
            </div>

            <div className="mb-[var(--spacing-md)]">
              <label className="block text-[var(--text-body-sm)] font-medium mb-2">출금 금액</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  className="input pr-20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-secondary)]">
                  CROWNY
                </span>
              </div>
              <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mt-1">
                출금 가능: {formatPrice(mockWallet.balance)} CROWNY
              </p>
            </div>

            <div className="bg-[var(--warning-bg)] rounded-[var(--border-radius)] p-[var(--spacing-md)] mb-[var(--spacing-lg)]">
              <p className="text-[var(--text-caption)] text-[var(--warning)]">
                출금 수수료: 10 CROWNY / 처리 시간: 약 10분
              </p>
            </div>

            <button className="btn btn-primary btn-lg btn-full">
              출금 신청
            </button>
          </div>
        </>
      )}
    </div>
  );
}
