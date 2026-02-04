'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n';

type Grade = 'SUPER_ADMIN' | 'CROWN' | 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const GRADE_STYLES: Record<Grade, { color: string; level: number }> = {
  SUPER_ADMIN: { color: 'var(--grade-super-admin)', level: 6 },
  CROWN: { color: 'var(--grade-crown)', level: 5 },
  DIAMOND: { color: 'var(--grade-diamond)', level: 4 },
  GOLD: { color: 'var(--grade-gold)', level: 3 },
  SILVER: { color: 'var(--grade-silver)', level: 2 },
  BRONZE: { color: 'var(--grade-bronze)', level: 1 },
};

const ALL_PERMISSION_IDS = [
  'users_view', 'users_edit', 'users_grade', 'users_ban',
  'tx_view', 'tx_cancel', 'tx_release', 'tx_refund',
  'commission_view', 'commission_edit', 'withdraw_approve', 'settlement',
  'report_view', 'report_handle', 'dispute_resolve',
  'settings_view', 'settings_edit', 'admin_create', 'admin_delete',
];

const COMMISSION_RATES: Record<Grade, number> = {
  SUPER_ADMIN: 0,
  CROWN: 0.5,
  DIAMOND: 1.5,
  GOLD: 1.0,
  SILVER: 0.75,
  BRONZE: 0.25,
};

const initialPermissions: Record<Grade, string[]> = {
  SUPER_ADMIN: ALL_PERMISSION_IDS,
  CROWN: ['users_view', 'users_edit', 'users_grade', 'users_ban', 'tx_view', 'tx_cancel', 'tx_release', 'commission_view', 'withdraw_approve', 'report_view', 'report_handle', 'dispute_resolve', 'admin_create'],
  DIAMOND: ['users_view', 'users_edit', 'users_grade', 'tx_view', 'tx_cancel', 'commission_view', 'report_view', 'report_handle'],
  GOLD: ['users_view', 'users_edit', 'tx_view', 'report_view', 'report_handle'],
  SILVER: ['users_view', 'tx_view', 'report_view'],
  BRONZE: ['report_view'],
};

export default function PermissionsPage() {
  const { t } = useTranslation();

  const GRADE_INFO: Record<Grade, { name: string; color: string; level: number }> = {
    SUPER_ADMIN: { name: t('grade_super_admin'), color: GRADE_STYLES.SUPER_ADMIN.color, level: GRADE_STYLES.SUPER_ADMIN.level },
    CROWN: { name: t('grade_crown'), color: GRADE_STYLES.CROWN.color, level: GRADE_STYLES.CROWN.level },
    DIAMOND: { name: t('grade_diamond'), color: GRADE_STYLES.DIAMOND.color, level: GRADE_STYLES.DIAMOND.level },
    GOLD: { name: t('grade_gold'), color: GRADE_STYLES.GOLD.color, level: GRADE_STYLES.GOLD.level },
    SILVER: { name: t('grade_silver'), color: GRADE_STYLES.SILVER.color, level: GRADE_STYLES.SILVER.level },
    BRONZE: { name: t('grade_bronze'), color: GRADE_STYLES.BRONZE.color, level: GRADE_STYLES.BRONZE.level },
  };

  const PERMISSIONS: Permission[] = [
    // User Management
    { id: 'users_view', name: t('admin.perm_users_view'), description: t('admin.perm_users_view_desc'), category: 'admin.cat_userMgmt' },
    { id: 'users_edit', name: t('admin.perm_users_edit'), description: t('admin.perm_users_edit_desc'), category: 'admin.cat_userMgmt' },
    { id: 'users_grade', name: t('admin.perm_users_grade'), description: t('admin.perm_users_grade_desc'), category: 'admin.cat_userMgmt' },
    { id: 'users_ban', name: t('admin.perm_users_ban'), description: t('admin.perm_users_ban_desc'), category: 'admin.cat_userMgmt' },

    // Transaction Management
    { id: 'tx_view', name: t('admin.perm_tx_view'), description: t('admin.perm_tx_view_desc'), category: 'admin.cat_txMgmt' },
    { id: 'tx_cancel', name: t('admin.perm_tx_cancel'), description: t('admin.perm_tx_cancel_desc'), category: 'admin.cat_txMgmt' },
    { id: 'tx_release', name: t('admin.perm_tx_release'), description: t('admin.perm_tx_release_desc'), category: 'admin.cat_txMgmt' },
    { id: 'tx_refund', name: t('admin.perm_tx_refund'), description: t('admin.perm_tx_refund_desc'), category: 'admin.cat_txMgmt' },

    // Settlement Management
    { id: 'commission_view', name: t('admin.perm_commission_view'), description: t('admin.perm_commission_view_desc'), category: 'admin.cat_settlementMgmt' },
    { id: 'commission_edit', name: t('admin.perm_commission_edit'), description: t('admin.perm_commission_edit_desc'), category: 'admin.cat_settlementMgmt' },
    { id: 'withdraw_approve', name: t('admin.perm_withdraw_approve'), description: t('admin.perm_withdraw_approve_desc'), category: 'admin.cat_settlementMgmt' },
    { id: 'settlement', name: t('admin.perm_settlement'), description: t('admin.perm_settlement_desc'), category: 'admin.cat_settlementMgmt' },

    // Report Management
    { id: 'report_view', name: t('admin.perm_report_view'), description: t('admin.perm_report_view_desc'), category: 'admin.cat_reportMgmt' },
    { id: 'report_handle', name: t('admin.perm_report_handle'), description: t('admin.perm_report_handle_desc'), category: 'admin.cat_reportMgmt' },
    { id: 'dispute_resolve', name: t('admin.perm_dispute_resolve'), description: t('admin.perm_dispute_resolve_desc'), category: 'admin.cat_reportMgmt' },

    // System Management
    { id: 'settings_view', name: t('admin.perm_settings_view'), description: t('admin.perm_settings_view_desc'), category: 'admin.cat_systemMgmt' },
    { id: 'settings_edit', name: t('admin.perm_settings_edit'), description: t('admin.perm_settings_edit_desc'), category: 'admin.cat_systemMgmt' },
    { id: 'admin_create', name: t('admin.perm_admin_create'), description: t('admin.perm_admin_create_desc'), category: 'admin.cat_systemMgmt' },
    { id: 'admin_delete', name: t('admin.perm_admin_delete'), description: t('admin.perm_admin_delete_desc'), category: 'admin.cat_systemMgmt' },
  ];

  const [gradePermissions, setGradePermissions] = useState(initialPermissions);
  const [selectedGrade, setSelectedGrade] = useState<Grade>('CROWN');
  const [commissionRates, setCommissionRates] = useState(COMMISSION_RATES);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const categories = [...new Set(PERMISSIONS.map(p => p.category))];

  const togglePermission = (permissionId: string) => {
    if (selectedGrade === 'SUPER_ADMIN') return;

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
        <h1 className="text-2xl font-bold">{t('admin.permissions')}</h1>
        <p className="text-[var(--foreground-muted)]">{t('admin.permissionsDesc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Selection */}
        <div className="card p-4">
          <h2 className="font-semibold mb-4">{t('admin.selectGrade')}</h2>
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

          {/* Commission Rate Settings */}
          <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
            <h3 className="font-semibold mb-3">{t('admin.commissionDistribution')}</h3>
            <p className="text-xs text-[var(--foreground-muted)] mb-3">
              {t('admin.commissionDistDesc')}
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
              <span className="text-sm font-medium">{t('admin.totalCommissionRate')}</span>
              <span className="text-sm font-bold">
                {Object.entries(commissionRates)
                  .filter(([k]) => k !== 'SUPER_ADMIN')
                  .reduce((sum, [, v]) => sum + v, 0)
                  .toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Permission Settings */}
        <div className="lg:col-span-2 card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: GRADE_INFO[selectedGrade].color }}
                />
                {t('admin.gradePermissions', { grade: GRADE_INFO[selectedGrade].name })}
              </h2>
              <p className="text-sm text-[var(--foreground-muted)]">
                {selectedGrade === 'SUPER_ADMIN'
                  ? t('admin.superAdminAllPerms')
                  : t('admin.checkedPermsOnly')
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
                  {t(category)}
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

      {/* Save Button */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => {
            setGradePermissions(initialPermissions);
            setCommissionRates(COMMISSION_RATES);
          }}
          className="px-4 py-2 border border-[var(--border-color)] rounded-[var(--border-radius)] hover:bg-[var(--background-secondary)]"
        >
          {t('admin.reset')}
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius)] hover:opacity-90"
        >
          {t('admin.saveSettings')}
        </button>
      </div>

      {/* Save Complete Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[var(--border-radius)] text-center">
            <span className="text-4xl">✅</span>
            <p className="mt-2 font-medium">{t('admin.settingsSaved')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
