"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";

const CATEGORIES = [
  { id: "business", name: "Business & Wealth", desc: "매출 직접 견인형", color: "from-amber-400/[0.3]" },
  { id: "tech", name: "Tech & Innovation", desc: "기술 브랜딩형", color: "from-cyan-400/[0.3]" },
  { id: "art", name: "Art & Culture", desc: "팬덤/감성 브랜딩형", color: "from-purple-400/[0.3]" },
  { id: "global", name: "Global & Social Impact", desc: "사회공헌/확장형", color: "from-emerald-400/[0.3]" },
];

const PROJECTS = [
  // Category A: Business & Wealth
  { id: "P1", category: "business", name: "매튜쇼", subtitle: "The Outliers", manager: "매튜", desc: "기술·금융 전문 인터뷰쇼", value: "전문가 신뢰도", revenue: "기업 파트너십 및 B2B 솔루션 홍보", featured: true },
  { id: "P5", category: "business", name: "이분일억", subtitle: "2-Min Challenge", manager: "한선", desc: "프랍 트레이딩의 극강 효율 리얼리티", value: "금융 수익화", revenue: "유료 멤버십 및 투자 교육 솔루션" },
  // Category B: Tech & Innovation
  { id: "P6", category: "tech", name: "무엇이든 만들어드립니다", subtitle: "3D Maker", manager: "선우", desc: "3D 프린팅 기술 커스텀 제작소", value: "기술 시각화", revenue: "인터엠 제조 역량 증명" },
  { id: "P12", category: "tech", name: "교회의 신", subtitle: "Church Tech", manager: "선경", desc: "교회 음향/영상 환경 구축 A to Z", value: "공간 솔루션", revenue: "인터엠 AV 시스템 패키지 판매" },
  // Category C: Art & Culture
  { id: "P3", category: "art", name: "워너비", subtitle: "Wannabe", manager: "은우", desc: "배달 노동자에서 글로벌 아티스트로", value: "언더독 서사", revenue: "팬덤 형성 및 IP 확장" },
  { id: "P7", category: "art", name: "옆집 감독님과 영화제작", subtitle: "Film Journey", manager: "영경", desc: "시나리오부터 OTT 진출까지", value: "창작 과정 공개", revenue: "콘텐츠 IP 및 OTT 진출" },
  { id: "P10", category: "art", name: "그림을 그려봅시다", subtitle: "Art Studio", manager: "민정", desc: "비구상 작가 데뷔 과정", value: "심미적 가치", revenue: "아트북/전시회 수익" },
  { id: "P11", category: "art", name: "검도의 신", subtitle: "Kendo Mind", manager: "승원", desc: "마인드셋과 무도를 결합한 K-검도", value: "자기계발", revenue: "브랜드 진정성 강화" },
  // Category D: Global & Social Impact
  { id: "P4", category: "global", name: "크라우니", subtitle: "Crowny Beauty", manager: "선경", desc: "마스크팩으로 글로벌 기업 만들기", value: "글로벌 스킨케어", revenue: "마스크팩 판매 및 글로벌 유통망" },
  { id: "P8", category: "global", name: "마더 원", subtitle: "Mother One", manager: "김원희", desc: "열악한 환경 소녀에게 마스크팩 전달", value: "선한 영향력", revenue: "기부 브랜딩" },
  { id: "P9", category: "global", name: "굿뉴스", subtitle: "Good News", manager: "조성목", desc: "실리콘밸리 인재들과의 대화", value: "비전 공유", revenue: "네트워크 확장" },
  { id: "P2", category: "global", name: "너나와", subtitle: "Find You", manager: "마이클", desc: "탑쌓기 게임으로 잃어버린 인연 찾기", value: "감동 코드", revenue: "휴먼 다큐 IP" },
];

const MATTHEW_GUESTS = [
  { name: "마이클", topic: "2분에 1억 버는 방법" },
  { name: "전혜진", topic: "4만명에게 30분씩 일시키기" },
  { name: "근후", topic: "1년만에 반도체칩 설계자 되기" },
  { name: "영경", topic: "깜짝 연기자가 되는 45회 플랜" },
  { name: "한선", topic: "교회 메인반주하는 7단계 방법" },
  { name: "은우", topic: "SNS 3종 16콤보 K-pop아티스트 되기" },
  { name: "선우", topic: "3D프린터로 100만원짜리 부품 만들기" },
  { name: "매튜", topic: "근무시간에 방송해도 되는 일잘러 되기" },
];

export default function TVPage() {
  const [activeTab, setActiveTab] = useState("business");

  const filteredProjects = PROJECTS.filter((p) => p.category === activeTab);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-blob-1 absolute -top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full blur-[100px] bg-rose-500 opacity-30" />
          <div className="aurora-blob-2 absolute -bottom-[10%] -right-[5%] w-[45%] h-[45%] rounded-full blur-[100px] bg-amber-500 opacity-25" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-block px-3 py-1 bg-neutral-800/80 border border-neutral-700 rounded-[3px] text-sm text-rose-300 mb-4">2026 - 2027</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">CROWNY TV</h1>
              <p className="text-neutral-400 text-lg">&ldquo;전문성을 넘어, 가치를 증명하는 사람들&rdquo;</p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold"><CountUp end={12} duration={1.5} /></p>
                <p className="text-xs text-neutral-400 mt-1">프로젝트</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold"><CountUp end={84} duration={2} /></p>
                <p className="text-xs text-neutral-400 mt-1">에피소드</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-rose-300">5%+</p>
                <p className="text-xs text-neutral-400 mt-1">수익 목표</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Links */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2">
              <a href="#projects" className="px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-[3px] text-sm hover:bg-neutral-700 transition">프로젝트</a>
              <a href="#matthew" className="px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-[3px] text-sm hover:bg-neutral-700 transition">매튜쇼</a>
              <a href="#benefits" className="px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-[3px] text-sm hover:bg-neutral-700 transition">기대효과</a>
              <a href="#rewards" className="px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-[3px] text-sm hover:bg-neutral-700 transition">참여혜택</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section with Tabs */}
      <section id="projects" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">4 Pillars</h2>
              <p className="text-neutral-500">전략적 콘텐츠 분류</p>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2.5 rounded-[3px] text-sm font-medium transition-all ${
                    activeTab === cat.id
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Category Description */}
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-sm text-neutral-500">
                {CATEGORIES.find((c) => c.id === activeTab)?.desc}
              </p>
            </div>
          </ScrollReveal>

          {/* Project Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <div className="bg-white rounded-[3px] border border-neutral-200 p-6 hover:border-neutral-400 transition-all h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-mono text-neutral-400">{project.id}</span>
                      <h3 className="text-lg font-bold text-neutral-900">{project.name}</h3>
                      <p className="text-sm text-neutral-500">{project.subtitle}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-[3px] bg-gradient-to-br ${CATEGORIES.find((c) => c.id === project.category)?.color} via-neutral-900 to-neutral-900 flex items-center justify-center text-xs font-bold text-white aurora-icon`}>
                      {project.id.replace("P", "")}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-[3px]">담당: {project.manager}</span>
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-[3px]">{project.value}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Matthew Show Section */}
      <section id="matthew" className="bg-neutral-50 py-20 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-xs font-mono text-neutral-400">FEATURED PROJECT</span>
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">매튜쇼: The Outliers</h2>
              <p className="text-neutral-500">기술·금융·업무 관련 전문 인터뷰쇼</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MATTHEW_GUESTS.map((guest, i) => (
              <ScrollReveal key={guest.name} delay={i * 0.08}>
                <div className="bg-white rounded-[3px] border border-neutral-200 p-4 h-full">
                  <p className="font-semibold text-neutral-900 text-sm mb-1">{guest.name}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{guest.topic}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <p className="text-center text-xs text-neutral-400 mt-6">
              전문적 이미지 유지 · 아웃라이어 컨텐츠 · 7회 초과 시 몰입도 상승
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">기대 효과</h2>
              <p className="text-neutral-500">CROWNY TV가 만들어갈 가치</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "브랜드 자산 가치 상승", desc: "단순 채널을 넘어 하나의 '미디어 하우스'로 등극", icon: "B" },
              { title: "수익 구조 다각화", desc: "제조(인터엠), 뷰티(크라우니), 콘텐츠(유튜브), 금융의 융합 수익", icon: "R" },
              { title: "글로벌 네트워크 형성", desc: "실리콘밸리부터 개발도상국까지 아우르는 글로벌 벨트 구축", icon: "G" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="bg-neutral-50 rounded-[3px] p-6 border border-neutral-200 h-full">
                  <div className="w-10 h-10 rounded-[3px] bg-gradient-to-br from-rose-400/[0.3] via-neutral-900 to-neutral-900 flex items-center justify-center text-sm font-bold text-white mb-4 aurora-icon">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="bg-neutral-950 text-white py-16 scroll-mt-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-blob-3 absolute -top-[10%] left-[20%] w-[40%] h-[50%] rounded-full blur-[100px] bg-amber-500 opacity-25" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-3">참여 혜택</h2>
            <p className="text-neutral-400 mb-6">시청자 참여 시 특별 선물을 드립니다</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="inline-flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-neutral-800/80 border border-neutral-700 rounded-[3px] text-sm">인터랙트 제품</span>
              <span className="px-4 py-2 bg-neutral-800/80 border border-neutral-700 rounded-[3px] text-sm">크라우니 마스크팩</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xs text-neutral-500 mt-6">
              2027년 9월 30일까지 · 프로젝트별 7회 방영 목표
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-500 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-start leading-none">
              <span className="text-base font-black text-white tracking-tight">CROWNY</span>
              <span className="text-[8px] font-medium text-neutral-600 tracking-[0.3em]">PRESENT</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-white transition">홈</Link>
              <Link href="/about" className="hover:text-white transition">소개</Link>
              <Link href="/enterprises" className="hover:text-white transition">기업</Link>
            </div>
            <p className="text-sm">&copy; 2026 CROWNY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
