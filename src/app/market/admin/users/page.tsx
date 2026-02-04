'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n';

type Grade = 'SUPER_ADMIN' | 'CROWN' | 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE';
type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED';

interface User {
  id: string;
  name: string;
  email: string;
  grade: Grade;
  status: UserStatus;
  joinedAt: string;
  lastLoginAt: string;
  totalTransactions: number;
  totalVolume: number;
  referrer: string | null;
  referralCount: number;
}

const mockUsers: User[] = [
  { id: 'u1', name: '김크라운', email: 'crown@example.com', grade: 'CROWN', status: 'ACTIVE', joinedAt: '2024-01-15', lastLoginAt: '2024-02-03', totalTransactions: 156, totalVolume: 4500000, referrer: null, referralCount: 23 },
  { id: 'u2', name: '이다이아', email: 'diamond@example.com', grade: 'DIAMOND', status: 'ACTIVE', joinedAt: '2024-01-20', lastLoginAt: '2024-02-03', totalTransactions: 89, totalVolume: 2300000, referrer: 'u1', referralCount: 15 },
  { id: 'u3', name: '박골드', email: 'gold@example.com', grade: 'GOLD', status: 'ACTIVE', joinedAt: '2024-01-25', lastLoginAt: '2024-02-02', totalTransactions: 45, totalVolume: 890000, referrer: 'u2', referralCount: 8 },
  { id: 'u4', name: '최실버', email: 'silver@example.com', grade: 'SILVER', status: 'SUSPENDED', joinedAt: '2024-02-01', lastLoginAt: '2024-02-01', totalTransactions: 12, totalVolume: 150000, referrer: 'u3', referralCount: 2 },
  { id: 'u5', name: '정브론즈', email: 'bronze@example.com', grade: 'BRONZE', status: 'ACTIVE', joinedAt: '2024-02-02', lastLoginAt: '2024-02-03', totalTransactions: 3, totalVolume: 25000, referrer: 'u3', referralCount: 0 },
  { id: 'u6', name: '강신규', email: 'new@example.com', grade: 'BRONZE', status: 'ACTIVE', joinedAt: '2024-02-03', lastLoginAt: '2024-02-03', totalTransactions: 0, totalVolume: 0, referrer: 'u5', referralCount: 0 },
  { id: 'u7', name: '한정지', email: 'banned@example.com', grade: 'BRONZE', status: 'BANNED', joinedAt: '2024-01-10', lastLoginAt: '2024-01-15', totalTransactions: 5, totalVolume: 50000, referrer: null, referralCount: 1 },
];

const GRADE_COLORS: Record<Grade, string> = {
  SUPER_ADMIN: 'var(--grade-super-admin)',
  CROWN: 'var(--grade-crown)',
  DIAMOND: 'var(--grade-diamond)',
  GOLD: 'var(--grade-gold)',
  SILVER: 'var(--grade-silver)',
  BRONZE: 'var(--grade-bronze)',
};

const STATUS_COLORS: Record<UserStatus, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  SUSPENDED: 'bg-yellow-100 text-yellow-700',
  BANNED: 'bg-red-100 text-red-700',
};

const LOCALE_MAP: Record<string, string> = {
  ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH',
};

export default function UsersPage() {
  const { t, locale } = useTranslation();
  const [users] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [filterGrade, setFilterGrade] = useState<Grade | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'ALL'>('ALL');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const GRADE_INFO: Record<Grade, { name: string; color: string }> = {
    SUPER_ADMIN: { name: t('grade_super_admin'), color: GRADE_COLORS.SUPER_ADMIN },
    CROWN: { name: t('grade_crown'), color: GRADE_COLORS.CROWN },
    DIAMOND: { name: t('grade_diamond'), color: GRADE_COLORS.DIAMOND },
    GOLD: { name: t('grade_gold'), color: GRADE_COLORS.GOLD },
    SILVER: { name: t('grade_silver'), color: GRADE_COLORS.SILVER },
    BRONZE: { name: t('grade_bronze'), color: GRADE_COLORS.BRONZE },
  };

  const STATUS_INFO: Record<UserStatus, { name: string; color: string }> = {
    ACTIVE: { name: t('admin.user_active'), color: STATUS_COLORS.ACTIVE },
    SUSPENDED: { name: t('admin.user_suspended'), color: STATUS_COLORS.SUSPENDED },
    BANNED: { name: t('admin.user_banned'), color: STATUS_COLORS.BANNED },
  };

  const formatNumber = (num: number) => new Intl.NumberFormat(LOCALE_MAP[locale] || 'ko-KR').format(num);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.includes(search) || user.email.includes(search);
    const matchesGrade = filterGrade === 'ALL' || user.grade === filterGrade;
    const matchesStatus = filterStatus === 'ALL' || user.status === filterStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('admin.userManagement')}</h1>
        <p className="text-[var(--foreground-muted)]">{t('admin.userManagementDesc')}</p>
      </div>

      {/* 필터 */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder={t('admin.searchNameEmail')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
            />
          </div>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value as Grade | 'ALL')}
            className="px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
          >
            <option value="ALL">{t('admin.allGrades')}</option>
            {(Object.keys(GRADE_INFO) as Grade[]).map(grade => (
              <option key={grade} value={grade}>{GRADE_INFO[grade].name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as UserStatus | 'ALL')}
            className="px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
          >
            <option value="ALL">{t('admin.allStatuses')}</option>
            {(Object.keys(STATUS_INFO) as UserStatus[]).map(status => (
              <option key={status} value={status}>{STATUS_INFO[status].name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 회원 목록 */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--background-secondary)]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_member')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_grade')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_status')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_transactions')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_volume')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_referrer')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('admin.col_joinDate')}</th>
                <th className="px-4 py-3 text-center text-sm font-medium">{t('admin.col_manage')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-[var(--border-color)] hover:bg-[var(--background-secondary)]">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-[var(--foreground-muted)]">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: GRADE_INFO[user.grade].color }}
                      />
                      <span className="text-sm">{GRADE_INFO[user.grade].name}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${STATUS_INFO[user.status].color}`}>
                      {STATUS_INFO[user.status].name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{t('admin.txCount', { count: String(user.totalTransactions) })}</td>
                  <td className="px-4 py-3 text-sm">{formatNumber(user.totalVolume)}</td>
                  <td className="px-4 py-3 text-sm">
                    {user.referrer ? (
                      <span className="text-[var(--accent)]">
                        {users.find(u => u.id === user.referrer)?.name || user.referrer}
                      </span>
                    ) : (
                      <span className="text-[var(--foreground-muted)]">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">{user.joinedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => { setSelectedUser(user); setShowGradeModal(true); }}
                        className="px-2 py-1 text-xs bg-[var(--background-secondary)] rounded-[var(--border-radius)] hover:bg-[var(--border-color)]"
                        title={t('admin.changeGrade')}
                      >
                        {t('admin.gradeBtn')}
                      </button>
                      <button
                        onClick={() => { setSelectedUser(user); setShowStatusModal(true); }}
                        className="px-2 py-1 text-xs bg-[var(--background-secondary)] rounded-[var(--border-radius)] hover:bg-[var(--border-color)]"
                        title={t('admin.changeStatus')}
                      >
                        {t('admin.statusBtn')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-[var(--foreground-muted)]">
            {t('admin.noResults')}
          </div>
        )}
      </div>

      {/* 등급 변경 모달 */}
      {showGradeModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{t('admin.changeGrade')}</h3>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              {t('admin.changeGradeDesc', { name: selectedUser.name })}
            </p>
            <div className="space-y-2 mb-6">
              {(Object.keys(GRADE_INFO) as Grade[]).filter(g => g !== 'SUPER_ADMIN').map(grade => (
                <label
                  key={grade}
                  className={`flex items-center gap-3 p-3 border rounded-[var(--border-radius)] cursor-pointer ${
                    selectedUser.grade === grade ? 'border-[var(--primary)] bg-[var(--background-secondary)]' : 'border-[var(--border-color)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="grade"
                    value={grade}
                    defaultChecked={selectedUser.grade === grade}
                  />
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: GRADE_INFO[grade].color }}
                  />
                  <span>{GRADE_INFO[grade].name}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowGradeModal(false)}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => setShowGradeModal(false)}
                className="flex-1 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)]"
              >
                {t('admin.change')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 상태 변경 모달 */}
      {showStatusModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{t('admin.changeStatus')}</h3>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              {t('admin.changeStatusDesc', { name: selectedUser.name })}
            </p>
            <div className="space-y-2 mb-4">
              {(Object.keys(STATUS_INFO) as UserStatus[]).map(status => (
                <label
                  key={status}
                  className={`flex items-center gap-3 p-3 border rounded-[var(--border-radius)] cursor-pointer ${
                    selectedUser.status === status ? 'border-[var(--primary)] bg-[var(--background-secondary)]' : 'border-[var(--border-color)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    defaultChecked={selectedUser.status === status}
                  />
                  <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_INFO[status].color}`}>
                    {STATUS_INFO[status].name}
                  </span>
                </label>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('admin.reasonOptional')}</label>
              <textarea
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)] text-sm"
                rows={3}
                placeholder={t('admin.enterReason')}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)]"
              >
                {t('admin.change')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
