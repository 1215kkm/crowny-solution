import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MOCK_ENTERPRISES, MOCK_INVESTMENTS, MOCK_STATS, formatKRW, getStatusLabel, getStatusColor, getIndustryIcon } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">대시보드</h1>
          <p className="text-sm text-slate-500 mt-1">CROWNY 플랫폼 현황을 한눈에 확인하세요</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs text-slate-400 mb-1">활성 국가</p>
            <p className="text-2xl font-bold text-blue-600">{MOCK_STATS.totalCountries}</p>
            <p className="text-xs text-slate-400 mt-1">/ {MOCK_STATS.targetCountries} 목표</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs text-slate-400 mb-1">등록 기업</p>
            <p className="text-2xl font-bold text-indigo-600">{MOCK_STATS.totalEnterprises}</p>
            <p className="text-xs text-slate-400 mt-1">/ {MOCK_STATS.targetEnterprises} 목표</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs text-slate-400 mb-1">총 투자액</p>
            <p className="text-2xl font-bold text-emerald-600">{formatKRW(MOCK_STATS.totalInvestment)}</p>
            <p className="text-xs text-emerald-500 mt-1">+12.5% 전월 대비</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs text-slate-400 mb-1">총 기업가치</p>
            <p className="text-2xl font-bold text-cyan-600">{formatKRW(MOCK_STATS.totalValuation)}</p>
            <p className="text-xs text-cyan-500 mt-1">+8.3% 전월 대비</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Enterprise List */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">기업 현황</h2>
              <Link href="/enterprises" className="text-sm text-blue-600 hover:underline">전체 보기</Link>
            </div>
            <div className="space-y-3">
              {MOCK_ENTERPRISES.map((ent) => (
                <Link
                  key={ent.id}
                  href={`/enterprises/${ent.id}`}
                  className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-2 -mx-2 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getIndustryIcon(ent.industry.code)}</span>
                    <div>
                      <p className="font-medium text-slate-700 text-sm">{ent.name}</p>
                      <p className="text-xs text-slate-400">{ent.industry.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-slate-700">{formatKRW(ent.currentValuation)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(ent.status)}`}>
                      {getStatusLabel(ent.status)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Investments */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">최근 투자</h2>
            <div className="space-y-4">
              {MOCK_INVESTMENTS.map((inv) => (
                <div key={inv.id} className="pb-3 border-b border-slate-50 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{inv.userName}</p>
                      <p className="text-xs text-slate-400">{inv.enterpriseName}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{formatKRW(inv.amount)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-slate-400">{inv.date}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(inv.status)}`}>
                      {getStatusLabel(inv.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
