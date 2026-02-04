'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n';

export default function DocsPage() {
  const { t } = useTranslation();

  const documents = [
    {
      id: 'marketplace-plan',
      title: t('site.docs_marketplacePlanTitle'),
      description: t('site.docs_marketplacePlanDesc'),
      version: '1.0',
      date: '2026-02-03',
      mdPath: '/api/docs/marketplace-plan',
      pdfPath: '/docs/marketplace-plan',
    },
  ];

  const handleDownloadMd = async (docId: string, title: string) => {
    try {
      const response = await fetch(`/api/docs/${docId}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.md`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(t('site.docs_downloadFailed'), error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border-color)]">
        <div className="max-w-4xl mx-auto px-[var(--spacing-md)] h-[var(--header-height)] flex items-center">
          <Link href="/" className="p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-[var(--text-body)] font-semibold ml-2">{t('site.docs_headerTitle')}</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-[var(--spacing-md)] py-[var(--spacing-xl)]">
        <div className="mb-[var(--spacing-xl)]">
          <h2 className="text-[var(--text-h2)] font-bold mb-2">{t('site.docs_title')}</h2>
          <p className="text-[var(--foreground-secondary)]">
            {t('site.docs_desc')}
          </p>
        </div>

        <div className="space-y-[var(--spacing-md)]">
          {documents.map((doc) => (
            <div key={doc.id} className="card p-[var(--spacing-lg)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-[var(--text-h4)] font-bold mb-1">{doc.title}</h3>
                  <p className="text-[var(--text-body-sm)] text-[var(--foreground-secondary)] mb-2">
                    {doc.description}
                  </p>
                  <div className="flex items-center gap-3 text-[var(--text-caption)] text-[var(--foreground-muted)]">
                    <span>{t('site.docs_version')} {doc.version}</span>
                    <span>|</span>
                    <span>{doc.date}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleDownloadMd(doc.id, doc.title)}
                    className="btn btn-outline"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    {t('site.docs_downloadMd')}
                  </button>
                  <Link href={doc.pdfPath} className="btn btn-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    {t('site.docs_viewPdf')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 안내 */}
        <div className="mt-[var(--spacing-xl)] p-[var(--spacing-lg)] bg-[var(--background-secondary)] rounded-[var(--border-radius)]">
          <h3 className="text-[var(--text-body)] font-semibold mb-2">{t('site.docs_pdfGuide')}</h3>
          <ol className="text-[var(--text-body-sm)] text-[var(--foreground-secondary)] space-y-1">
            <li>{t('site.docs_pdfStep1')}</li>
            <li>{t('site.docs_pdfStep2')}</li>
            <li>{t('site.docs_pdfStep3')}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
