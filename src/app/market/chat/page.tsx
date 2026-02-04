'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/i18n';

const LOCALE_MAP: Record<string, string> = {
  ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH',
};

// 임시 채팅방 데이터
const mockChatRooms = [
  {
    id: '1',
    product: {
      id: 'p1',
      title: '아이폰 15 Pro 256GB 블랙 풀박스',
      image: '',
      price: 15000,
    },
    partner: {
      id: 'u1',
      name: '판매자A',
      profileImage: '',
    },
    lastMessage: {
      content: '네 직거래 가능합니다. 강남역에서 만나실 수 있을까요?',
      createdAt: new Date(Date.now() - 600000).toISOString(),
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: '2',
    product: {
      id: 'p2',
      title: '맥북 프로 14인치 M3 Pro',
      image: '',
      price: 32000,
    },
    partner: {
      id: 'u2',
      name: '크라운셀러',
      profileImage: '',
    },
    lastMessage: {
      content: '감사합니다. 입금 확인되면 바로 발송해드릴게요!',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: '3',
    product: {
      id: 'p3',
      title: '나이키 에어맥스 270 새상품',
      image: '',
      price: 800,
    },
    partner: {
      id: 'u3',
      name: '구매자B',
      profileImage: '',
    },
    lastMessage: {
      content: '사이즈가 어떻게 되나요?',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      isRead: true,
    },
    unreadCount: 0,
  },
];

export default function ChatListPage() {
  const { t, locale } = useTranslation();
  const intlLocale = LOCALE_MAP[locale] || 'en-US';

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t('market.time_just');
    if (minutes < 60) return t('market.time_minutesAgo', { count: String(minutes) });
    if (hours < 24) return t('market.time_hoursAgo', { count: String(hours) });
    if (days < 7) return t('market.time_daysAgo', { count: String(days) });
    return date.toLocaleDateString(intlLocale);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(intlLocale).format(price);
  };

  return (
    <div>
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between px-[var(--spacing-md)] h-[var(--header-height)]">
          <h1 className="text-[var(--text-h4)] font-bold">{t('chat')}</h1>
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
        </div>
      </header>

      {/* 채팅 목록 */}
      <div className="market-container">
        {mockChatRooms.length > 0 ? (
          <div>
            {mockChatRooms.map((room) => (
              <Link
                key={room.id}
                href={`/market/chat/${room.id}`}
                className="flex gap-3 p-[var(--spacing-md)] border-b border-[var(--border-color)] hover:bg-[var(--background-secondary)] transition-colors"
              >
                {/* 상품 이미지 */}
                <div className="w-12 h-12 rounded-[var(--border-radius)] bg-[var(--background-secondary)] flex-shrink-0 overflow-hidden">
                  {room.product.image ? (
                    <Image
                      src={room.product.image}
                      alt={room.product.title}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* 채팅 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-[var(--text-body-sm)]">{room.partner.name}</span>
                    <span className="text-[var(--text-caption)] text-[var(--foreground-muted)]">
                      {formatTime(room.lastMessage.createdAt)}
                    </span>
                  </div>
                  <p className="text-[var(--text-body-sm)] text-[var(--foreground-secondary)] line-clamp-1 mb-1">
                    {room.lastMessage.content}
                  </p>
                  <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] line-clamp-1">
                    {room.product.title} · {formatPrice(room.product.price)} CROWNY
                  </p>
                </div>

                {/* 읽지 않은 메시지 */}
                {room.unreadCount > 0 && (
                  <div className="flex-shrink-0 self-center">
                    <span className="w-5 h-5 flex items-center justify-center bg-[var(--error)] text-white text-[var(--text-tiny)] font-bold rounded-full">
                      {room.unreadCount}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state py-20">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <p className="text-[var(--text-body)] mb-1">{t('market.noChatHistory')}</p>
            <p className="text-[var(--text-body-sm)] text-[var(--foreground-muted)]">
              {t('market.trySendChat')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
