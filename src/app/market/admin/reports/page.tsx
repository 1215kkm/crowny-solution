'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n';

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

const GRADE_COLORS: Record<string, string> = {
  CROWN: 'var(--grade-crown)',
  DIAMOND: 'var(--grade-diamond)',
  GOLD: 'var(--grade-gold)',
  SILVER: 'var(--grade-silver)',
  BRONZE: 'var(--grade-bronze)',
};

export default function ReportsPage() {
  const { t } = useTranslation();

  const TYPE_INFO: Record<ReportType, { name: string; color: string }> = {
    FRAUD: { name: t('admin.reportType_fraud'), color: 'bg-red-100 text-red-700' },
    FAKE_PRODUCT: { name: t('admin.reportType_fakeProduct'), color: 'bg-orange-100 text-orange-700' },
    HARASSMENT: { name: t('admin.reportType_harassment'), color: 'bg-purple-100 text-purple-700' },
    SPAM: { name: t('admin.reportType_spam'), color: 'bg-gray-100 text-gray-700' },
    OTHER: { name: t('admin.reportType_other'), color: 'bg-blue-100 text-blue-700' },
  };

  const STATUS_INFO: Record<ReportStatus, { name: string; color: string }> = {
    PENDING: { name: t('admin.report_pending'), color: 'bg-yellow-100 text-yellow-700' },
    IN_PROGRESS: { name: t('admin.report_inProgress'), color: 'bg-blue-100 text-blue-700' },
    RESOLVED: { name: t('admin.report_resolved'), color: 'bg-green-100 text-green-700' },
    DISMISSED: { name: t('admin.report_dismissed'), color: 'bg-gray-100 text-gray-700' },
  };

  const ACTIONS = [
    { id: 'warn', name: t('admin.action_warn'), description: t('admin.action_warn_desc') },
    { id: 'suspend_1d', name: t('admin.action_suspend1d'), description: t('admin.action_suspend1d_desc') },
    { id: 'suspend_7d', name: t('admin.action_suspend7d'), description: t('admin.action_suspend7d_desc') },
    { id: 'suspend_30d', name: t('admin.action_suspend30d'), description: t('admin.action_suspend30d_desc') },
    { id: 'ban', name: t('admin.action_ban'), description: t('admin.action_ban_desc') },
    { id: 'delete_product', name: t('admin.action_deleteProduct'), description: t('admin.action_deleteProduct_desc') },
    { id: 'dismiss', name: t('admin.action_dismiss'), description: t('admin.action_dismiss_desc') },
  ];

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
        <h1 className="text-2xl font-bold">{t('admin.reportMgmt')}</h1>
        <p className="text-[var(--foreground-muted)]">{t('admin.reportMgmtDesc')}</p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          onClick={() => setFilterStatus('PENDING')}
          className={`card p-4 cursor-pointer ${filterStatus === 'PENDING' ? 'ring-2 ring-[var(--primary)]' : ''}`}
        >
          <p className="text-sm text-[var(--foreground-muted)]">{t('admin.report_pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div
          onClick={() => setFilterStatus('IN_PROGRESS')}
          className={`card p-4 cursor-pointer ${filterStatus === 'IN_PROGRESS' ? 'ring-2 ring-[var(--primary)]' : ''}`}
        >
          <p className="text-sm text-[var(--foreground-muted)]">{t('admin.report_inProgress')}</p>
          <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
        </div>
        <div
          onClick={() => setFilterStatus('RESOLVED')}
          className={`card p-4 cursor-pointer ${filterStatus === 'RESOLVED' ? 'ring-2 ring-[var(--primary)]' : ''}`}
        >
          <p className="text-sm text-[var(--foreground-muted)]">{t('admin.report_resolved')}</p>
          <p className="text-2xl font-bold text-green-600">
            {reports.filter(r => r.status === 'RESOLVED').length}
          </p>
        </div>
        <div
          onClick={() => setFilterStatus('ALL')}
          className={`card p-4 cursor-pointer ${filterStatus === 'ALL' ? 'ring-2 ring-[var(--primary)]' : ''}`}
        >
          <p className="text-sm text-[var(--foreground-muted)]">{t('admin.all')}</p>
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
                <p className="text-xs text-[var(--foreground-muted)] mb-1">{t('admin.reporter')}</p>
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
                  {report.target.type === 'USER' ? t('admin.reportedUser') : t('admin.reportedProduct')}
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
                <p className="text-xs text-[var(--foreground-muted)] mb-1">{t('admin.processResult')}</p>
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
                    {t('admin.startProcess')}
                  </button>
                )}
                <button
                  onClick={() => { setSelectedReport(report); setShowResolveModal(true); }}
                  className="px-3 py-1.5 text-sm bg-[var(--primary)] text-white rounded-[var(--border-radius)] hover:opacity-90"
                >
                  {t('admin.completeProcess')}
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="card p-8 text-center text-[var(--foreground-muted)]">
            {t('admin.noReportsForStatus')}
          </div>
        )}
      </div>

      {/* 처리 모달 */}
      {showResolveModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{t('admin.reportProcess')}</h3>

            <div className="bg-[var(--background-secondary)] p-4 rounded-[var(--border-radius)] mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_INFO[selectedReport.type].color}`}>
                  {TYPE_INFO[selectedReport.type].name}
                </span>
              </div>
              <p className="text-sm mb-2">{selectedReport.description}</p>
              <p className="text-xs text-[var(--foreground-muted)]">
                {t('admin.reportedTarget')} {selectedReport.target.name}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">{t('admin.selectAction')}</label>
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
              <label className="block text-sm font-medium mb-1">{t('admin.processContent')}</label>
              <textarea
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)] text-sm"
                rows={3}
                placeholder={t('admin.enterProcessContent')}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowResolveModal(false); setSelectedAction(''); setResolution(''); }}
                className="flex-1 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)]"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleResolve}
                disabled={!selectedAction}
                className="flex-1 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)] disabled:opacity-50"
              >
                {t('admin.completeProcess')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
