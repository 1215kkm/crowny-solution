'use client';

import { useState } from 'react';

type Grade = 'SUPER_ADMIN' | 'CROWN' | 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const PERMISSIONS: Permission[] = [
  // 회원 관리
  { id: 'users_view', name: '회원 조회', description: '회원 목록 및 상세 정보 조회', category: '회원 관리' },
  { id: 'users_edit', name: '회원 수정', description: '회원 정보 수정', category: '회원 관리' },
  { id: 'users_grade', name: '등급 변경', description: '회원 등급 변경 (자신보다 낮은 등급만)', category: '회원 관리' },
  { id: 'users_ban', name: '회원 제재', description: '회원 정지/차단 처리', category: '회원 관리' },

  // 거래 관리
  { id: 'tx_view', name: '거래 조회', description: '모든 거래 내역 조회', category: '거래 관리' },
  { id: 'tx_cancel', name: '거래 취소', description: '거래 강제 취소', category: '거래 관리' },
  { id: 'tx_release', name: '에스크로 해제', description: '에스크로 강제 해제', category: '거래 관리' },
  { id: 'tx_refund', name: '환불 처리', description: '거래 환불 처리', category: '거래 관리' },

  // 정산 관리
  { id: 'commission_view', name: '수수료 조회', description: '수수료 내역 조회', category: '정산 관리' },
  { id: 'commission_edit', name: '수수료율 설정', description: '등급별 수수료율 설정', category: '정산 관리' },
  { id: 'withdraw_approve', name: '출금 승인', description: '출금 요청 승인/거절', category: '정산 관리' },
  { id: 'settlement', name: '정산 실행', description: '정산 실행 및 관리', category: '정산 관리' },

  // 신고 관리
  { id: 'report_view', name: '신고 조회', description: '신고 내역 조회', category: '신고 관리' },
  { id: 'report_handle', name: '신고 처리', description: '신고 접수/처리', category: '신고 관리' },
  { id: 'dispute_resolve', name: '분쟁 해결', description: '거래 분쟁 중재 및 해결', category: '신고 관리' },

  // 시스템 관리
  { id: 'settings_view', name: '설정 조회', description: '시스템 설정 조회', category: '시스템 관리' },
  { id: 'settings_edit', name: '설정 변경', description: '시스템 설정 변경', category: '시스템 관리' },
  { id: 'admin_create', name: '관리자 생성', description: '하위 관리자 계정 생성', category: '시스템 관리' },
  { id: 'admin_delete', name: '관리자 삭제', description: '하위 관리자 계정 삭제', category: '시스템 관리' },
];

const GRADE_INFO: Record<Grade, { name: string; color: string; level: number }> = {
  SUPER_ADMIN: { name: '슈퍼관리자', color: 'var(--grade-super-admin)', level: 6 },
  CROWN: { name: 'CROWN', color: 'var(--grade-crown)', level: 5 },
  DIAMOND: { name: 'DIAMOND', color: 'var(--grade-diamond)', level: 4 },
  GOLD: { name: 'GOLD', color: 'var(--grade-gold)', level: 3 },
  SILVER: { name: 'SILVER', color: 'var(--grade-silver)', level: 2 },
  BRONZE: { name: 'BRONZE', color: 'var(--grade-bronze)', level: 1 },
};

const COMMISSION_RATES: Record<Grade, number> = {
  SUPER_ADMIN: 0,
  CROWN: 0.5,
  DIAMOND: 1.5,
  GOLD: 1.0,
  SILVER: 0.75,
  BRONZE: 0.25,
};

// 초기 권한 설정
const initialPermissions: Record<Grade, string[]> = {
  SUPER_ADMIN: PERMISSIONS.map(p => p.id), // 모든 권한
  CROWN: ['users_view', 'users_edit', 'users_grade', 'users_ban', 'tx_view', 'tx_cancel', 'tx_release', 'commission_view', 'withdraw_approve', 'report_view', 'report_handle', 'dispute_resolve', 'admin_create'],
  DIAMOND: ['users_view', 'users_edit', 'users_grade', 'tx_view', 'tx_cancel', 'commission_view', 'report_view', 'report_handle'],
  GOLD: ['users_view', 'users_edit', 'tx_view', 'report_view', 'report_handle'],
  SILVER: ['users_view', 'tx_view', 'report_view'],
  BRONZE: ['report_view'],
};

export default function PermissionsPage() {
  const [gradePermissions, setGradePermissions] = useState(initialPermissions);
  const [selectedGrade, setSelectedGrade] = useState<Grade>('CROWN');
  const [commissionRates, setCommissionRates] = useState(COMMISSION_RATES);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const categories = [...new Set(PERMISSIONS.map(p => p.category))];

  const togglePermission = (permissionId: string) => {
    if (selectedGrade === 'SUPER_ADMIN') return; // 슈퍼관리자는 수정 불가

    setGradePermissions(prev => {
      const current = prev[selectedGrade];
      const updated = current.includes(permissionId)
        ? current.filter(id => id !== permissionId)
        : [...current, permissionId];
      return { ...prev, [selectedGrade]: updated };
    });
  };

  const handleCommissionChange = (grade: Grade, value: string) => {
    const numValue = parseFloat(value) || 0;
    setCommissionRates(prev => ({ ...prev, [grade]: numValue }));
  };

  const handleSave = () => {
    setShowSaveModal(true);
    setTimeout(() => setShowSaveModal(false), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">등급/권한 설정</h1>
        <p className="text-[var(--foreground-muted)]">각 등급별 권한과 수수료율을 설정합니다</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 등급 선택 */}
        <div className="card p-4">
          <h2 className="font-semibold mb-4">등급 선택</h2>
          <div className="space-y-2">
            {(Object.keys(GRADE_INFO) as Grade[]).map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`w-full flex items-center gap-3 p-3 rounded-[var(--border-radius)] border transition-colors ${
                  selectedGrade === grade
                    ? 'border-[var(--primary)] bg-[var(--background-secondary)]'
                    : 'border-[var(--border-color)] hover:bg-[var(--background-secondary)]'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: GRADE_INFO[grade].color }}
                />
                <span className="font-medium">{GRADE_INFO[grade].name}</span>
                <span className="ml-auto text-sm text-[var(--foreground-muted)]">
                  Lv.{GRADE_INFO[grade].level}
                </span>
              </button>
            ))}
          </div>

          {/* 수수료율 설정 */}
          <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
            <h3 className="font-semibold mb-3">수수료 분배율 (%)</h3>
            <p className="text-xs text-[var(--foreground-muted)] mb-3">
              거래 완료 시 상위 등급에게 분배되는 수수료율
            </p>
            {(Object.keys(GRADE_INFO) as Grade[]).filter(g => g !== 'SUPER_ADMIN').map((grade) => (
              <div key={grade} className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: GRADE_INFO[grade].color }}
                />
                <span className="text-sm flex-1">{GRADE_INFO[grade].name}</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={commissionRates[grade]}
                  onChange={(e) => handleCommissionChange(grade, e.target.value)}
                  className="w-20 px-2 py-1 border border-[var(--border-color)] rounded-[var(--border-radius)] text-sm text-right"
                />
                <span className="text-sm">%</span>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t border-[var(--border-color)] flex justify-between">
              <span className="text-sm font-medium">총 수수료</span>
              <span className="text-sm font-bold">
                {Object.entries(commissionRates)
                  .filter(([k]) => k !== 'SUPER_ADMIN')
                  .reduce((sum, [, v]) => sum + v, 0)
                  .toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* 권한 설정 */}
        <div className="lg:col-span-2 card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: GRADE_INFO[selectedGrade].color }}
                />
                {GRADE_INFO[selectedGrade].name} 권한
              </h2>
              <p className="text-sm text-[var(--foreground-muted)]">
                {selectedGrade === 'SUPER_ADMIN'
                  ? '슈퍼관리자는 모든 권한을 가집니다 (수정 불가)'
                  : '체크된 권한만 사용할 수 있습니다'
                }
              </p>
            </div>
            <div className="text-sm">
              <span className="font-medium">{gradePermissions[selectedGrade].length}</span>
              <span className="text-[var(--foreground-muted)]"> / {PERMISSIONS.length}</span>
            </div>
          </div>

          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-[var(--foreground-muted)] mb-2">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {PERMISSIONS.filter(p => p.category === category).map((permission) => {
                    const isChecked = gradePermissions[selectedGrade].includes(permission.id);
                    const isDisabled = selectedGrade === 'SUPER_ADMIN';

                    return (
                      <label
                        key={permission.id}
                        className={`flex items-start gap-3 p-3 rounded-[var(--border-radius)] border cursor-pointer transition-colors ${
                          isChecked
                            ? 'border-[var(--primary)] bg-[var(--background-secondary)]'
                            : 'border-[var(--border-color)] hover:bg-[var(--background-secondary)]'
                        } ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePermission(permission.id)}
                          disabled={isDisabled}
                          className="mt-0.5"
                        />
                        <div>
                          <p className="text-sm font-medium">{permission.name}</p>
                          <p className="text-xs text-[var(--foreground-muted)]">
                            {permission.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => {
            setGradePermissions(initialPermissions);
            setCommissionRates(COMMISSION_RATES);
          }}
          className="px-4 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)] hover:bg-[var(--background-secondary)]"
        >
          초기화
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)] hover:opacity-90"
        >
          저장하기
        </button>
      </div>

      {/* 저장 완료 모달 */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] text-center">
            <span className="text-4xl">✅</span>
            <p className="mt-2 font-medium">설정이 저장되었습니다</p>
          </div>
        </div>
      )}
    </div>
  );
}
