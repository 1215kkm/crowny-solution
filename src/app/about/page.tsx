"use client";

import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslation } from "@/i18n";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useTranslation();

  const coreValues = [
    { title: t('site.about_transparency'), desc: t('site.about_transparencyDesc'), icon: "T", aurora: "from-cyan-400/[0.3] via-neutral-900 to-neutral-900" },
    { title: t('site.about_sustainability'), desc: t('site.about_sustainabilityDesc'), icon: "S", aurora: "from-emerald-400/[0.3] via-neutral-900 to-neutral-900" },
    { title: t('site.about_globalCoop'), desc: t('site.about_globalCoopDesc'), icon: "G", aurora: "from-purple-400/[0.3] via-neutral-900 to-neutral-900" },
  ];

  const roadmapItems = [
    { phase: "Phase 1", period: t('site.about_phase1Period'), title: t('site.about_phase1Title'), desc: t('site.about_phase1Desc'), status: t('site.about_phase1Status') },
    { phase: "Phase 2", period: t('site.about_phase2Period'), title: t('site.about_phase2Title'), desc: t('site.about_phase2Desc'), status: t('site.about_phaseScheduled') },
    { phase: "Phase 3", period: t('site.about_phase3Period'), title: t('site.about_phase3Title'), desc: t('site.about_phase3Desc'), status: t('site.about_phaseScheduled') },
    { phase: "Phase 4", period: t('site.about_phase4Period'), title: t('site.about_phase4Title'), desc: t('site.about_phase4Desc'), status: t('site.about_phaseScheduled') },
    { phase: "Phase 5", period: t('site.about_phase5Period'), title: t('site.about_phase5Title'), desc: t('site.about_phase5Desc'), status: t('site.about_phaseScheduled') },
  ];

  const orgItems = [
    { level: "L0", role: t('site.about_orgL0'), desc: t('site.about_orgL0Desc') },
    { level: "L1", role: t('site.about_orgL1'), desc: t('site.about_orgL1Desc') },
    { level: "L2", role: t('site.about_orgL2'), desc: t('site.about_orgL2Desc') },
    { level: "L3", role: t('site.about_orgL3'), desc: t('site.about_orgL3Desc') },
    { level: "L4", role: t('site.about_orgL4'), desc: t('site.about_orgL4Desc') },
    { level: "L5", role: t('site.about_orgL5'), desc: t('site.about_orgL5Desc') },
    { level: "L6", role: t('site.about_orgL6'), desc: t('site.about_orgL6Desc') },
  ];

  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="bg-neutral-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-blob-1 absolute -top-[10%] -right-[5%] w-[50%] h-[60%] rounded-full blur-[100px] bg-purple-500 opacity-30" />
          <div className="aurora-blob-2 absolute -bottom-[10%] -left-[5%] w-[40%] h-[50%] rounded-full blur-[100px] bg-cyan-500 opacity-30" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal delay={0.1}>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t('site.about_heroTitle')}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-neutral-400">{t('site.about_heroDesc')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-[3px]">{t('site.about_mission')}</div>
                <h2 className="text-2xl font-bold text-neutral-900">{t('site.about_missionTitle').split('\n').reduce<React.ReactNode[]>((acc, line, i, arr) => {
                  acc.push(line);
                  if (i < arr.length - 1) acc.push(<br key={i} />);
                  return acc;
                }, [])}</h2>
                <p className="text-neutral-600 leading-relaxed">
                  {t('site.about_missionDesc')}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-[3px]">{t('site.about_vision')}</div>
                <h2 className="text-2xl font-bold text-neutral-900">{t('site.about_visionTitle').split('\n').reduce<React.ReactNode[]>((acc, line, i, arr) => {
                  acc.push(line);
                  if (i < arr.length - 1) acc.push(<br key={i} />);
                  return acc;
                }, [])}</h2>
                <p className="text-neutral-600 leading-relaxed">
                  {t('site.about_visionDesc')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">{t('site.about_coreValues')}</h2>
              <p className="text-neutral-500">{t('site.about_coreValuesDesc')}</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-white rounded-[3px] p-8 border border-neutral-200 h-full">
                  <div className={`w-10 h-10 rounded-[3px] bg-gradient-to-br ${v.aurora} flex items-center justify-center text-sm font-bold text-white mb-4 aurora-icon`}>{v.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Token Economy */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">{t('site.about_tokenEconomy')}</h2>
              <p className="text-neutral-500">{t('site.about_tokenEconomyDesc')}</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-neutral-900">{t('site.about_crownaCoin')}</h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                    <span>{t('site.about_coinFeature1', { amount: '234억' })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                    <span>{t('site.about_coinFeature2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                    <span>{t('site.about_coinFeature3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                    <span>{t('site.about_coinFeature4')}</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-neutral-900">{t('site.about_valueSystem')}</h3>
                <div className="space-y-3">
                  <div className="bg-neutral-50 rounded-[3px] p-4 border border-neutral-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-neutral-700">{t('site.about_startPriceLabel')}</span>
                      <span className="text-sm font-bold text-neutral-900">{t('site.about_startPriceValue')}</span>
                    </div>
                    <div className="h-1.5 bg-neutral-200 rounded-[3px] overflow-hidden">
                      <div className="h-full bg-neutral-400 rounded-[3px]" style={{width: "16.7%"}} />
                    </div>
                  </div>
                  <div className="bg-neutral-50 rounded-[3px] p-4 border border-neutral-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-neutral-700">{t('site.about_targetPriceLabel')}</span>
                      <span className="text-sm font-bold text-neutral-900">{t('site.about_targetPriceValue')}</span>
                    </div>
                    <div className="h-1.5 bg-neutral-200 rounded-[3px] overflow-hidden">
                      <div className="h-full bg-neutral-700 rounded-[3px]" style={{width: "100%"}} />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500">{t('site.about_priceNote')}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">{t('site.about_roadmap')}</h2>
              <p className="text-neutral-500">{t('site.about_roadmapDesc')}</p>
            </div>
          </ScrollReveal>
          <div className="space-y-6">
            {roadmapItems.map((item, i) => (
              <ScrollReveal key={item.phase} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-[3px] flex items-center justify-center text-sm font-bold ${i === 0 ? "bg-gradient-to-br from-cyan-400/[0.3] via-neutral-900 to-neutral-900 text-white aurora-icon" : "bg-neutral-200 text-neutral-500"}`}>
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Organization */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">{t('site.about_orgTitle')}</h2>
              <p className="text-neutral-500">{t('site.about_orgDesc')}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {orgItems.map((item, i) => (
              <ScrollReveal key={item.level} delay={i * 0.08}>
                <div className="bg-white rounded-[3px] p-5 border border-neutral-200 h-full">
                  <div className="text-xs font-mono text-neutral-500 mb-1">{item.level}</div>
                  <h4 className="font-semibold text-neutral-900 text-sm">{item.role}</h4>
                  <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-blob-2 absolute -top-[10%] left-[10%] w-[45%] h-[60%] rounded-full blur-[100px] bg-purple-500 opacity-25" />
          <div className="aurora-blob-1 absolute -bottom-[10%] right-[5%] w-[40%] h-[50%] rounded-full blur-[100px] bg-cyan-500 opacity-25" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-4">{t('site.about_ctaTitle')}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-neutral-400 mb-8">{t('site.about_ctaDesc')}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              href="/register"
              className="inline-block px-8 py-3.5 bg-white text-neutral-900 font-semibold rounded-[3px] hover:bg-neutral-100 transition"
            >
              {t('site.about_ctaButton')}
            </Link>
          </ScrollReveal>
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
