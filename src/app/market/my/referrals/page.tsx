'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation, type Locale } from '@/i18n';

type MarketGrade = 'SUPER_ADMIN' | 'CROWN' | 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE';

interface Member {
  id: string;
  name: string;
  profileImage: string;
  grade: MarketGrade;
  joinedAt: string;
  totalSales: number;
  subordinateCount: number;
}

// 임시 데이터
const mockSponsor: Member = {
  id: 'sponsor1',
  name: '박골드',
  profileImage: '',
  grade: 'GOLD',
  joinedAt: '2025-01-15',
  totalSales: 125000,
  subordinateCount: 12,
};

const mockSubordinates: Member[] = [
  {
    id: 'sub1',
    name: '김브론즈',
    profileImage: '',
    grade: 'BRONZE',
    joinedAt: '2026-01-20',
    totalSales: 5000,
    subordinateCount: 0,
  },
  {
    id: 'sub2',
    name: '이실버',
    profileImage: '',
    grade: 'SILVER',
    joinedAt: '2026-01-25',
    totalSales: 15000,
    subordinateCount: 2,
  },
  {
    id: 'sub3',
    name: '박브론즈',
    profileImage: '',
    grade: 'BRONZE',
    joinedAt: '2026-02-01',
    totalSales: 0,
    subordinateCount: 0,
  },
];

const LOCALE_MAP: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  zh: 'zh-CN',
  ja: 'ja-JP',
  vi: 'vi-VN',
  th: 'th-TH',
};

export default function ReferralsPage() {
  const { t, locale } = useTranslation();

  const gradeInfo: Record<MarketGrade, { label: string; color: string }> = {
    SUPER_ADMIN: { label: t('grade_super_admin'), color: 'bg-[var(--grade-super-admin)]' },
    CROWN: { label: t('grade_crown'), color: 'bg-[var(--grade-crown)] text-[var(--foreground)]' },
    DIAMOND: { label: t('grade_diamond'), color: 'bg-[var(--grade-diamond)]' },
    GOLD: { label: t('grade_gold'), color: 'bg-[var(--grade-gold)] text-[var(--foreground)]' },
    SILVER: { label: t('grade_silver'), color: 'bg-[var(--grade-silver)]' },
    BRONZE: { label: t('grade_bronze'), color: 'bg-[var(--grade-bronze)]' },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(LOCALE_MAP[locale]).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(LOCALE_MAP[locale], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const MemberCard = ({ member, label }: { member: Member; label?: string }) => (
    <div className="card p-[var(--spacing-md)]">
      {label && (
        <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mb-2">{label}</p>
      )}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[var(--background-secondary)] flex items-center justify-center flex-shrink-0">
          {member.profileImage ? (
            <Image
              src={member.profileImage}
              alt={member.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <svg className="w-6 h-6 text-[var(--foreground-muted)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{member.name}</span>
            <span className={`badge text-white text-[var(--text-tiny)] ${gradeInfo[member.grade].color}`}>
              {gradeInfo[member.grade].label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[var(--text-caption)] text-[var(--foreground-muted)]">
            <span>{t('market.joined')}: {formatDate(member.joinedAt)}</span>
            <span>·</span>
            <span>{t('market.trade')}: {formatPrice(member.totalSales)} CROWNY</span>
          </div>
        </div>
        {member.subordinateCount > 0 && (
          <div className="text-right">
            <p className="text-[var(--text-body-sm)] font-medium">{t('market.members', { count: String(member.subordinateCount) })}</p>
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)]">{t('market.subordinate')}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between px-[var(--spacing-md)] h-[var(--header-height)]">
          <div className="flex items-center">
            <Link href="/market/my" className="p-2 -ml-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>
            <h1 className="text-[var(--text-body)] font-semibold ml-2">{t('market.myReferrals')}</h1>
          </div>
          <button className="btn btn-primary btn-sm">
            {t('market.invite')}
          </button>
        </div>
      </header>

      <div className="market-container py-[var(--spacing-md)]">
        {/* 조직도 시각화 */}
        <div className="card p-[var(--spacing-lg)] mb-[var(--spacing-lg)] text-center">
          <h2 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-md)]">{t('market.myOrgStructure')}</h2>

          {/* 트리 구조 */}
          <div className="relative">
            {/* 추천인 */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--background-secondary)] rounded-[var(--border-radius-full)]">
                <span className={`badge text-white text-[var(--text-tiny)] ${gradeInfo[mockSponsor.grade].color}`}>
                  {gradeInfo[mockSponsor.grade].label}
                </span>
                <span className="text-[var(--text-body-sm)] font-medium">{mockSponsor.name}</span>
              </div>
              <div className="w-px h-6 bg-[var(--border-color)] mx-auto" />
            </div>

            {/* 나 */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--border-radius-full)]">
                <span className="badge bg-white/20 text-white text-[var(--text-tiny)]">{t('grade_silver')}</span>
                <span className="text-[var(--text-body-sm)] font-medium">{t('market.me')}</span>
              </div>
              {mockSubordinates.length > 0 && (
                <div className="w-px h-6 bg-[var(--border-color)] mx-auto" />
              )}
            </div>

            {/* 산하 회원 */}
            {mockSubordinates.length > 0 && (
              <div className="flex justify-center gap-4 flex-wrap">
                {mockSubordinates.map((sub) => (
                  <div key={sub.id} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--background-secondary)] rounded-[var(--border-radius-full)]">
                    <span className={`badge text-white text-[var(--text-tiny)] ${gradeInfo[sub.grade].color}`}>
                      {gradeInfo[sub.grade].label}
                    </span>
                    <span className="text-[var(--text-caption)]">{sub.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 내 추천인 */}
        <div className="mb-[var(--spacing-lg)]">
          <h2 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-sm)]">{t('market.mySponsor')}</h2>
          <MemberCard member={mockSponsor} />
        </div>

        {/* 산하 회원 */}
        <div>
          <div className="flex items-center justify-between mb-[var(--spacing-sm)]">
            <h2 className="text-[var(--text-body-sm)] font-semibold">
              {t('market.myReferralMembers')}
              <span className="text-[var(--foreground-muted)] ml-1">({t('market.members', { count: String(mockSubordinates.length) })})</span>
            </h2>
          </div>

          {mockSubordinates.length > 0 ? (
            <div className="space-y-[var(--spacing-sm)]">
              {mockSubordinates.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="empty-state py-12">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <p className="text-[var(--text-body-sm)] mb-2">{t('market.noReferrals')}</p>
              <button className="btn btn-primary">
                {t('market.inviteFriends')}
              </button>
            </div>
          )}
        </div>

        {/* 초대 링크 */}
        <div className="card p-[var(--spacing-md)] mt-[var(--spacing-lg)]">
          <h3 className="text-[var(--text-body-sm)] font-semibold mb-2">{t('market.myInviteLink')}</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value="https://crowny.market/join?ref=abc123"
              readOnly
              className="input flex-1 text-[var(--text-caption)] font-mono bg-[var(--background-secondary)]"
            />
            <button className="btn btn-primary">
              {t('market.copy')}
            </button>
          </div>
          <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mt-2">
            {t('market.inviteLinkDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}
