'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DashboardIcon,
  SecurityIcon,
  GroupIcon,
  BadgeIcon,
  PaymentIcon,
  MoneyIcon,
  ReportIcon,
  InventoryIcon,
  SettingsIcon,
  MenuIcon,
} from '@/components/Icons';

// 현재 로그인한 관리자 (임시)
const currentAdmin = {
  id: 'admin1',
  name: '슈퍼관리자',
  email: 'super@crowny.com',
  grade: 'SUPER_ADMIN' as const,
};

const GRADE_PERMISSIONS = {
  SUPER_ADMIN: ['all'],
  CROWN: ['users', 'transactions', 'commissions', 'reports', 'sub_admins'],
  DIAMOND: ['users', 'transactions', 'commissions', 'reports'],
  GOLD: ['users', 'transactions', 'reports'],
  SILVER: ['transactions', 'reports'],
  BRONZE: ['reports'],
};

const MENU_ITEMS: { href: string; label: string; icon: ReactNode; permission: string }[] = [
  { href: '/market/admin', label: '대시보드', icon: <DashboardIcon className="w-5 h-5" />, permission: 'all' },
  { href: '/market/admin/permissions', label: '등급/권한 설정', icon: <SecurityIcon className="w-5 h-5" />, permission: 'all' },
  { href: '/market/admin/users', label: '회원 관리', icon: <GroupIcon className="w-5 h-5" />, permission: 'users' },
  { href: '/market/admin/sub-admins', label: '하위 관리자', icon: <BadgeIcon className="w-5 h-5" />, permission: 'sub_admins' },
  { href: '/market/admin/transactions', label: '거래 관리', icon: <PaymentIcon className="w-5 h-5" />, permission: 'transactions' },
  { href: '/market/admin/commissions', label: '수수료/정산', icon: <MoneyIcon className="w-5 h-5" />, permission: 'commissions' },
  { href: '/market/admin/reports', label: '신고/분쟁', icon: <ReportIcon className="w-5 h-5" />, permission: 'reports' },
  { href: '/market/admin/products', label: '상품 관리', icon: <InventoryIcon className="w-5 h-5" />, permission: 'all' },
  { href: '/market/admin/settings', label: '시스템 설정', icon: <SettingsIcon className="w-5 h-5" />, permission: 'all' },
];

const GRADE_COLORS: Record<string, string> = {
  SUPER_ADMIN: 'var(--grade-super-admin)',
  CROWN: 'var(--grade-crown)',
  DIAMOND: 'var(--grade-diamond)',
  GOLD: 'var(--grade-gold)',
  SILVER: 'var(--grade-silver)',
  BRONZE: 'var(--grade-bronze)',
};

const GRADE_NAMES: Record<string, string> = {
  SUPER_ADMIN: '슈퍼관리자',
  CROWN: 'CROWN',
  DIAMOND: 'DIAMOND',
  GOLD: 'GOLD',
  SILVER: 'SILVER',
  BRONZE: 'BRONZE',
};

function hasPermission(grade: keyof typeof GRADE_PERMISSIONS, permission: string): boolean {
  const permissions = GRADE_PERMISSIONS[grade];
  return permissions.includes('all') || permissions.includes(permission);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredMenu = MENU_ITEMS.filter(item =>
    hasPermission(currentAdmin.grade, item.permission)
  );

  return (
    <div className="min-h-screen bg-[var(--background-secondary)]">
      {/* 상단 헤더 */}
      <header className="bg-[var(--primary)] text-white h-14 flex items-center px-4 fixed top-0 left-0 right-0 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-[var(--border-radius)] mr-4"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        <Link href="/market/admin" className="flex items-center gap-2">
          <span className="font-bold text-lg">CROWNY</span>
          <span className="text-[var(--accent)] text-sm font-medium">ADMIN</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: GRADE_COLORS[currentAdmin.grade] }}
            />
            <span className="text-sm">{GRADE_NAMES[currentAdmin.grade]}</span>
          </div>
          <div className="text-sm">{currentAdmin.name}</div>
          <Link
            href="/market"
            className="text-sm px-3 py-1 bg-white/10 rounded-[var(--border-radius)] hover:bg-white/20"
          >
            마켓으로
          </Link>
        </div>
      </header>

      <div className="flex pt-14">
        {/* 사이드바 */}
        <aside
          className={`fixed left-0 top-14 bottom-0 bg-white border-r border-[var(--border-color)] transition-all duration-300 z-40 ${
            sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'
          }`}
        >
          <nav className="p-4">
            <ul className="space-y-1">
              {filteredMenu.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--border-radius)] transition-colors ${
                        isActive
                          ? 'bg-[var(--primary)] text-white'
                          : 'hover:bg-[var(--background-secondary)]'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 등급 안내 */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border-color)]">
            <p className="text-xs text-[var(--foreground-muted)] mb-2">등급 체계</p>
            <div className="space-y-1">
              {Object.entries(GRADE_NAMES).map(([key, name]) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: GRADE_COLORS[key] }}
                  />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-60' : 'ml-0'
          }`}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
