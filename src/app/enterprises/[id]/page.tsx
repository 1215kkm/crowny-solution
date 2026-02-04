"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useTranslation } from "@/i18n";
import { MOCK_ENTERPRISES, MOCK_INVESTMENTS, formatKRW, getStatusLabel, getStatusColor, getIndustryIcon, getIndustryAurora } from "@/lib/mockData";

export default function EnterpriseDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const enterprise = MOCK_ENTERPRISES.find((e) => e.id === params.id);

  if (!enterprise) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-neutral-500">{t('site.entDetail_notFound')}</p>
          <Link href="/enterprises" className="text-neutral-700 underline mt-4 inline-block">{t('site.entDetail_backToList')}</Link>
        </div>
      </>
    );
  }

  const progress = (enterprise.currentValuation / enterprise.valuationTarget) * 100;
  const relatedInvestments = MOCK_INVESTMENTS.filter((inv) => inv.enterpriseName === enterprise.name);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
          <Link href="/enterprises" className="hover:text-neutral-700 transition">{t('site.entDetail_list')}</Link>
          <span>/</span>
          <span className="text-neutral-700">{enterprise.name}</span>
        </div>

        <div className="bg-white rounded-[3px] border border-neutral-200 overflow-hidden mb-6">
          <div className="h-1 bg-neutral-900" />
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[3px] bg-gradient-to-br ${getIndustryAurora(enterprise.industry.code)} flex items-center justify-center text-lg font-bold text-white`}>
                  {getIndustryIcon(enterprise.industry.code)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">{enterprise.name}</h1>
                  <p className="text-sm text-neutral-500 mt-1">{enterprise.industry.name} &middot; {enterprise.country.name} &middot; {enterprise.founded}{t('site.entDetail_founded')}</p>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-[3px] text-sm font-medium ${getStatusColor(enterprise.status)}`}>
                {getStatusLabel(enterprise.status)}
              </span>
            </div>
            <p className="text-neutral-600 mt-4 leading-relaxed">{enterprise.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-[3px] border border-neutral-200 p-6">
            <p className="text-sm text-neutral-400 mb-1">{t('site.entDetail_currentValuation')}</p>
            <p className="text-2xl font-bold text-neutral-900">{formatKRW(enterprise.currentValuation)}</p>
            <div className="mt-3">
              <div className="h-1.5 bg-neutral-100 rounded-[3px] overflow-hidden">
                <div className="h-full rounded-[3px] bg-neutral-700" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-neutral-400 mt-1">{t('site.entDetail_vsTarget', { percent: progress.toFixed(1) })}</p>
            </div>
          </div>
          <div className="bg-white rounded-[3px] border border-neutral-200 p-6">
            <p className="text-sm text-neutral-400 mb-1">{t('site.entDetail_targetValuation')}</p>
            <p className="text-2xl font-bold text-neutral-900">{formatKRW(enterprise.valuationTarget)}</p>
            <p className="text-xs text-neutral-400 mt-3">{t('site.entDetail_standardTarget')}</p>
          </div>
          <div className="bg-white rounded-[3px] border border-neutral-200 p-6">
            <p className="text-sm text-neutral-400 mb-1">{t('site.entDetail_employees')}</p>
            <p className="text-2xl font-bold text-neutral-900">{enterprise.employees}{t('site.entDetail_employeeSuffix')}</p>
            <p className="text-xs text-neutral-400 mt-3">{t('site.entDetail_ceo')} {enterprise.ceo}</p>
          </div>
        </div>

        <div className="bg-white rounded-[3px] border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">{t('site.entDetail_investments')}</h2>
          {relatedInvestments.length > 0 ? (
            <div className="space-y-3">
              {relatedInvestments.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                  <div>
                    <p className="font-medium text-neutral-700 text-sm">{inv.userName}</p>
                    <p className="text-xs text-neutral-400">{inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-800 text-sm">{formatKRW(inv.amount)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-[3px] ${getStatusColor(inv.status)}`}>
                      {getStatusLabel(inv.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-400 text-center py-6">{t('site.entDetail_noInvestments')}</p>
          )}
        </div>
      </main>
    </>
  );
}
