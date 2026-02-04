'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n';

// 임시 통계 데이터
const stats = {
  totalUsers: 15234,
  newUsersToday: 47,
  activeTransactions: 328,
  completedToday: 89,
  totalVolume: 4523000,
  volumeToday: 234500,
  pendingReports: 12,
  pendingWithdrawals: 23,
};

const gradeStats = [
  { grade: 'CROWN', count: 5, color: 'var(--grade-crown)' },
  { grade: 'DIAMOND', count: 23, color: 'var(--grade-diamond)' },
  { grade: 'GOLD', count: 156, color: 'var(--grade-gold)' },
  { grade: 'SILVER', count: 892, color: 'var(--grade-silver)' },
  { grade: 'BRONZE', count: 14158, color: 'var(--grade-bronze)' },
];

const recentTransactions = [
  { id: 't1', buyer: '김구매', seller: '이판매', amount: 15000, status: 'ESCROW', time: '10분 전' },
  { id: 't2', buyer: '박유저', seller: '최셀러', amount: 8500, status: 'COMPLETED', time: '25분 전' },
  { id: 't3', buyer: '정회원', seller: '강판매', amount: 32000, status: 'ESCROW', time: '1시간 전' },
  { id: 't4', buyer: '한구매', seller: '오셀러', amount: 5000, status: 'DISPUTE', time: '2시간 전' },
  { id: 't5', buyer: '임유저', seller: '신판매', amount: 12000, status: 'COMPLETED', time: '3시간 전' },
];

const recentReports = [
  { id: 'r1', type: '사기 의심', reporter: '김신고', target: '이사기', time: '30분 전' },
  { id: 'r2', type: '허위 상품', reporter: '박유저', target: '최판매', time: '1시간 전' },
  { id: 'r3', type: '욕설/비방', reporter: '정회원', target: '강유저', time: '2시간 전' },
];

const STATUS_COLORS: Record<string, string> = {
  ESCROW: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  DISPUTE: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-700',
};

const LOCALE_MAP: Record<string, string> = {
  ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH',
};

export default function AdminDashboard() {
  const { t, locale } = useTranslation();

  const formatNumber = (num: number) => new Intl.NumberFormat(LOCALE_MAP[locale] || 'ko-KR').format(num);

  const STATUS_NAMES: Record<string, string> = {
    ESCROW: t('admin.status_escrow'),
    COMPLETED: t('admin.status_completed'),
    DISPUTE: t('admin.status_dispute'),
    CANCELLED: t('admin.status_cancelled'),
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('admin.dashboardTitle')}</h1>
        <p className="text-[var(--foreground-muted)]">{t('admin.marketStatus')}</p>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-[var(--foreground-muted)]">{t('admin.totalUsers')}</p>
          <p className="text-2xl font-bold">{formatNumber(stats.totalUsers)}</p>
          <p className="text-sm text-green-600">{t('admin.todayPlus', { count: String(stats.newUsersToday) })}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-[var(--foreground-muted)]">{t('admin.activeTransactions')}</p>
          <p className="text-2xl font-bold">{formatNumber(stats.activeTransactions)}</p>
          <p className="text-sm text-green-600">{t('admin.completedPlus', { count: String(stats.completedToday) })}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-[var(--foreground-muted)]">{t('admin.totalVolume')}</p>
          <p className="text-2xl font-bold">{formatNumber(stats.totalVolume)}</p>
          <p className="text-sm text-green-600">{t('admin.todayVolumePlus', { amount: formatNumber(stats.volumeToday) })}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-[var(--foreground-muted)]">{t('admin.pendingTasks')}</p>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xl font-bold text-red-600">{stats.pendingReports}</p>
              <p className="text-xs">{t('admin.reports')}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-orange-600">{stats.pendingWithdrawals}</p>
              <p className="text-xs">{t('admin.withdrawals')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 등급별 통계 */}
      <div className="card p-4 mb-6">
        <h2 className="font-semibold mb-4">{t('admin.gradeDistribution')}</h2>
        <div className="flex items-end gap-4 h-40">
          {gradeStats.map((item) => {
            const maxCount = Math.max(...gradeStats.map(g => g.count));
            const height = (item.count / maxCount) * 100;
            return (
              <div key={item.grade} className="flex-1 flex flex-col items-center">
                <span className="text-sm font-medium mb-1">{formatNumber(item.count)}</span>
                <div
                  className="w-full rounded-t-[var(--border-radius)]"
                  style={{
                    height: `${height}%`,
                    backgroundColor: item.color,
                    minHeight: '20px',
                  }}
                />
                <span className="text-xs mt-2">{item.grade}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 거래 */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{t('admin.recentTransactions')}</h2>
            <Link
              href="/market/admin/transactions"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              {t('admin.viewAll')}
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2 border-b border-[var(--border-color)] last:border-0"
              >
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{tx.buyer}</span>
                    <span className="text-[var(--foreground-muted)]"> → </span>
                    <span className="font-medium">{tx.seller}</span>
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)]">{tx.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatNumber(tx.amount)}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[tx.status]}`}
                  >
                    {STATUS_NAMES[tx.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 신고 */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{t('admin.recentReports')}</h2>
            <Link
              href="/market/admin/reports"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              {t('admin.viewAll')}
            </Link>
          </div>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between py-2 border-b border-[var(--border-color)] last:border-0"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full mr-2">
                    {report.type}
                  </span>
                  <span className="text-sm">{report.target}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm">{report.reporter}</p>
                  <p className="text-xs text-[var(--foreground-muted)]">{report.time}</p>
                </div>
              </div>
            ))}
          </div>
          {recentReports.length === 0 && (
            <p className="text-center text-[var(--foreground-muted)] py-8">
              {t('admin.noReportsPending')}
            </p>
          )}
        </div>
      </div>

      {/* 빠른 작업 */}
      <div className="card p-4 mt-6">
        <h2 className="font-semibold mb-4">{t('admin.quickActions')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/market/admin/users?filter=new"
            className="p-3 bg-[var(--background-secondary)] rounded-[var(--border-radius)] text-center hover:bg-[var(--border-color)] transition-colors"
          >
            <span className="text-2xl">👤</span>
            <p className="text-sm mt-1">{t('admin.newMembers')}</p>
          </Link>
          <Link
            href="/market/admin/transactions?filter=dispute"
            className="p-3 bg-[var(--background-secondary)] rounded-[var(--border-radius)] text-center hover:bg-[var(--border-color)] transition-colors"
          >
            <span className="text-2xl">⚠️</span>
            <p className="text-sm mt-1">{t('admin.disputeTransactions')}</p>
          </Link>
          <Link
            href="/market/admin/commissions?filter=pending"
            className="p-3 bg-[var(--background-secondary)] rounded-[var(--border-radius)] text-center hover:bg-[var(--border-color)] transition-colors"
          >
            <span className="text-2xl">💸</span>
            <p className="text-sm mt-1">{t('admin.withdrawRequest')}</p>
          </Link>
          <Link
            href="/market/admin/reports"
            className="p-3 bg-[var(--background-secondary)] rounded-[var(--border-radius)] text-center hover:bg-[var(--border-color)] transition-colors"
          >
            <span className="text-2xl">🚨</span>
            <p className="text-sm mt-1">{t('admin.reportProcessing')}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
