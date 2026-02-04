'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard, { Product } from '@/components/market/ProductCard';
import { useTranslation } from '@/i18n';

const popularKeywords = [
  '아이폰', '갤럭시', '맥북', '에어팟', '닌텐도',
  '나이키', '아디다스', '이케아', '다이슨', '캠핑',
];

const recentSearches = [
  '아이폰 15',
  '맥북 프로 M3',
  '에어팟 프로',
];

// 임시 검색 결과
const mockResults: Product[] = [
  {
    id: '1',
    title: '아이폰 15 Pro 256GB 블랙 풀박스',
    price: 15000,
    images: ['https://picsum.photos/seed/iphone15/400/400'],
    location: '서울 강남구',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likeCount: 12,
    chatCount: 3,
    status: 'ACTIVE',
  },
  {
    id: '2',
    title: '아이폰 14 Pro 128GB 실버',
    price: 11000,
    images: ['https://picsum.photos/seed/iphone14/400/400'],
    location: '서울 서초구',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    likeCount: 8,
    chatCount: 2,
    status: 'ACTIVE',
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearched(true);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    setIsSearched(true);
  };

  return (
    <div>
      {/* 검색 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <form onSubmit={handleSearch} className="flex items-center gap-2 px-[var(--spacing-md)] h-[var(--header-height)]">
          <Link href="/market" className="p-2 -ml-2 md:hidden">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('market.searchPlaceholder')}
              className="w-full py-2 pl-10 pr-4 text-sm bg-neutral-100 border border-transparent rounded-[3px] focus:border-neutral-900 focus:bg-white outline-none transition"
              autoFocus
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsSearched(false);
              }}
              className="p-2 text-[var(--foreground-secondary)]"
            >
              {t('cancel')}
            </button>
          )}
        </form>
      </header>

      <div className="market-container py-[var(--spacing-md)]">
        {!isSearched ? (
          <>
            {/* 최근 검색어 */}
            {recentSearches.length > 0 && (
              <div className="mb-[var(--spacing-lg)]">
                <div className="flex items-center justify-between mb-[var(--spacing-sm)]">
                  <h2 className="text-[var(--text-body-sm)] font-semibold">{t('market.recentSearch')}</h2>
                  <button className="text-[var(--text-caption)] text-[var(--foreground-muted)]">
                    {t('deleteAll')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleKeywordClick(keyword)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[var(--background-secondary)] rounded-[var(--border-radius-full)] text-[var(--text-body-sm)]"
                    >
                      {keyword}
                      <svg className="w-4 h-4 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 인기 검색어 */}
            <div>
              <h2 className="text-[var(--text-body-sm)] font-semibold mb-[var(--spacing-sm)]">{t('market.popularSearch')}</h2>
              <div className="flex flex-wrap gap-2">
                {popularKeywords.map((keyword, index) => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordClick(keyword)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-color)] rounded-[var(--border-radius-full)] text-[var(--text-body-sm)] hover:bg-[var(--background-secondary)]"
                  >
                    <span className="text-[var(--text-caption)] text-[var(--accent)] font-medium">
                      {index + 1}
                    </span>
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 검색 결과 */}
            <div className="flex items-center justify-between mb-[var(--spacing-md)]">
              <p className="text-[var(--text-body-sm)] text-[var(--foreground-secondary)]">
                {t('market.searchResult', { query, count: String(mockResults.length) })}
              </p>
              <button className="text-[var(--text-body-sm)] text-[var(--foreground-secondary)] flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                {t('filter')}
              </button>
            </div>

            {mockResults.length > 0 ? (
              <div className="product-grid">
                {mockResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <p className="text-[var(--text-body)]">{t('market.noSearchResult')}</p>
                <p className="text-[var(--text-body-sm)] text-[var(--foreground-muted)]">
                  {t('market.tryOtherKeyword')}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
