"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useTranslation } from "@/i18n";
import { MOCK_ENTERPRISES, formatKRW, getStatusLabel, getStatusColor, getIndustryIcon, getIndustryAurora } from "@/lib/mockData";

export default function EnterprisesPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");

  const TABS = [
    { label: t('site.ent_all'), code: "all" },
    { label: t('site.ent_finance'), code: "finance" },
    { label: t('site.ent_bio'), code: "bio" },
    { label: t('site.ent_energy'), code: "energy" },
    { label: t('site.ent_goods'), code: "goods" },
    { label: t('site.ent_aid'), code: "aid" },
  ];

  const filtered = activeTab === "all"
    ? MOCK_ENTERPRISES
    : MOCK_ENTERPRISES.filter((ent) => ent.industry.code === activeTab);

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{t('site.ent_title')}</h1>
            <p className="text-sm text-neutral-500 mt-1">{t('site.ent_count', { count: String(MOCK_ENTERPRISES.length) })}</p>
          </div>
          <Link
            href="/enterprises/new"
            className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-[3px] hover:bg-neutral-800 transition"
          >
            {t('site.ent_register')}
          </Link>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.code}
              onClick={() => setActiveTab(tab.code)}
              className={`px-4 py-1.5 text-sm rounded-[3px] transition ${
                activeTab === tab.code
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ent) => (
            <Link
              key={ent.id}
              href={`/enterprises/${ent.id}`}
              className="group bg-white rounded-[3px] border border-neutral-200 hover:border-neutral-400 transition-all overflow-hidden"
            >
              <div className="h-1 bg-neutral-900" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-[3px] bg-gradient-to-br ${getIndustryAurora(ent.industry.code)} flex items-center justify-center text-xs font-bold text-white`}>
                      {getIndustryIcon(ent.industry.code)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800 group-hover:text-neutral-600 transition">{ent.name}</h3>
                      <p className="text-xs text-neutral-400">{ent.industry.name} &middot; {ent.country.name}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-[3px] font-medium ${getStatusColor(ent.status)}`}>
                    {getStatusLabel(ent.status)}
                  </span>
                </div>

                <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{ent.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">{t('site.ent_valuation')}</span>
                    <span className="font-medium text-neutral-700">{formatKRW(ent.currentValuation)} / {formatKRW(ent.valuationTarget)}</span>
                  </div>
                  <div className="h-1.5 bg-neutral-100 rounded-[3px] overflow-hidden">
                    <div
                      className="h-full rounded-[3px] bg-neutral-700"
                      style={{ width: `${Math.min((ent.currentValuation / ent.valuationTarget) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-400 text-right">
                    {((ent.currentValuation / ent.valuationTarget) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-400 text-sm">{t('site.ent_noEnterprise')}</p>
          </div>
        )}
      </main>
    </>
  );
}
