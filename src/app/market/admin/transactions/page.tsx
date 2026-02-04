'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n';

type TxStatus = 'ESCROW' | 'COMPLETED' | 'DISPUTE' | 'CANCELLED' | 'REFUNDED';

interface Transaction {
  id: string;
  productTitle: string;
  buyer: { name: string; grade: string };
  seller: { name: string; grade: string };
  amount: number;
  fee: number;
  status: TxStatus;
  createdAt: string;
  completedAt: string | null;
}

const mockTransactions: Transaction[] = [
  { id: 'tx1', productTitle: '아이폰 15 Pro 256GB', buyer: { name: '김구매', grade: 'GOLD' }, seller: { name: '이판매', grade: 'DIAMOND' }, amount: 15000, fee: 600, status: 'ESCROW', createdAt: '2024-02-03 14:30', completedAt: null },
  { id: 'tx2', productTitle: '맥북 프로 M3 14인치', buyer: { name: '박유저', grade: 'SILVER' }, seller: { name: '최셀러', grade: 'CROWN' }, amount: 28000, fee: 1120, status: 'COMPLETED', createdAt: '2024-02-03 10:15', completedAt: '2024-02-03 12:30' },
  { id: 'tx3', productTitle: '에어팟 맥스', buyer: { name: '정회원', grade: 'BRONZE' }, seller: { name: '강판매', grade: 'GOLD' }, amount: 5000, fee: 200, status: 'DISPUTE', createdAt: '2024-02-02 18:00', completedAt: null },
  { id: 'tx4', productTitle: '갤럭시 워치 6', buyer: { name: '한구매', grade: 'GOLD' }, seller: { name: '오셀러', grade: 'SILVER' }, amount: 3500, fee: 140, status: 'CANCELLED', createdAt: '2024-02-02 09:00', completedAt: null },
  { id: 'tx5', productTitle: '닌텐도 스위치 OLED', buyer: { name: '임유저', grade: 'BRONZE' }, seller: { name: '신판매', grade: 'DIAMOND' }, amount: 4000, fee: 160, status: 'REFUNDED', createdAt: '2024-02-01 15:45', completedAt: '2024-02-02 10:00' },
];

const LOCALE_MAP: Record<string, string> = {
  ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH',
};

const GRADE_COLORS: Record<string, string> = {
  CROWN: 'var(--grade-crown)',
  DIAMOND: 'var(--grade-diamond)',
  GOLD: 'var(--grade-gold)',
  SILVER: 'var(--grade-silver)',
  BRONZE: 'var(--grade-bronze)',
};

export default function TransactionsPage() {
  const { t, locale } = useTranslation();
  const [transactions] = useState(mockTransactions);
  const [filterStatus, setFilterStatus] = useState<TxStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'release' | 'refund' | 'cancel' | null>(null);

  const STATUS_INFO: Record<TxStatus, { name: string; color: string }> = {
    ESCROW: { name: t('admin.status_escrow'), color: 'bg-blue-100 text-blue-700' },
    COMPLETED: { name: t('admin.status_completed'), color: 'bg-green-100 text-green-700' },
    DISPUTE: { name: t('admin.status_dispute'), color: 'bg-red-100 text-red-700' },
    CANCELLED: { name: t('admin.status_cancelled'), color: 'bg-gray-100 text-gray-700' },
    REFUNDED: { name: t('admin.status_refunded'), color: 'bg-orange-100 text-orange-700' },
  };

  const formatNumber = (num: number) => new Intl.NumberFormat(LOCALE_MAP[locale] || 'ko-KR').format(num);

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.productTitle.includes(search) ||
      tx.buyer.name.includes(search) ||
      tx.seller.name.includes(search);
    const matchesStatus = filterStatus === 'ALL' || tx.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (tx: Transaction, action: 'release' | 'refund' | 'cancel') => {
    setSelectedTx(tx);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    // 실제로는 API 호출
    setShowActionModal(false);
    setSelectedTx(null);
    setActionType(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('admin.transactionMgmt')}</h1>
        <p className="text-[var(--foreground-muted)]">{t('admin.transactionMgmtDesc')}</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {(Object.keys(STATUS_INFO) as TxStatus[]).map(status => {
          const count = transactions.filter(tx => tx.status === status).length;
          return (
            <div
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`card p-4 cursor-pointer transition-all ${
                filterStatus === status ? 'ring-2 ring-[var(--primary)]' : ''
              }`}
            >
              <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_INFO[status].color}`}>
                {STATUS_INFO[status].name}
              </span>
              <p className="text-2xl font-bold mt-2">{count}</p>
            </div>
          );
        })}
      </div>

      {/* 필터 */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder={t('admin.searchTx')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
            />
          </div>
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-4 py-2 rounded-[var(--border-radius)] ${
              filterStatus === 'ALL'
                ? 'bg-[var(--primary)] text-white'
                : 'border border-[var(--border-color)]'
            }`}
          >
            {t('admin.all')}
          </button>
        </div>
      </div>

      {/* 거래 목록 */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--background-secondary)]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_txId')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_product')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_buyer')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_seller')}</th>
                <th className="px-4 py-3 text-right text-sm font-medium">{t('admin.col_amount')}</th>
                <th className="px-4 py-3 text-right text-sm font-medium">{t('admin.col_fee')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_status')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_datetime')}</th>
                <th className="px-4 py-3 text-center text-sm font-medium">{t('admin.col_action')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-t border-[var(--border-color)] hover:bg-[var(--background-secondary)]">
                  <td className="px-4 py-3 text-sm font-mono">{tx.id}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium truncate max-w-[200px]">{tx.productTitle}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: GRADE_COLORS[tx.buyer.grade] }}
                      />
                      <span className="text-sm">{tx.buyer.name}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: GRADE_COLORS[tx.seller.grade] }}
                      />
                      <span className="text-sm">{tx.seller.name}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium">{formatNumber(tx.amount)}</td>
                  <td className="px-4 py-3 text-sm text-right text-[var(--foreground-muted)]">{formatNumber(tx.fee)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${STATUS_INFO[tx.status].color}`}>
                      {STATUS_INFO[tx.status].name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">{tx.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {tx.status === 'ESCROW' && (
                        <>
                          <button
                            onClick={() => handleAction(tx, 'release')}
                            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-[var(--border-radius)] hover:bg-green-200"
                          >
                            {t('admin.release')}
                          </button>
                          <button
                            onClick={() => handleAction(tx, 'refund')}
                            className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-[var(--border-radius)] hover:bg-orange-200"
                          >
                            {t('admin.refund')}
                          </button>
                        </>
                      )}
                      {tx.status === 'DISPUTE' && (
                        <>
                          <button
                            onClick={() => handleAction(tx, 'release')}
                            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-[var(--border-radius)] hover:bg-green-200"
                          >
                            {t('admin.sellerWins')}
                          </button>
                          <button
                            onClick={() => handleAction(tx, 'refund')}
                            className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-[var(--border-radius)] hover:bg-orange-200"
                          >
                            {t('admin.buyerWins')}
                          </button>
                        </>
                      )}
                      {(tx.status === 'COMPLETED' || tx.status === 'CANCELLED' || tx.status === 'REFUNDED') && (
                        <span className="text-xs text-[var(--foreground-muted)]">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center text-[var(--foreground-muted)]">
            {t('admin.noResults')}
          </div>
        )}
      </div>

      {/* 작업 확인 모달 */}
      {showActionModal && selectedTx && actionType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {actionType === 'release' && t('admin.escrowRelease')}
              {actionType === 'refund' && t('admin.refundProcess')}
              {actionType === 'cancel' && t('admin.cancelTransaction')}
            </h3>
            <div className="bg-[var(--background-secondary)] p-4 rounded-[var(--border-radius)] mb-4">
              <p className="text-sm font-medium">{selectedTx.productTitle}</p>
              <p className="text-sm text-[var(--foreground-muted)]">
                {selectedTx.buyer.name} → {selectedTx.seller.name}
              </p>
              <p className="text-lg font-bold mt-2">{formatNumber(selectedTx.amount)} CROWNY</p>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              {actionType === 'release' && t('admin.releaseDesc')}
              {actionType === 'refund' && t('admin.refundDesc')}
              {actionType === 'cancel' && t('admin.cancelDesc')}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('admin.processReason')}</label>
              <textarea
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)] text-sm"
                rows={3}
                placeholder={t('admin.enterProcessReason')}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                {t('cancel')}
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 py-2 text-white rounded-[var(--border-radius)] ${
                  actionType === 'release' ? 'bg-green-600' :
                  actionType === 'refund' ? 'bg-orange-600' : 'bg-gray-600'
                }`}
              >
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
