'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/i18n';
import {
  PhoneIcon,
  StyleIcon,
  HomeIcon,
  CarIcon,
  BookIcon,
  GamepadIcon,
  ChildIcon,
  SportsIcon,
  PetsIcon,
  GiftIcon,
} from '@/components/Icons';

const categories: { id: string; labelKey: string; icon: ReactNode }[] = [
  { id: 'digital', labelKey: 'market.cat_digital_full', icon: <PhoneIcon className="w-5 h-5" /> },
  { id: 'fashion', labelKey: 'market.cat_fashion_full', icon: <StyleIcon className="w-5 h-5" /> },
  { id: 'furniture', labelKey: 'market.cat_furniture_full', icon: <HomeIcon className="w-5 h-5" /> },
  { id: 'car', labelKey: 'market.cat_car_full', icon: <CarIcon className="w-5 h-5" /> },
  { id: 'book', labelKey: 'market.cat_book_full', icon: <BookIcon className="w-5 h-5" /> },
  { id: 'game', labelKey: 'market.cat_game_full', icon: <GamepadIcon className="w-5 h-5" /> },
  { id: 'baby', labelKey: 'market.cat_baby_full', icon: <ChildIcon className="w-5 h-5" /> },
  { id: 'sports', labelKey: 'market.cat_sports_full', icon: <SportsIcon className="w-5 h-5" /> },
  { id: 'pet', labelKey: 'market.cat_pet_full', icon: <PetsIcon className="w-5 h-5" /> },
  { id: 'etc', labelKey: 'market.cat_etc_full', icon: <GiftIcon className="w-5 h-5" /> },
];

const conditions = [
  { id: 'NEW', labelKey: 'market.condition_new', descKey: 'market.condition_new_desc' },
  { id: 'LIKE_NEW', labelKey: 'market.condition_likeNew', descKey: 'market.condition_likeNew_desc' },
  { id: 'GOOD', labelKey: 'market.condition_good', descKey: 'market.condition_good_desc' },
  { id: 'FAIR', labelKey: 'market.condition_fair', descKey: 'market.condition_fair_desc' },
];

const shippingOptions = [
  { id: 'DIRECT', labelKey: 'market.shipping_direct' },
  { id: 'DELIVERY', labelKey: 'market.shipping_delivery' },
  { id: 'BOTH', labelKey: 'market.shipping_both' },
];

export default function SellPage() {
  const { t } = useTranslation();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [description, setDescription] = useState('');
  const [shippingType, setShippingType] = useState('BOTH');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleImageUpload = () => {
    // 실제로는 파일 업로드 처리
    // 임시로 빈 이미지 추가
    if (images.length < 10) {
      setImages([...images, '']);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const selectedCategory = categories.find((c) => c.id === category);

  return (
    <div className="pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between px-[var(--spacing-md)] h-[var(--header-height)]">
          <Link href="/market" className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <h1 className="text-[var(--text-body)] font-semibold">{t('market.sellProduct')}</h1>
          <button className="text-[var(--text-body-sm)] text-[var(--foreground-muted)]">
            {t('market.draftSave')}
          </button>
        </div>
      </header>

      <div className="market-container py-[var(--spacing-md)]">
        {/* 이미지 업로드 */}
        <div className="mb-[var(--spacing-lg)]">
          <label className="block text-[var(--text-body-sm)] font-medium mb-2">
            {t('market.productImages')} ({images.length}/10)
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {/* 업로드 버튼 */}
            <button
              onClick={handleImageUpload}
              className="w-20 h-20 flex-shrink-0 border-2 border-dashed border-[var(--border-color)] rounded-[var(--border-radius)] flex flex-col items-center justify-center text-[var(--foreground-muted)] hover:border-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
            >
              <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
              <span className="text-[var(--text-tiny)]">{t('market.photos')}</span>
            </button>

            {/* 업로드된 이미지 */}
            {images.map((img, index) => (
              <div key={index} className="relative w-20 h-20 flex-shrink-0">
                <div className="w-full h-full bg-[var(--background-secondary)] rounded-[var(--border-radius)] overflow-hidden">
                  {img ? (
                    <Image src={img} alt="" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--foreground)] text-white rounded-full flex items-center justify-center"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 text-[var(--text-tiny)] bg-[var(--primary)] text-white px-1.5 py-0.5 rounded-[var(--border-radius)]">
                    {t('market.mainPhoto')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div className="mb-[var(--spacing-md)]">
          <label className="block text-[var(--text-body-sm)] font-medium mb-2">
            {t('market.productTitle')} <span className="text-[var(--error)]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('market.productTitlePlaceholder')}
            className="input"
            maxLength={100}
          />
          <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mt-1 text-right">
            {title.length}/100
          </p>
        </div>

        {/* 카테고리 */}
        <div className="mb-[var(--spacing-md)]">
          <label className="block text-[var(--text-body-sm)] font-medium mb-2">
            {t('market.category')} <span className="text-[var(--error)]">*</span>
          </label>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="input text-left flex items-center justify-between"
          >
            {selectedCategory ? (
              <span>
                {selectedCategory.icon} {t(selectedCategory.labelKey)}
              </span>
            ) : (
              <span className="text-[var(--foreground-muted)]">{t('market.selectCategory')}</span>
            )}
            <svg className="w-5 h-5 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* 상품 상태 */}
        <div className="mb-[var(--spacing-md)]">
          <label className="block text-[var(--text-body-sm)] font-medium mb-2">
            {t('market.condition')} <span className="text-[var(--error)]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {conditions.map((c) => (
              <button
                key={c.id}
                onClick={() => setCondition(c.id)}
                className={`p-3 border rounded-[var(--border-radius)] text-left transition-colors ${
                  condition === c.id
                    ? 'border-[var(--primary)] bg-[var(--background-secondary)]'
                    : 'border-[var(--border-color)] hover:border-[var(--border-color-strong)]'
                }`}
              >
                <p className="text-[var(--text-body-sm)] font-medium">{t(c.labelKey)}</p>
                <p className="text-[var(--text-caption)] text-[var(--foreground-muted)]">{t(c.descKey)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 가격 */}
        <div className="mb-[var(--spacing-md)]">
          <label className="block text-[var(--text-body-sm)] font-medium mb-2">
            {t('market.price')} <span className="text-[var(--error)]">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="input pr-24"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-secondary)]">
              CROWNY
            </span>
          </div>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={negotiable}
              onChange={(e) => setNegotiable(e.target.checked)}
              className="w-4 h-4 rounded-[var(--border-radius)] border-[var(--border-color)]"
            />
            <span className="text-[var(--text-body-sm)]">{t('market.acceptOffers')}</span>
          </label>
        </div>

        {/* 설명 */}
        <div className="mb-[var(--spacing-md)]">
          <label className="block text-[var(--text-body-sm)] font-medium mb-2">
            {t('market.description')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('market.descriptionPlaceholder')}
            className="input min-h-[150px] resize-none"
            maxLength={5000}
          />
          <p className="text-[var(--text-caption)] text-[var(--foreground-muted)] mt-1 text-right">
            {description.length}/5000
          </p>
        </div>

        {/* 거래 방법 */}
        <div className="mb-[var(--spacing-md)]">
          <label className="block text-[var(--text-body-sm)] font-medium mb-2">
            {t('market.shippingType')} <span className="text-[var(--error)]">*</span>
          </label>
          <div className="flex gap-2">
            {shippingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setShippingType(option.id)}
                className={`flex-1 py-2 px-3 border rounded-[var(--border-radius)] text-[var(--text-body-sm)] transition-colors ${
                  shippingType === option.id
                    ? 'border-[var(--primary)] bg-[var(--background-secondary)] font-medium'
                    : 'border-[var(--border-color)] hover:border-[var(--border-color-strong)]'
                }`}
              >
                {t(option.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border-color)] p-[var(--spacing-md)] z-40">
        <button
          className="btn btn-primary btn-lg btn-full"
          disabled={!title || !category || !condition || !price}
        >
          {t('market.register')}
        </button>
      </div>

      {/* 카테고리 모달 */}
      {showCategoryModal && (
        <>
          <div className="overlay" onClick={() => setShowCategoryModal(false)} />
          <div className="modal p-[var(--spacing-md)]">
            <div className="flex items-center justify-between mb-[var(--spacing-md)]">
              <h2 className="text-[var(--text-h4)] font-bold">{t('market.selectCategory')}</h2>
              <button onClick={() => setShowCategoryModal(false)} className="p-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id);
                    setShowCategoryModal(false);
                  }}
                  className={`p-4 border rounded-[var(--border-radius)] text-left transition-colors ${
                    category === c.id
                      ? 'border-[var(--primary)] bg-[var(--background-secondary)]'
                      : 'border-[var(--border-color)] hover:border-[var(--border-color-strong)]'
                  }`}
                >
                  <span className="mb-2 block text-[var(--foreground-secondary)]">{c.icon}</span>
                  <span className="text-[var(--text-body-sm)]">{t(c.labelKey)}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
