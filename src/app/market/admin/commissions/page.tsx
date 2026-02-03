'use client';

import { useState } from 'react';

type WithdrawStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

interface Commission {
  id: string;
  transactionId: string;
  recipient: { name: string; grade: string };
  amount: number;
  rate: number;
  createdAt: string;
}

interface WithdrawRequest {
  id: string;
  user: { name: string; grade: string };
  amount: number;
  bankInfo: string;
  status: WithdrawStatus;
  requestedAt: string;
  processedAt: string | null;
}

const mockCommissions: Commission[] = [
  { id: 'c1', transactionId: 'tx1', recipient: { name: '김크라운', grade: 'CROWN' }, amount: 75, rate: 0.5, createdAt: '2024-02-03 14:30' },
  { id: 'c2', transactionId: 'tx1', recipient: { name: '이다이아', grade: 'DIAMOND' }, amount: 225, rate: 1.5, createdAt: '2024-02-03 14:30' },
  { id: 'c3', transactionId: 'tx1', recipient: { name: '박골드', grade: 'GOLD' }, amount: 150, rate: 1.0, createdAt: '2024-02-03 14:30' },
  { id: 'c4', transactionId: 'tx2', recipient: { name: '김크라운', grade: 'CROWN' }, amount: 140, rate: 0.5, createdAt: '2024-02-03 12:30' },
  { id: 'c5', transactionId: 'tx2', recipient: { name: '최실버', grade: 'SILVER' }, amount: 210, rate: 0.75, createdAt: '2024-02-03 12:30' },
];

const mockWithdrawals: WithdrawRequest[] = [
  { id: 'w1', user: { name: '김크라운', grade: 'CROWN' }, amount: 50000, bankInfo: '국민 123-456-789012', status: 'PENDING', requestedAt: '2024-02-03 10:00', processedAt: null },
  { id: 'w2', user: { name: '이다이아', grade: 'DIAMOND' }, amount: 30000, bankInfo: '신한 987-654-321098', status: 'PENDING', requestedAt: '2024-02-02 15:30', processedAt: null },
  { id: 'w3', user: { name: '박골드', grade: 'GOLD' }, amount: 15000, bankInfo: '우리 111-222-333444', status: 'APPROVED', requestedAt: '2024-02-01 09:00', processedAt: '2024-02-02 11:00' },
  { id: 'w4', user: { name: '한유저', grade: 'SILVER' }, amount: 5000, bankInfo: '하나 555-666-777888', status: 'REJECTED', requestedAt: '2024-01-30 14:00', processedAt: '2024-01-31 10:00' },
];

const STATUS_INFO: Record<WithdrawStatus, { name: string; color: string }> = {
  PENDING: { name: '대기', color: 'bg-yellow-100 text-yellow-700' },
  APPROVED: { name: '승인', color: 'bg-blue-100 text-blue-700' },
  REJECTED: { name: '거절', color: 'bg-red-100 text-red-700' },
  COMPLETED: { name: '완료', color: 'bg-green-100 text-green-700' },
};

const GRADE_COLORS: Record<string, string> = {
  CROWN: 'var(--grade-crown)',
  DIAMOND: 'var(--grade-diamond)',
  GOLD: 'var(--grade-gold)',
  SILVER: 'var(--grade-silver)',
  BRONZE: 'var(--grade-bronze)',
};

export default function CommissionsPage() {
  const [activeTab, setActiveTab] = useState<'commissions' | 'withdrawals'>('withdrawals');
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [selectedWithdraw, setSelectedWithdraw] = useState<WithdrawRequest | null>(null);
  const [showProcessModal, setShowProcessModal] = useState(false);

  const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(num);

  const totalCommissions = mockCommissions.reduce((sum, c) => sum + c.amount, 0);
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'PENDING');
  const totalPendingAmount = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0);

  const handleProcess = (withdraw: WithdrawRequest, status: 'APPROVED' | 'REJECTED') => {
    setWithdrawals(withdrawals.map(w =>
      w.id === withdraw.id
        ? { ...w, status, processedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) }
        : w
    ));
    setShowProcessModal(false);
    setSelectedWithdraw(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">수수료/정산 관리</h1>
        <p className="text-[var(--foreground-muted)]">수수료 내역과 출금 요청을 관리합니다</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-[var(--foreground-muted)]">오늘 수수료 수익</p>
          <p className="text-2xl font-bold">{formatNumber(totalCommissions)}</p>
          <p className="text-xs text-[var(--foreground-muted)]">CROWNY</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-[var(--foreground-muted)]">대기중 출금</p>
          <p className="text-2xl font-bold text-orange-600">{pendingWithdrawals.length}</p>
          <p className="text-xs text-[var(--foreground-muted)]">건</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-[var(--foreground-muted)]">대기중 금액</p>
          <p className="text-2xl font-bold">{formatNumber(totalPendingAmount)}</p>
          <p className="text-xs text-[var(--foreground-muted)]">CROWNY</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-[var(--foreground-muted)]">이번 달 정산</p>
          <p className="text-2xl font-bold">{formatNumber(2340000)}</p>
          <p className="text-xs text-[var(--foreground-muted)]">CROWNY</p>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`px-4 py-2 rounded-[var(--border-radius)] font-medium ${
            activeTab === 'withdrawals'
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--background-secondary)]'
          }`}
        >
          출금 요청 ({pendingWithdrawals.length})
        </button>
        <button
          onClick={() => setActiveTab('commissions')}
          className={`px-4 py-2 rounded-[var(--border-radius)] font-medium ${
            activeTab === 'commissions'
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--background-secondary)]'
          }`}
        >
          수수료 내역
        </button>
      </div>

      {/* 출금 요청 목록 */}
      {activeTab === 'withdrawals' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--background-secondary)]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">요청자</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">금액</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">계좌정보</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">상태</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">요청일시</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">처리</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdraw) => (
                  <tr key={withdraw.id} className="border-t border-[var(--border-color)] hover:bg-[var(--background-secondary)]">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: GRADE_COLORS[withdraw.user.grade] }}
                        />
                        <span className="font-medium">{withdraw.user.name}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold">{formatNumber(withdraw.amount)}</td>
                    <td className="px-4 py-3 text-sm">{withdraw.bankInfo}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${STATUS_INFO[withdraw.status].color}`}>
                        {STATUS_INFO[withdraw.status].name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">{withdraw.requestedAt}</td>
                    <td className="px-4 py-3">
                      {withdraw.status === 'PENDING' ? (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => { setSelectedWithdraw(withdraw); setShowProcessModal(true); }}
                            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-[var(--border-radius)] hover:bg-green-200"
                          >
                            승인
                          </button>
                          <button
                            onClick={() => handleProcess(withdraw, 'REJECTED')}
                            className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-[var(--border-radius)] hover:bg-red-200"
                          >
                            거절
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-[var(--foreground-muted)]">
                          {withdraw.processedAt}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 수수료 내역 */}
      {activeTab === 'commissions' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--background-secondary)]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">거래 ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">수령자</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">수수료율</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">금액</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">일시</th>
                </tr>
              </thead>
              <tbody>
                {mockCommissions.map((commission) => (
                  <tr key={commission.id} className="border-t border-[var(--border-color)] hover:bg-[var(--background-secondary)]">
                    <td className="px-4 py-3 text-sm font-mono">{commission.transactionId}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: GRADE_COLORS[commission.recipient.grade] }}
                        />
                        <span>{commission.recipient.name}</span>
                        <span className="text-xs text-[var(--foreground-muted)]">
                          ({commission.recipient.grade})
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">{commission.rate}%</td>
                    <td className="px-4 py-3 text-right font-medium">{formatNumber(commission.amount)}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">{commission.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 승인 확인 모달 */}
      {showProcessModal && selectedWithdraw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">출금 승인</h3>
            <div className="bg-[var(--background-secondary)] p-4 rounded-[var(--border-radius)] mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: GRADE_COLORS[selectedWithdraw.user.grade] }}
                />
                <span className="font-medium">{selectedWithdraw.user.name}</span>
              </div>
              <p className="text-2xl font-bold">{formatNumber(selectedWithdraw.amount)} CROWNY</p>
              <p className="text-sm text-[var(--foreground-muted)] mt-2">{selectedWithdraw.bankInfo}</p>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              해당 계좌로 출금을 승인하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowProcessModal(false)}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                취소
              </button>
              <button
                onClick={() => handleProcess(selectedWithdraw, 'APPROVED')}
                className="flex-1 py-2 bg-green-600 text-white rounded-[var(--border-radius)]"
              >
                승인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
