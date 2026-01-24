import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <div className="inline-block px-4 py-1.5 bg-neutral-800 border border-neutral-700 rounded-[3px] text-sm text-neutral-300 mb-6">
            153개국 &middot; 5대 산업 &middot; 글로벌 네트워크
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            전 세계를 하나로 연결하는<br />
            <span className="text-neutral-400">비즈니스 플랫폼</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            CROWNY는 153개국의 사업을 하나의 플랫폼에서 통합 관리하며,
            금융·바이오·에너지·재화·구호 5대 산업의 성장을 지원합니다.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/enterprises"
              className="px-8 py-3.5 bg-white text-neutral-900 font-semibold rounded-[3px] hover:bg-neutral-100 transition"
            >
              기업 둘러보기
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-neutral-600 text-white font-medium rounded-[3px] hover:bg-neutral-800 transition"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-neutral-900">153</p>
              <p className="text-sm text-neutral-500 mt-1">목표 국가</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-900">5</p>
              <p className="text-sm text-neutral-500 mt-1">핵심 산업</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-900">1,530억</p>
              <p className="text-sm text-neutral-500 mt-1">기업당 목표 가치</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-900">23,409</p>
              <p className="text-sm text-neutral-500 mt-1">목표 기업 수</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">5대 핵심 산업</h2>
            <p className="text-neutral-500">각 산업 분야에서 지속 가능한 성장을 추구합니다</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { code: "F", name: "금융", desc: "디지털 금융 혁신" },
              { code: "B", name: "바이오", desc: "생명공학 연구개발" },
              { code: "E", name: "에너지", desc: "친환경 에너지 전환" },
              { code: "G", name: "재화", desc: "스마트 유통·물류" },
              { code: "A", name: "구호", desc: "국제 구호·교육" },
            ].map((ind) => (
              <div key={ind.name} className="bg-white rounded-[3px] p-6 border border-neutral-200 hover:border-neutral-400 transition-all">
                <div className="w-10 h-10 rounded-[3px] bg-neutral-900 flex items-center justify-center text-sm font-bold text-white mb-4">
                  {ind.code}
                </div>
                <h3 className="font-semibold text-neutral-800 mb-1">{ind.name}</h3>
                <p className="text-sm text-neutral-500">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">함께 성장할 파트너를 찾고 있습니다</h2>
          <p className="text-neutral-500 mb-8">투자자, 사업가, 전문가 모두 CROWNY에서 시작하세요</p>
          <Link
            href="/register"
            className="inline-block px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-[3px] hover:bg-neutral-800 transition"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-500">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-start leading-none">
              <span className="text-base font-black text-white tracking-tight">CROWNY</span>
              <span className="text-[8px] font-medium text-neutral-600 tracking-[0.3em]">PRESENT</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/about" className="hover:text-white transition">소개</Link>
              <Link href="/enterprises" className="hover:text-white transition">기업</Link>
              <Link href="/dashboard" className="hover:text-white transition">대시보드</Link>
            </div>
            <p className="text-sm">&copy; 2026 CROWNY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
