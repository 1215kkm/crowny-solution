import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <div className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm text-blue-200 mb-6">
            153개국 &middot; 5대 산업 &middot; 글로벌 네트워크
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            전 세계를 하나로 연결하는<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              비즈니스 플랫폼
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            CROWNY는 153개국의 사업을 하나의 플랫폼에서 통합 관리하며,
            금융·바이오·에너지·재화·구호 5대 산업의 성장을 지원합니다.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/enterprises"
              className="px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition shadow-lg"
            >
              기업 둘러보기
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">153</p>
              <p className="text-sm text-slate-500 mt-1">목표 국가</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">5</p>
              <p className="text-sm text-slate-500 mt-1">핵심 산업</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-600">1,530억</p>
              <p className="text-sm text-slate-500 mt-1">기업당 목표 가치</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">23,409</p>
              <p className="text-sm text-slate-500 mt-1">목표 기업 수</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">5대 핵심 산업</h2>
            <p className="text-slate-500">각 산업 분야에서 지속 가능한 성장을 추구합니다</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { icon: "💰", name: "금융", desc: "디지털 금융 혁신", color: "from-blue-500 to-indigo-600" },
              { icon: "🧬", name: "바이오", desc: "생명공학 연구개발", color: "from-green-500 to-teal-600" },
              { icon: "⚡", name: "에너지", desc: "친환경 에너지 전환", color: "from-yellow-500 to-orange-600" },
              { icon: "📦", name: "재화", desc: "스마트 유통·물류", color: "from-purple-500 to-pink-600" },
              { icon: "🤝", name: "구호", desc: "국제 구호·교육", color: "from-rose-500 to-red-600" },
            ].map((ind) => (
              <div key={ind.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.color} flex items-center justify-center text-xl mb-4`}>
                  {ind.icon}
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{ind.name}</h3>
                <p className="text-sm text-slate-500">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">함께 성장할 파트너를 찾고 있습니다</h2>
          <p className="text-slate-500 mb-8">투자자, 사업가, 전문가 모두 CROWNY에서 시작하세요</p>
          <Link
            href="/register"
            className="inline-block px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg transition"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-start leading-none">
              <span className="text-base font-black text-white tracking-tight">CROWNY</span>
              <span className="text-[8px] font-medium text-slate-500 tracking-[0.3em]">PRESENT</span>
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
