'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/i18n';

const LOCALE_MAP: Record<string, string> = {
  ko: 'ko-KR', en: 'en-US', zh: 'zh-CN', ja: 'ja-JP', vi: 'vi-VN', th: 'th-TH',
};

interface Message {
  id: string;
  senderId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  isRead: boolean;
}

// 임시 데이터
const mockChatRoom = {
  id: 'chat1',
  product: {
    id: 'p1',
    title: '아이폰 15 Pro 256GB 블랙 풀박스',
    image: '',
    price: 15000,
    status: 'ACTIVE' as const,
  },
  partner: {
    id: 'u1',
    name: '크라운셀러',
    profileImage: '',
    isOnline: true,
  },
  isSeller: false,
};

const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'u1',
    content: '안녕하세요! 상품에 관심 가져주셔서 감사합니다.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isRead: true,
  },
  {
    id: 'm2',
    senderId: 'me',
    content: '네 안녕하세요! 혹시 네고 가능할까요?',
    createdAt: new Date(Date.now() - 3500000).toISOString(),
    isRead: true,
  },
  {
    id: 'm3',
    senderId: 'u1',
    content: '네 어느 정도 생각하고 계신가요?',
    createdAt: new Date(Date.now() - 3400000).toISOString(),
    isRead: true,
  },
  {
    id: 'm4',
    senderId: 'me',
    content: '14,000 CROWNY 가능할까요?',
    createdAt: new Date(Date.now() - 3300000).toISOString(),
    isRead: true,
  },
  {
    id: 'm5',
    senderId: 'u1',
    content: '14,500 CROWNY면 가능합니다!',
    createdAt: new Date(Date.now() - 3200000).toISOString(),
    isRead: true,
  },
  {
    id: 'm6',
    senderId: 'me',
    content: '좋아요! 그러면 언제 거래 가능하실까요?',
    createdAt: new Date(Date.now() - 600000).toISOString(),
    isRead: true,
  },
  {
    id: 'm7',
    senderId: 'u1',
    content: '네 직거래 가능합니다. 강남역에서 만나실 수 있을까요?',
    createdAt: new Date(Date.now() - 300000).toISOString(),
    isRead: false,
  },
];

export default function ChatRoomPage() {
  const { t, locale } = useTranslation();
  const intlLocale = LOCALE_MAP[locale] || 'en-US';

  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showProductAction, setShowProductAction] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(intlLocale, { hour: '2-digit', minute: '2-digit' });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(intlLocale).format(price);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: 'me',
      content: newMessage,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--background-secondary)]">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center px-[var(--spacing-md)] h-[var(--header-height)]">
          <Link href="/market/chat" className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex-1 ml-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{mockChatRoom.partner.name}</span>
              {mockChatRoom.partner.isOnline && (
                <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
              )}
            </div>
          </div>
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
        </div>

        {/* 상품 정보 바 */}
        <Link href={`/market/product/${mockChatRoom.product.id}`}>
          <div className="flex items-center gap-3 px-[var(--spacing-md)] py-[var(--spacing-sm)] bg-[var(--background-secondary)] border-b border-[var(--border-color)]">
            <div className="w-12 h-12 rounded-[var(--border-radius)] bg-[var(--background)] flex-shrink-0 overflow-hidden">
              {mockChatRoom.product.image ? (
                <Image
                  src={mockChatRoom.product.image}
                  alt={mockChatRoom.product.title}
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
            <div className="flex-1 min-w-0">
              <p className="text-[var(--text-body-sm)] line-clamp-1">{mockChatRoom.product.title}</p>
              <p className="text-[var(--text-body-sm)] font-bold">
                {formatPrice(mockChatRoom.product.price)} CROWNY
              </p>
            </div>
            {!mockChatRoom.isSeller && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowProductAction(true);
                }}
                className="btn btn-primary btn-sm"
              >
                {t('market.buyNow')}
              </button>
            )}
          </div>
        </Link>
      </header>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-[var(--spacing-md)]">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isMe = message.senderId === 'me';
            const showTime = index === messages.length - 1 ||
              messages[index + 1].senderId !== message.senderId ||
              new Date(messages[index + 1].createdAt).getTime() - new Date(message.createdAt).getTime() > 60000;

            return (
              <div
                key={message.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isMe ? 'order-2' : ''}`}>
                  <div
                    className={`px-[var(--spacing-md)] py-[var(--spacing-sm)] rounded-[var(--border-radius-lg)] ${
                      isMe
                        ? 'bg-[var(--primary)] text-white rounded-br-[var(--border-radius)]'
                        : 'bg-[var(--background)] rounded-bl-[var(--border-radius)]'
                    }`}
                  >
                    <p className="text-[var(--text-body-sm)] whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {showTime && (
                    <p className={`text-[var(--text-tiny)] text-[var(--foreground-muted)] mt-1 ${isMe ? 'text-right' : ''}`}>
                      {formatTime(message.createdAt)}
                      {isMe && message.isRead && <span className="ml-1">{t('market.messageRead')}</span>}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 입력창 */}
      <div className="sticky bottom-0 bg-[var(--background)] border-t border-[var(--border-color)] p-[var(--spacing-md)]">
        <div className="flex items-end gap-2">
          <button className="p-2 text-[var(--foreground-secondary)]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('market.enterMessage')}
              className="input resize-none min-h-[40px] max-h-[120px] py-2"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="btn btn-primary p-2 disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* 구매 액션 모달 */}
      {showProductAction && (
        <>
          <div className="overlay" onClick={() => setShowProductAction(false)} />
          <div className="modal p-[var(--spacing-lg)]">
            <h2 className="text-[var(--text-h4)] font-bold mb-[var(--spacing-md)]">{t('market.selectShippingMethod')}</h2>
            <div className="space-y-2">
              <Link
                href={`/market/order/${mockChatRoom.product.id}`}
                className="btn btn-primary btn-lg btn-full"
              >
                {t('market.buyNowDirect')}
              </Link>
              <button
                onClick={() => {
                  setShowProductAction(false);
                  setNewMessage(t('market.priceOffer'));
                }}
                className="btn btn-outline btn-lg btn-full"
              >
                {t('market.makeOffer')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
