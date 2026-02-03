'use client';

import { useState } from 'react';

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

const GRADE_INFO: Record<Grade, { name: string; color: string }> = {
  SUPER_ADMIN: { name: '슈퍼관리자', color: 'var(--grade-super-admin)' },
  CROWN: { name: 'CROWN', color: 'var(--grade-crown)' },
  DIAMOND: { name: 'DIAMOND', color: 'var(--grade-diamond)' },
  GOLD: { name: 'GOLD', color: 'var(--grade-gold)' },
  SILVER: { name: 'SILVER', color: 'var(--grade-silver)' },
  BRONZE: { name: 'BRONZE', color: 'var(--grade-bronze)' },
};

const STATUS_INFO: Record<UserStatus, { name: string; color: string }> = {
  ACTIVE: { name: '활성', color: 'bg-green-100 text-green-700' },
  SUSPENDED: { name: '정지', color: 'bg-yellow-100 text-yellow-700' },
  BANNED: { name: '차단', color: 'bg-red-100 text-red-700' },
};

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [filterGrade, setFilterGrade] = useState<Grade | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'ALL'>('ALL');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(num);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.includes(search) || user.email.includes(search);
    const matchesGrade = filterGrade === 'ALL' || user.grade === filterGrade;
    const matchesStatus = filterStatus === 'ALL' || user.status === filterStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">회원 관리</h1>
        <p className="text-[var(--foreground-muted)]">전체 회원을 조회하고 관리합니다</p>
      </div>

      {/* 필터 */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="이름 또는 이메일 검색..."
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
            <option value="ALL">전체 등급</option>
            {(Object.keys(GRADE_INFO) as Grade[]).map(grade => (
              <option key={grade} value={grade}>{GRADE_INFO[grade].name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as UserStatus | 'ALL')}
            className="px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
          >
            <option value="ALL">전체 상태</option>
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
                <th className="px-4 py-3 text-left text-sm font-medium">회원</th>
                <th className="px-4 py-3 text-left text-sm font-medium">등급</th>
                <th className="px-4 py-3 text-left text-sm font-medium">상태</th>
                <th className="px-4 py-3 text-left text-sm font-medium">거래</th>
                <th className="px-4 py-3 text-left text-sm font-medium">거래량</th>
                <th className="px-4 py-3 text-left text-sm font-medium">추천인</th>
                <th className="px-4 py-3 text-left text-sm font-medium">가입일</th>
                <th className="px-4 py-3 text-center text-sm font-medium">관리</th>
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
                  <td className="px-4 py-3 text-sm">{user.totalTransactions}건</td>
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
                        title="등급 변경"
                      >
                        등급
                      </button>
                      <button
                        onClick={() => { setSelectedUser(user); setShowStatusModal(true); }}
                        className="px-2 py-1 text-xs bg-[var(--background-secondary)] rounded-[var(--border-radius)] hover:bg-[var(--border-color)]"
                        title="상태 변경"
                      >
                        상태
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
            검색 결과가 없습니다
          </div>
        )}
      </div>

      {/* 등급 변경 모달 */}
      {showGradeModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">등급 변경</h3>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              <span className="font-medium text-[var(--foreground)]">{selectedUser.name}</span>님의 등급을 변경합니다
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
                취소
              </button>
              <button
                onClick={() => setShowGradeModal(false)}
                className="flex-1 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)]"
              >
                변경
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 상태 변경 모달 */}
      {showStatusModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">상태 변경</h3>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              <span className="font-medium text-[var(--foreground)]">{selectedUser.name}</span>님의 상태를 변경합니다
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
              <label className="block text-sm font-medium mb-1">사유 (선택)</label>
              <textarea
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)] text-sm"
                rows={3}
                placeholder="상태 변경 사유를 입력하세요..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                취소
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)]"
              >
                변경
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
