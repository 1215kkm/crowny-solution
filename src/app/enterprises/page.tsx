import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MOCK_ENTERPRISES, formatKRW, getStatusLabel, getStatusColor, getIndustryColor, getIndustryIcon } from "@/lib/mockData";

export default function EnterprisesPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">등록 기업</h1>
            <p className="text-sm text-slate-500 mt-1">현재 {MOCK_ENTERPRISES.length}개 기업이 등록되어 있습니다</p>
          </div>
          <Link
            href="/enterprises/new"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-sm transition"
          >
            + 기업 등록
          </Link>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full">전체</button>
          {["금융", "바이오", "에너지", "재화", "구호"].map((ind) => (
            <button key={ind} className="px-4 py-1.5 bg-white text-slate-600 text-sm rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition">
              {ind}
            </button>
          ))}
        </div>

        {/* Enterprise Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_ENTERPRISES.map((ent) => (
            <Link
              key={ent.id}
              href={`/enterprises/${ent.id}`}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden"
            >
              {/* Card Header */}
              <div className={`h-2 bg-gradient-to-r ${getIndustryColor(ent.industry.code)}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getIndustryColor(ent.industry.code)} flex items-center justify-center text-lg`}>
                      {getIndustryIcon(ent.industry.code)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition">{ent.name}</h3>
                      <p className="text-xs text-slate-400">{ent.industry.name} &middot; {ent.country.name}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(ent.status)}`}>
                    {getStatusLabel(ent.status)}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{ent.description}</p>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">기업가치</span>
                    <span className="font-medium text-slate-600">{formatKRW(ent.currentValuation)} / {formatKRW(ent.valuationTarget)}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getIndustryColor(ent.industry.code)}`}
                      style={{ width: `${Math.min((ent.currentValuation / ent.valuationTarget) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 text-right">
                    달성률 {((ent.currentValuation / ent.valuationTarget) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
