'use client';

import Link from 'next/link';
import Image from 'next/image';

// 임시 사용자 데이터
const mockUser = {
  id: 'user1',
  name: '김크라운',
  email: 'crown@example.com',
  profileImage: '',
  grade: 'SILVER' as const,
  rating: 4.5,
  reviewCount: 8,
  wallet: {
    balance: 12500,
    pendingBalance: 2000,
  },
  sponsor: {
    name: '박골드',
    grade: 'GOLD' as const,
  },
  subordinateCount: 3,
  thisMonthCommission: 150,
};

const gradeInfo = {
  SUPER_ADMIN: { label: '슈퍼관리자', color: 'bg-purple-600', textColor: 'text-white' },
  CROWN: { label: '크라운', color: 'bg-amber-400', textColor: 'text-neutral-900' },
  DIAMOND: { label: '다이아몬드', color: 'bg-cyan-500', textColor: 'text-white' },
  GOLD: { label: '골드', color: 'bg-amber-500', textColor: 'text-neutral-900' },
  SILVER: { label: '실버', color: 'bg-neutral-400', textColor: 'text-white' },
  BRONZE: { label: '브론즈', color: 'bg-orange-600', textColor: 'text-white' },
};

const menuItems = [
  {
    title: '거래',
    items: [
      { label: '판매 내역', href: '/market/my/sales', icon: '📦' },
      { label: '구매 내역', href: '/market/my/purchases', icon: '🛒' },
      { label: '관심 목록', href: '/market/my/likes', icon: '❤️' },
    ],
  },
  {
    title: '수익',
    items: [
      { label: '수수료 내역', href: '/market/my/commissions', icon: '💰' },
      { label: '내 추천 회원', href: '/market/my/referrals', icon: '👥' },
    ],
  },
  {
    title: '설정',
    items: [
      { label: '프로필 수정', href: '/market/my/profile', icon: '✏️' },
      { label: '알림 설정', href: '/market/my/notifications', icon: '🔔' },
      { label: '고객센터', href: '/market/my/support', icon: '💬' },
      { label: '설정', href: '/market/my/settings', icon: '⚙️' },
    ],
  },
];

export default function MyPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const currentGrade = gradeInfo[mockUser.grade];

  return (
    <div className="pb-6">
      {/* 헤더 - 다크 테마 */}
      <header className="sticky top-0 z-30 bg-neutral-950 border-b border-neutral-800 md:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-bold text-white">MY</h1>
          <button className="p-2 text-neutral-400 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* 프로필 섹션 */}
        <div className="py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[3px] bg-neutral-200 flex items-center justify-center">
              {mockUser.profileImage ? (
                <Image
                  src={mockUser.profileImage}
                  alt={mockUser.name}
                  width={64}
                  height={64}
                  className="rounded-[3px]"
                />
              ) : (
                <svg className="w-8 h-8 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-neutral-900">{mockUser.name}</h2>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-[3px] ${currentGrade.color} ${currentGrade.textColor}`}>
                  {currentGrade.label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{mockUser.rating}</span>
                </div>
                <span>·</span>
                <span>리뷰 {mockUser.reviewCount}</span>
              </div>
            </div>
            <Link
              href="/market/my/profile"
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-[3px] hover:bg-neutral-100 transition"
            >
              편집
            </Link>
          </div>

          {/* 추천인 정보 */}
          <div className="mt-4 p-3 bg-neutral-100 rounded-[3px] text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">내 추천인</span>
              <span className="font-medium text-neutral-700">
                {mockUser.sponsor.name}
                <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] rounded-[3px] ${gradeInfo[mockUser.sponsor.grade].color} ${gradeInfo[mockUser.sponsor.grade].textColor}`}>
                  {gradeInfo[mockUser.sponsor.grade].label}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 지갑 카드 - Aurora 스타일 */}
        <Link href="/market/my/wallet" className="block mb-6">
          <div className="relative overflow-hidden bg-neutral-950 rounded-[3px] p-5">
            {/* Aurora 효과 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="aurora-blob-1 absolute -top-[30%] -left-[10%] w-[60%] h-[120%] rounded-full blur-[80px] bg-amber-500 opacity-20" />
              <div className="aurora-blob-2 absolute -bottom-[30%] -right-[10%] w-[50%] h-[100%] rounded-full blur-[80px] bg-cyan-500 opacity-15" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                  </svg>
                  <span className="text-white font-medium">내 지갑</span>
                </div>
                <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <div className="mb-4">
                <p className="text-xs text-neutral-400 mb-1">사용 가능</p>
                <p className="text-3xl font-bold text-white">
                  {formatPrice(mockUser.wallet.balance)}
                  <span className="text-sm text-amber-400 ml-2">CROWNY</span>
                </p>
              </div>
              {mockUser.wallet.pendingBalance > 0 && (
                <p className="text-xs text-neutral-400 mb-4">
                  거래 중: {formatPrice(mockUser.wallet.pendingBalance)} CROWNY
                </p>
              )}
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-[3px] transition">
                  충전
                </button>
                <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-[3px] transition">
                  출금
                </button>
                <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-[3px] transition">
                  송금
                </button>
              </div>
            </div>
          </div>
        </Link>

        {/* 수수료 수익 */}
        <div className="bg-white border border-neutral-200 rounded-[3px] p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 mb-1">이번 달 수수료 수익</p>
              <p className="text-xl font-bold text-neutral-900">
                {formatPrice(mockUser.thisMonthCommission)}
                <span className="text-sm text-neutral-500 ml-1">CROWNY</span>
              </p>
            </div>
            <Link
              href="/market/my/commissions"
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-[3px] hover:bg-neutral-100 transition"
            >
              상세보기
            </Link>
          </div>
          <div className="h-px bg-neutral-200 my-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">내 추천 회원</span>
            <Link href="/market/my/referrals" className="flex items-center gap-1 font-medium text-neutral-700 hover:text-neutral-900">
              {mockUser.subordinateCount}명
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 메뉴 목록 */}
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs text-neutral-400 font-medium mb-2 px-1">
              {section.title}
            </h3>
            <div className="bg-white border border-neutral-200 rounded-[3px] overflow-hidden">
              {section.items.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-4 hover:bg-neutral-50 transition ${
                    index !== section.items.length - 1 ? 'border-b border-neutral-100' : ''
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1 text-sm text-neutral-700">{item.label}</span>
                  <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* 로그아웃 */}
        <button className="w-full py-3 border border-neutral-300 text-red-600 font-medium rounded-[3px] hover:bg-red-50 transition">
          로그아웃
        </button>
      </div>
    </div>
  );
}
