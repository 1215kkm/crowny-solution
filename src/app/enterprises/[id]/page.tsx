import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MOCK_ENTERPRISES, MOCK_INVESTMENTS, formatKRW, getStatusLabel, getStatusColor, getIndustryIcon, getIndustryAurora } from "@/lib/mockData";

export function generateStaticParams() {
  return MOCK_ENTERPRISES.map((ent) => ({ id: ent.id }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EnterpriseDetailPage(props: any) {
  const params = await Promise.resolve(props.params);
  const id = params?.id;
  const enterprise = MOCK_ENTERPRISES.find((e) => e.id === id);

  if (!enterprise) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-neutral-500">기업을 찾을 수 없습니다.</p>
          <Link href="/enterprises" className="text-neutral-700 underline mt-4 inline-block">목록으로 돌아가기</Link>
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
          <Link href="/enterprises" className="hover:text-neutral-700 transition">기업 목록</Link>
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
                  <p className="text-sm text-neutral-500 mt-1">{enterprise.industry.name} &middot; {enterprise.country.name} &middot; {enterprise.founded}년 설립</p>
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
            <p className="text-sm text-neutral-400 mb-1">현재 기업가치</p>
            <p className="text-2xl font-bold text-neutral-900">{formatKRW(enterprise.currentValuation)}</p>
            <div className="mt-3">
              <div className="h-1.5 bg-neutral-100 rounded-[3px] overflow-hidden">
                <div className="h-full rounded-[3px] bg-neutral-700" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-neutral-400 mt-1">목표 대비 {progress.toFixed(1)}%</p>
            </div>
          </div>
          <div className="bg-white rounded-[3px] border border-neutral-200 p-6">
            <p className="text-sm text-neutral-400 mb-1">목표 가치</p>
            <p className="text-2xl font-bold text-neutral-900">{formatKRW(enterprise.valuationTarget)}</p>
            <p className="text-xs text-neutral-400 mt-3">CROWNY 표준 목표액</p>
          </div>
          <div className="bg-white rounded-[3px] border border-neutral-200 p-6">
            <p className="text-sm text-neutral-400 mb-1">임직원 수</p>
            <p className="text-2xl font-bold text-neutral-900">{enterprise.employees}명</p>
            <p className="text-xs text-neutral-400 mt-3">대표이사: {enterprise.ceo}</p>
          </div>
        </div>

        <div className="bg-white rounded-[3px] border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">투자 내역</h2>
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
            <p className="text-sm text-neutral-400 text-center py-6">아직 투자 내역이 없습니다.</p>
          )}
        </div>
      </main>
    </>
  );
}
