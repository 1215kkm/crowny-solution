"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MOCK_ENTERPRISES, MOCK_INVESTMENTS, formatKRW, getStatusLabel, getStatusColor, getIndustryColor, getIndustryIcon } from "@/lib/mockData";

export default function EnterpriseDetailPage() {
  const params = useParams();
  const enterprise = MOCK_ENTERPRISES.find((e) => e.id === params.id);

  if (!enterprise) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-slate-500">기업을 찾을 수 없습니다.</p>
          <Link href="/enterprises" className="text-blue-600 hover:underline mt-4 inline-block">목록으로 돌아가기</Link>
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/enterprises" className="hover:text-blue-600 transition">기업 목록</Link>
          <span>/</span>
          <span className="text-slate-600">{enterprise.name}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
          <div className={`h-3 bg-gradient-to-r ${getIndustryColor(enterprise.industry.code)}`} />
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getIndustryColor(enterprise.industry.code)} flex items-center justify-center text-2xl`}>
                  {getIndustryIcon(enterprise.industry.code)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{enterprise.name}</h1>
                  <p className="text-sm text-slate-500 mt-1">{enterprise.industry.name} &middot; {enterprise.country.name} &middot; {enterprise.founded}년 설립</p>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(enterprise.status)}`}>
                {getStatusLabel(enterprise.status)}
              </span>
            </div>
            <p className="text-slate-600 mt-4 leading-relaxed">{enterprise.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <p className="text-sm text-slate-400 mb-1">현재 기업가치</p>
            <p className="text-2xl font-bold text-blue-600">{formatKRW(enterprise.currentValuation)}</p>
            <div className="mt-3">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${getIndustryColor(enterprise.industry.code)}`} style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1">목표 대비 {progress.toFixed(1)}%</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <p className="text-sm text-slate-400 mb-1">목표 가치</p>
            <p className="text-2xl font-bold text-slate-800">{formatKRW(enterprise.valuationTarget)}</p>
            <p className="text-xs text-slate-400 mt-3">CROWNY 표준 목표액</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <p className="text-sm text-slate-400 mb-1">임직원 수</p>
            <p className="text-2xl font-bold text-slate-800">{enterprise.employees}명</p>
            <p className="text-xs text-slate-400 mt-3">대표이사: {enterprise.ceo}</p>
          </div>
        </div>

        {/* Investment History */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">투자 내역</h2>
          {relatedInvestments.length > 0 ? (
            <div className="space-y-3">
              {relatedInvestments.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="font-medium text-slate-700 text-sm">{inv.userName}</p>
                    <p className="text-xs text-slate-400">{inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800 text-sm">{formatKRW(inv.amount)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(inv.status)}`}>
                      {getStatusLabel(inv.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-6">아직 투자 내역이 없습니다.</p>
          )}
        </div>
      </main>
    </>
  );
}
