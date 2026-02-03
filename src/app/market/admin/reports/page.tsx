'use client';

import { useState } from 'react';

type ReportStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'DISMISSED';
type ReportType = 'FRAUD' | 'FAKE_PRODUCT' | 'HARASSMENT' | 'SPAM' | 'OTHER';

interface Report {
  id: string;
  type: ReportType;
  reporter: { name: string; grade: string };
  target: { name: string; grade: string; type: 'USER' | 'PRODUCT' };
  description: string;
  status: ReportStatus;
  createdAt: string;
  resolvedAt: string | null;
  resolution: string | null;
}

const mockReports: Report[] = [
  { id: 'r1', type: 'FRAUD', reporter: { name: '김신고', grade: 'GOLD' }, target: { name: '이사기', grade: 'BRONZE', type: 'USER' }, description: '상품을 받지 못했는데 판매자가 배송했다고 주장합니다.', status: 'PENDING', createdAt: '2024-02-03 14:30', resolvedAt: null, resolution: null },
  { id: 'r2', type: 'FAKE_PRODUCT', reporter: { name: '박유저', grade: 'SILVER' }, target: { name: '아이폰 15 Pro (가품)', grade: 'BRONZE', type: 'PRODUCT' }, description: '정품이라고 했는데 가품으로 의심됩니다. 일련번호가 조회되지 않습니다.', status: 'IN_PROGRESS', createdAt: '2024-02-02 10:00', resolvedAt: null, resolution: null },
  { id: 'r3', type: 'HARASSMENT', reporter: { name: '정회원', grade: 'BRONZE' }, target: { name: '강유저', grade: 'SILVER', type: 'USER' }, description: '채팅에서 욕설과 협박을 합니다.', status: 'RESOLVED', createdAt: '2024-02-01 16:00', resolvedAt: '2024-02-02 09:00', resolution: '해당 회원 7일 정지 처리' },
  { id: 'r4', type: 'SPAM', reporter: { name: '한유저', grade: 'GOLD' }, target: { name: '스팸유저', grade: 'BRONZE', type: 'USER' }, description: '동일한 상품을 중복 등록하고 있습니다.', status: 'DISMISSED', createdAt: '2024-01-30 11:00', resolvedAt: '2024-01-31 14:00', resolution: '중복 등록 확인 안됨. 신고 기각' },
];

const TYPE_INFO: Record<ReportType, { name: string; color: string }> = {
  FRAUD: { name: '사기 의심', color: 'bg-red-100 text-red-700' },
  FAKE_PRODUCT: { name: '허위 상품', color: 'bg-orange-100 text-orange-700' },
  HARASSMENT: { name: '욕설/비방', color: 'bg-purple-100 text-purple-700' },
  SPAM: { name: '스팸/도배', color: 'bg-gray-100 text-gray-700' },
  OTHER: { name: '기타', color: 'bg-blue-100 text-blue-700' },
};

const STATUS_INFO: Record<ReportStatus, { name: string; color: string }> = {
  PENDING: { name: '대기', color: 'bg-yellow-100 text-yellow-700' },
  IN_PROGRESS: { name: '처리중', color: 'bg-blue-100 text-blue-700' },
  RESOLVED: { name: '해결', color: 'bg-green-100 text-green-700' },
  DISMISSED: { name: '기각', color: 'bg-gray-100 text-gray-700' },
};

const GRADE_COLORS: Record<string, string> = {
  CROWN: 'var(--grade-crown)',
  DIAMOND: 'var(--grade-diamond)',
  GOLD: 'var(--grade-gold)',
  SILVER: 'var(--grade-silver)',
  BRONZE: 'var(--grade-bronze)',
};

const ACTIONS = [
  { id: 'warn', name: '경고', description: '사용자에게 경고 메시지 발송' },
  { id: 'suspend_1d', name: '1일 정지', description: '1일간 서비스 이용 정지' },
  { id: 'suspend_7d', name: '7일 정지', description: '7일간 서비스 이용 정지' },
  { id: 'suspend_30d', name: '30일 정지', description: '30일간 서비스 이용 정지' },
  { id: 'ban', name: '영구 차단', description: '서비스 영구 이용 불가' },
  { id: 'delete_product', name: '상품 삭제', description: '해당 상품 삭제 처리' },
  { id: 'dismiss', name: '신고 기각', description: '신고 내용 확인 결과 문제 없음' },
];

export default function ReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'ALL'>('ALL');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [resolution, setResolution] = useState('');

  const filteredReports = reports.filter(report =>
    filterStatus === 'ALL' || report.status === filterStatus
  );

  const pendingCount = reports.filter(r => r.status === 'PENDING').length;
  const inProgressCount = reports.filter(r => r.status === 'IN_PROGRESS').length;

  const handleResolve = () => {
    if (!selectedReport || !selectedAction) return;

    const action = ACTIONS.find(a => a.id === selectedAction);
    const resolutionText = resolution || action?.name || '';

    setReports(reports.map(r =>
      r.id === selectedReport.id
        ? {
            ...r,
            status: selectedAction === 'dismiss' ? 'DISMISSED' : 'RESOLVED',
            resolvedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            resolution: resolutionText,
          }
        : r
    ));

    setShowResolveModal(false);
    setSelectedReport(null);
    setSelectedAction('');
    setResolution('');
  };

  const startProgress = (report: Report) => {
    setReports(reports.map(r =>
      r.id === report.id ? { ...r, status: 'IN_PROGRESS' } : r
    ));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">신고/분쟁 관리</h1>
        <p className="text-[var(--foreground-muted)]">사용자 신고와 분쟁을 처리합니다</p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          onClick={() => setFilterStatus('PENDING')}
          className={`card p-4 cursor-pointer ${filterStatus === 'PENDING' ? 'ring-2 ring-[var(--primary)]' : ''}`}
        >
          <p className="text-sm text-[var(--foreground-muted)]">대기중</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div
          onClick={() => setFilterStatus('IN_PROGRESS')}
          className={`card p-4 cursor-pointer ${filterStatus === 'IN_PROGRESS' ? 'ring-2 ring-[var(--primary)]' : ''}`}
        >
          <p className="text-sm text-[var(--foreground-muted)]">처리중</p>
          <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
        </div>
        <div
          onClick={() => setFilterStatus('RESOLVED')}
          className={`card p-4 cursor-pointer ${filterStatus === 'RESOLVED' ? 'ring-2 ring-[var(--primary)]' : ''}`}
        >
          <p className="text-sm text-[var(--foreground-muted)]">해결</p>
          <p className="text-2xl font-bold text-green-600">
            {reports.filter(r => r.status === 'RESOLVED').length}
          </p>
        </div>
        <div
          onClick={() => setFilterStatus('ALL')}
          className={`card p-4 cursor-pointer ${filterStatus === 'ALL' ? 'ring-2 ring-[var(--primary)]' : ''}`}
        >
          <p className="text-sm text-[var(--foreground-muted)]">전체</p>
          <p className="text-2xl font-bold">{reports.length}</p>
        </div>
      </div>

      {/* 신고 목록 */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${TYPE_INFO[report.type].color}`}>
                  {TYPE_INFO[report.type].name}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${STATUS_INFO[report.status].color}`}>
                  {STATUS_INFO[report.status].name}
                </span>
              </div>
              <span className="text-xs text-[var(--foreground-muted)]">{report.createdAt}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-[var(--foreground-muted)] mb-1">신고자</p>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: GRADE_COLORS[report.reporter.grade] }}
                  />
                  <span className="font-medium">{report.reporter.name}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-[var(--foreground-muted)] mb-1">
                  피신고 {report.target.type === 'USER' ? '회원' : '상품'}
                </p>
                <div className="flex items-center gap-2">
                  {report.target.type === 'USER' && (
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: GRADE_COLORS[report.target.grade] }}
                    />
                  )}
                  <span className="font-medium">{report.target.name}</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--background-secondary)] p-3 rounded-[var(--border-radius)] mb-3">
              <p className="text-sm">{report.description}</p>
            </div>

            {report.resolution && (
              <div className="bg-green-50 p-3 rounded-[var(--border-radius)] mb-3">
                <p className="text-xs text-[var(--foreground-muted)] mb-1">처리 결과</p>
                <p className="text-sm text-green-700">{report.resolution}</p>
              </div>
            )}

            {(report.status === 'PENDING' || report.status === 'IN_PROGRESS') && (
              <div className="flex gap-2">
                {report.status === 'PENDING' && (
                  <button
                    onClick={() => startProgress(report)}
                    className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-[var(--border-radius)] hover:bg-blue-200"
                  >
                    처리 시작
                  </button>
                )}
                <button
                  onClick={() => { setSelectedReport(report); setShowResolveModal(true); }}
                  className="px-3 py-1.5 text-sm bg-[var(--primary)] text-white rounded-[var(--border-radius)] hover:opacity-90"
                >
                  처리 완료
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="card p-8 text-center text-[var(--foreground-muted)]">
            해당 상태의 신고가 없습니다
          </div>
        )}
      </div>

      {/* 처리 모달 */}
      {showResolveModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">신고 처리</h3>

            <div className="bg-[var(--background-secondary)] p-4 rounded-[var(--border-radius)] mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_INFO[selectedReport.type].color}`}>
                  {TYPE_INFO[selectedReport.type].name}
                </span>
              </div>
              <p className="text-sm mb-2">{selectedReport.description}</p>
              <p className="text-xs text-[var(--foreground-muted)]">
                피신고자: {selectedReport.target.name}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">조치 선택</label>
              <div className="space-y-2">
                {ACTIONS.map((action) => (
                  <label
                    key={action.id}
                    className={`flex items-start gap-3 p-3 border rounded-[var(--border-radius)] cursor-pointer ${
                      selectedAction === action.id
                        ? 'border-[var(--primary)] bg-[var(--background-secondary)]'
                        : 'border-[var(--border-color)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="action"
                      value={action.id}
                      checked={selectedAction === action.id}
                      onChange={() => setSelectedAction(action.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium">{action.name}</p>
                      <p className="text-xs text-[var(--foreground-muted)]">{action.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">처리 내용 (선택)</label>
              <textarea
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)] text-sm"
                rows={3}
                placeholder="추가 처리 내용을 입력하세요..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowResolveModal(false); setSelectedAction(''); setResolution(''); }}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                취소
              </button>
              <button
                onClick={handleResolve}
                disabled={!selectedAction}
                className="flex-1 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)] disabled:opacity-50"
              >
                처리 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
