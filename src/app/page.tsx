"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-neutral-950 text-white relative overflow-hidden">
        {/* Aurora gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-blob-1 absolute -top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full blur-[100px] bg-cyan-500 opacity-30" />
          <div className="aurora-blob-2 absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-purple-500 opacity-30" />
          <div className="aurora-blob-3 absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full blur-[100px] bg-emerald-500 opacity-25" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center relative z-10">
          <ScrollReveal delay={0.1}>
            <div className="inline-block px-4 py-1.5 bg-neutral-800/80 border border-neutral-700 rounded-[3px] text-sm text-neutral-300 mb-6">
              153개국 &middot; 5대 산업 &middot; 글로벌 네트워크
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              전 세계를 하나로 연결하는<br />
              <span className="text-neutral-400">비즈니스 플랫폼</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              CROWNY는 153개국의 사업을 하나의 플랫폼에서 통합 관리하며,
              금융·바이오·에너지·재화·구호 5대 산업의 성장을 지원합니다.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
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
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section - CountUp */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ScrollReveal delay={0}>
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  <CountUp end={153} duration={2} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">목표 국가</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  <CountUp end={5} duration={1.5} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">핵심 산업</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  <CountUp end={1530} duration={2.5} suffix="억" />
                </p>
                <p className="text-sm text-neutral-500 mt-1">기업당 목표 가치</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  <CountUp end={23409} duration={2.5} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">목표 기업 수</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">5대 핵심 산업</h2>
              <p className="text-neutral-500">각 산업 분야에서 지속 가능한 성장을 추구합니다</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { code: "F", name: "금융", desc: "디지털 금융 혁신", aurora: "from-cyan-400/[0.3] via-neutral-900 to-neutral-900" },
              { code: "B", name: "바이오", desc: "생명공학 연구개발", aurora: "from-emerald-400/[0.3] via-neutral-900 to-neutral-900" },
              { code: "E", name: "에너지", desc: "친환경 에너지 전환", aurora: "from-purple-400/[0.3] via-neutral-900 to-neutral-900" },
              { code: "G", name: "재화", desc: "스마트 유통·물류", aurora: "from-blue-400/[0.3] via-neutral-900 to-neutral-900" },
              { code: "A", name: "구호", desc: "국제 구호·교육", aurora: "from-rose-400/[0.3] via-neutral-900 to-neutral-900" },
            ].map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.1}>
                <div className="bg-white rounded-[3px] p-6 border border-neutral-200 hover:border-neutral-400 transition-all h-full">
                  <div className={`w-10 h-10 rounded-[3px] bg-gradient-to-br ${ind.aurora} flex items-center justify-center text-sm font-bold text-white mb-4 aurora-icon`}>
                    {ind.code}
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-1">{ind.name}</h3>
                  <p className="text-sm text-neutral-500">{ind.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Crowna Coin Section */}
      <section className="bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-blob-2 absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-amber-500 opacity-25" />
          <div className="aurora-blob-3 absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full blur-[100px] bg-cyan-500 opacity-20" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-neutral-800/80 border border-neutral-700 rounded-[3px] text-sm text-amber-300 mb-4">Polygon Network</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">CROWNA 코인</h2>
              <p className="text-neutral-400">크라우니 네트워크의 기축 통화</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <ScrollReveal delay={0}>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-[3px] p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  <CountUp end={234} duration={2} suffix="억" />
                </p>
                <p className="text-xs text-neutral-400 mt-1">총 발행량</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-[3px] p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  <CountUp end={25500} duration={2} prefix="₩" />
                </p>
                <p className="text-xs text-neutral-400 mt-1">시작 가격 (10 PONE)</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-[3px] p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  <CountUp end={153000} duration={2.5} prefix="₩" />
                </p>
                <p className="text-xs text-neutral-400 mt-1">목표 통용 가격</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-[3px] p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-amber-300">7%+</p>
                <p className="text-xs text-neutral-400 mt-1">평균 가치 상승 목표</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "폴리곤 기반", desc: "빠르고 저렴한 트랜잭션 비용의 폴리곤 네트워크 위에서 운영됩니다", icon: "P" },
              { title: "크라우니 지갑", desc: "전용 지갑을 통해 안전하게 CROWNA를 보관하고 비즈니스에 활용합니다", icon: "W" },
              { title: "가치 관리", desc: "코인 소각 없이 크라우니가 보유·유통량을 직접 관리하여 안정적 가치를 유지합니다", icon: "V" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-[3px] p-6 h-full">
                  <div className="w-9 h-9 rounded-[3px] bg-gradient-to-br from-amber-400/[0.3] via-neutral-800 to-neutral-800 flex items-center justify-center text-sm font-bold text-white mb-3 aurora-icon">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-xs text-neutral-500 mt-8">
              중앙화 운영으로 시작 &middot; 크라우니 네트워크 비즈니스 전용 &middot; ₩25,500에서 ₩153,000 도달 시까지 내부 활성화
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">함께 성장할 파트너를 찾고 있습니다</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-neutral-500 mb-8">투자자, 사업가, 전문가 모두 CROWNY에서 시작하세요</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              href="/register"
              className="inline-block px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-[3px] hover:bg-neutral-800 transition"
            >
              무료로 시작하기
            </Link>
          </ScrollReveal>
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
