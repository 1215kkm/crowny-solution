import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="bg-neutral-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">CROWNY를 소개합니다</h1>
          <p className="text-lg text-neutral-400">153개국을 연결하는 글로벌 비즈니스 생태계</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-[3px]">미션</div>
              <h2 className="text-2xl font-bold text-neutral-900">전 세계의 사업을 하나로 연결하여<br/>공동 번영을 실현합니다</h2>
              <p className="text-neutral-600 leading-relaxed">
                CROWNY는 각 국가의 산업 역량을 결집하고, 국경을 초월한 비즈니스 네트워크를 구축하여
                모든 참여자가 함께 성장할 수 있는 플랫폼을 제공합니다.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-[3px]">비전</div>
              <h2 className="text-2xl font-bold text-neutral-900">2030년까지<br/>153개국 완전 연결</h2>
              <p className="text-neutral-600 leading-relaxed">
                금융, 바이오, 에너지, 재화, 구호 5대 산업을 축으로 각 국가에 153개 기업을 육성하고,
                기업당 1,530억 원의 가치를 창출하는 것이 우리의 비전입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">핵심 가치</h2>
            <p className="text-neutral-500">CROWNY의 모든 결정은 이 가치를 기반으로 합니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "투명성", desc: "모든 자본 흐름과 사업 현황을 실시간으로 투명하게 공개합니다.", icon: "T" },
              { title: "지속가능성", desc: "단기 이익이 아닌 장기적 가치 창출과 사회적 영향을 추구합니다.", icon: "S" },
              { title: "글로벌 협력", desc: "국경을 넘어 각국의 강점을 결합하여 시너지를 극대화합니다.", icon: "G" },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-[3px] p-8 border border-neutral-200">
                <div className="w-10 h-10 rounded-[3px] bg-neutral-900 flex items-center justify-center text-sm font-bold text-white mb-4">{v.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">로드맵</h2>
            <p className="text-neutral-500">단계적으로 글로벌 네트워크를 확장합니다</p>
          </div>
          <div className="space-y-6">
            {[
              { phase: "Phase 1", period: "2026 상반기", title: "MVP 런칭", desc: "한국 1개국, 5개 기업으로 플랫폼 검증", status: "진행 중" },
              { phase: "Phase 2", period: "2026 하반기", title: "아시아 확장", desc: "일본, 베트남 등 아시아 5개국 확대", status: "예정" },
              { phase: "Phase 3", period: "2027", title: "글로벌 확장", desc: "유럽·북미 주요국 진출 및 투자 시스템 고도화", status: "예정" },
              { phase: "Phase 4", period: "2028~2029", title: "전 대륙 커버리지", desc: "아프리카, 남미 포함 100개국 달성", status: "예정" },
              { phase: "Phase 5", period: "2030", title: "153개국 완성", desc: "전 세계 153개국 네트워크 완성 및 자율 운영 체제 구축", status: "예정" },
            ].map((item, i) => (
              <div key={item.phase} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-[3px] flex items-center justify-center text-sm font-bold ${i === 0 ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"}`}>
                    {i + 1}
                  </div>
                  {i < 4 && <div className="w-0.5 h-12 bg-neutral-200 mt-2" />}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-neutral-400">{item.period}</span>
                    {i === 0 && <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-[3px] font-medium">{item.status}</span>}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">조직 구조</h2>
            <p className="text-neutral-500">7단계 역할 체계로 효율적인 글로벌 운영</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { level: "L0", role: "글로벌 관리자", desc: "전체 플랫폼 총괄" },
              { level: "L1", role: "국가 관리자", desc: "해당 국가 사업 관리" },
              { level: "L2", role: "산업 관리자", desc: "산업별 전략 수립" },
              { level: "L3", role: "기업 관리자", desc: "개별 기업 운영" },
              { level: "L4", role: "사업가", desc: "실질적 사업 수행" },
              { level: "L5", role: "영업 담당", desc: "시장 개척 및 영업" },
              { level: "L6", role: "투자자", desc: "자본 투자 및 성장 참여" },
            ].map((item) => (
              <div key={item.level} className="bg-white rounded-[3px] p-5 border border-neutral-200">
                <div className="text-xs font-mono text-neutral-500 mb-1">{item.level}</div>
                <h4 className="font-semibold text-neutral-900 text-sm">{item.role}</h4>
                <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">지금 CROWNY와 함께하세요</h2>
          <p className="text-neutral-400 mb-8">글로벌 비즈니스의 새로운 기준을 만들어갑니다</p>
          <Link
            href="/register"
            className="inline-block px-8 py-3.5 bg-white text-neutral-900 font-semibold rounded-[3px] hover:bg-neutral-100 transition"
          >
            파트너 등록
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-500 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2026 CROWNY. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
