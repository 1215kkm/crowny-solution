'use client';

import { useState } from 'react';

type Grade = 'CROWN' | 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE';
type AdminStatus = 'ACTIVE' | 'INACTIVE';

interface SubAdmin {
  id: string;
  name: string;
  email: string;
  grade: Grade;
  status: AdminStatus;
  createdAt: string;
  createdBy: string;
  lastLoginAt: string;
  managedUsers: number;
  managedTransactions: number;
}

const mockSubAdmins: SubAdmin[] = [
  { id: 'a1', name: '김크라운', email: 'crown.admin@crowny.com', grade: 'CROWN', status: 'ACTIVE', createdAt: '2024-01-01', createdBy: '슈퍼관리자', lastLoginAt: '2024-02-03', managedUsers: 500, managedTransactions: 1200 },
  { id: 'a2', name: '이다이아몬드', email: 'diamond.admin@crowny.com', grade: 'DIAMOND', status: 'ACTIVE', createdAt: '2024-01-10', createdBy: '김크라운', lastLoginAt: '2024-02-03', managedUsers: 200, managedTransactions: 450 },
  { id: 'a3', name: '박골드', email: 'gold.admin@crowny.com', grade: 'GOLD', status: 'ACTIVE', createdAt: '2024-01-15', createdBy: '이다이아몬드', lastLoginAt: '2024-02-02', managedUsers: 80, managedTransactions: 150 },
  { id: 'a4', name: '최실버', email: 'silver.admin@crowny.com', grade: 'SILVER', status: 'INACTIVE', createdAt: '2024-01-20', createdBy: '박골드', lastLoginAt: '2024-01-25', managedUsers: 20, managedTransactions: 30 },
];

const GRADE_INFO: Record<Grade, { name: string; color: string; level: number }> = {
  CROWN: { name: 'CROWN', color: 'var(--grade-crown)', level: 5 },
  DIAMOND: { name: 'DIAMOND', color: 'var(--grade-diamond)', level: 4 },
  GOLD: { name: 'GOLD', color: 'var(--grade-gold)', level: 3 },
  SILVER: { name: 'SILVER', color: 'var(--grade-silver)', level: 2 },
  BRONZE: { name: 'BRONZE', color: 'var(--grade-bronze)', level: 1 },
};

export default function SubAdminsPage() {
  const [subAdmins, setSubAdmins] = useState(mockSubAdmins);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<SubAdmin | null>(null);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', grade: 'GOLD' as Grade });

  const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(num);

  const handleCreate = () => {
    const admin: SubAdmin = {
      id: `a${Date.now()}`,
      name: newAdmin.name,
      email: newAdmin.email,
      grade: newAdmin.grade,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: '슈퍼관리자',
      lastLoginAt: '-',
      managedUsers: 0,
      managedTransactions: 0,
    };
    setSubAdmins([...subAdmins, admin]);
    setShowCreateModal(false);
    setNewAdmin({ name: '', email: '', grade: 'GOLD' });
  };

  const handleDelete = () => {
    if (selectedAdmin) {
      setSubAdmins(subAdmins.filter(a => a.id !== selectedAdmin.id));
      setShowDeleteModal(false);
      setSelectedAdmin(null);
    }
  };

  const toggleStatus = (admin: SubAdmin) => {
    setSubAdmins(subAdmins.map(a =>
      a.id === admin.id
        ? { ...a, status: a.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
        : a
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">하위 관리자 관리</h1>
          <p className="text-[var(--foreground-muted)]">등급별 관리자를 생성하고 관리합니다</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)] hover:opacity-90"
        >
          + 관리자 추가
        </button>
      </div>

      {/* 관리자 계층 구조 */}
      <div className="card p-4 mb-6">
        <h2 className="font-semibold mb-4">관리자 계층 구조</h2>
        <div className="flex items-center gap-2 text-sm overflow-x-auto pb-2">
          <div className="flex items-center gap-1 px-3 py-2 bg-[var(--grade-super-admin)] text-white rounded-[var(--border-radius)] whitespace-nowrap">
            <span>👑</span>
            <span>슈퍼관리자</span>
          </div>
          <span className="text-[var(--foreground-muted)]">→</span>
          {(Object.keys(GRADE_INFO) as Grade[]).map((grade, index) => (
            <div key={grade} className="flex items-center gap-2">
              <div
                className="flex items-center gap-1 px-3 py-2 rounded-[var(--border-radius)] whitespace-nowrap"
                style={{ backgroundColor: GRADE_INFO[grade].color, color: grade === 'CROWN' ? '#000' : '#fff' }}
              >
                <span>{GRADE_INFO[grade].name}</span>
                <span className="text-xs opacity-70">
                  ({subAdmins.filter(a => a.grade === grade).length})
                </span>
              </div>
              {index < Object.keys(GRADE_INFO).length - 1 && (
                <span className="text-[var(--foreground-muted)]">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--foreground-muted)] mt-3">
          * 상위 등급은 자신보다 낮은 등급의 관리자만 생성/관리할 수 있습니다
        </p>
      </div>

      {/* 관리자 목록 */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--background-secondary)]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">관리자</th>
                <th className="px-4 py-3 text-left text-sm font-medium">등급</th>
                <th className="px-4 py-3 text-left text-sm font-medium">상태</th>
                <th className="px-4 py-3 text-left text-sm font-medium">생성자</th>
                <th className="px-4 py-3 text-left text-sm font-medium">관리 회원</th>
                <th className="px-4 py-3 text-left text-sm font-medium">관리 거래</th>
                <th className="px-4 py-3 text-left text-sm font-medium">마지막 로그인</th>
                <th className="px-4 py-3 text-center text-sm font-medium">작업</th>
              </tr>
            </thead>
            <tbody>
              {subAdmins.map((admin) => (
                <tr key={admin.id} className="border-t border-[var(--border-color)] hover:bg-[var(--background-secondary)]">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-[var(--foreground-muted)]">{admin.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: GRADE_INFO[admin.grade].color }}
                      />
                      <span className="text-sm">{GRADE_INFO[admin.grade].name}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      admin.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {admin.status === 'ACTIVE' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{admin.createdBy}</td>
                  <td className="px-4 py-3 text-sm">{formatNumber(admin.managedUsers)}명</td>
                  <td className="px-4 py-3 text-sm">{formatNumber(admin.managedTransactions)}건</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">{admin.lastLoginAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => toggleStatus(admin)}
                        className={`px-2 py-1 text-xs rounded-[var(--border-radius)] ${
                          admin.status === 'ACTIVE'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {admin.status === 'ACTIVE' ? '비활성화' : '활성화'}
                      </button>
                      <button
                        onClick={() => { setSelectedAdmin(admin); setShowDeleteModal(true); }}
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-[var(--border-radius)] hover:bg-red-200"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {subAdmins.length === 0 && (
          <div className="p-8 text-center text-[var(--foreground-muted)]">
            등록된 하위 관리자가 없습니다
          </div>
        )}
      </div>

      {/* 관리자 생성 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">하위 관리자 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">이름</label>
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
                  placeholder="관리자 이름"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">이메일</label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">등급</label>
                <div className="space-y-2">
                  {(Object.keys(GRADE_INFO) as Grade[]).map(grade => (
                    <label
                      key={grade}
                      className={`flex items-center gap-3 p-3 border rounded-[var(--border-radius)] cursor-pointer ${
                        newAdmin.grade === grade ? 'border-[var(--primary)] bg-[var(--background-secondary)]' : 'border-[var(--border-color)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="newGrade"
                        value={grade}
                        checked={newAdmin.grade === grade}
                        onChange={() => setNewAdmin({ ...newAdmin, grade })}
                      />
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: GRADE_INFO[grade].color }}
                      />
                      <span>{GRADE_INFO[grade].name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                취소
              </button>
              <button
                onClick={handleCreate}
                disabled={!newAdmin.name || !newAdmin.email}
                className="flex-1 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)] disabled:opacity-50"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">관리자 삭제</h3>
            <p className="text-[var(--foreground-muted)] mb-6">
              <span className="font-medium text-[var(--foreground)]">{selectedAdmin.name}</span>
              ({selectedAdmin.email}) 관리자를 삭제하시겠습니까?
              <br />
              <span className="text-red-600 text-sm">이 작업은 되돌릴 수 없습니다.</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-red-600 text-white rounded-[var(--border-radius)]"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
