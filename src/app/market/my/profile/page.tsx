'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileEditPage() {
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('김크라운');
  const [email, setEmail] = useState('crown@example.com');
  const [phone, setPhone] = useState('010-1234-5678');
  const [bio, setBio] = useState('안녕하세요! CROWNY 마켓에서 활동하고 있습니다.');
  const [location, setLocation] = useState('서울 강남구');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // 저장 완료 후 뒤로가기
    window.history.back();
  };

  const handleImageChange = () => {
    // 실제로는 파일 선택 다이얼로그
    console.log('이미지 변경');
  };

  return (
    <div>
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between px-[var(--spacing-md)] h-[var(--header-height)]">
          <Link href="/market/my" className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <h1 className="text-[var(--text-body)] font-semibold">프로필 수정</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="text-[var(--text-body-sm)] font-medium text-[var(--primary)] disabled:opacity-50"
          >
            {isSaving ? '저장 중...' : '저장'}
          </button>
        </div>
      </header>

      <div className="market-container py-[var(--spacing-lg)]">
        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center mb-[var(--spacing-xl)]">
          <div className="relative mb-[var(--spacing-md)]">
            <div className="w-24 h-24 rounded-full bg-[var(--background-secondary)] flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="프로필"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <svg className="w-12 h-12 text-[var(--foreground-muted)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <button
              onClick={handleImageChange}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleImageChange}
            className="text-[var(--text-body-sm)] text-[var(--primary)]"
          >
            사진 변경
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-[var(--spacing-lg)]">
          {/* 닉네임 */}
          <div>
            <label className="block text-[var(--text-body-sm)] font-medium mb-2">
              닉네임 <span className="text-[var(--error)]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="input"
              maxLength={20}
            />
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mt-1">
              2~20자 이내로 입력해주세요
            </p>
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-[var(--text-body-sm)] font-medium mb-2">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="input"
              disabled
            />
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mt-1">
              이메일은 변경할 수 없습니다
            </p>
          </div>

          {/* 휴대폰 */}
          <div>
            <label className="block text-[var(--text-body-sm)] font-medium mb-2">
              휴대폰 번호
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="휴대폰 번호"
                className="input flex-1"
              />
              <button className="btn btn-outline">
                인증
              </button>
            </div>
          </div>

          {/* 소개 */}
          <div>
            <label className="block text-[var(--text-body-sm)] font-medium mb-2">
              소개
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개를 입력하세요"
              className="input min-h-[100px] resize-none"
              maxLength={200}
            />
            <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mt-1 text-right">
              {bio.length}/200
            </p>
          </div>

          {/* 위치 */}
          <div>
            <label className="block text-[var(--text-body-sm)] font-medium mb-2">
              거래 희망 지역
            </label>
            <button className="input text-left flex items-center justify-between w-full">
              <span>{location || '지역을 선택하세요'}</span>
              <svg className="w-5 h-5 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 계정 관리 */}
        <div className="mt-[var(--spacing-2xl)] pt-[var(--spacing-lg)] border-t border-[var(--border-color)]">
          <h3 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-md)]">계정 관리</h3>
          <div className="space-y-[var(--spacing-sm)]">
            <button className="w-full text-left p-[var(--spacing-md)] hover:bg-[var(--background-secondary)] rounded-[var(--border-radius)] transition-colors">
              <span className="text-[var(--text-body-sm)]">비밀번호 변경</span>
            </button>
            <button className="w-full text-left p-[var(--spacing-md)] hover:bg-[var(--background-secondary)] rounded-[var(--border-radius)] transition-colors">
              <span className="text-[var(--text-body-sm)] text-[var(--error)]">회원 탈퇴</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
