"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { useTranslation } from "@/i18n";

export default function Home() {
  const { t } = useTranslation();

  const industries = [
    { code: "F", name: t('site.home_indFinance'), desc: t('site.home_indFinanceDesc'), aurora: "from-cyan-400/[0.3] via-neutral-900 to-neutral-900" },
    { code: "B", name: t('site.home_indBio'), desc: t('site.home_indBioDesc'), aurora: "from-emerald-400/[0.3] via-neutral-900 to-neutral-900" },
    { code: "E", name: t('site.home_indEnergy'), desc: t('site.home_indEnergyDesc'), aurora: "from-purple-400/[0.3] via-neutral-900 to-neutral-900" },
    { code: "G", name: t('site.home_indGoods'), desc: t('site.home_indGoodsDesc'), aurora: "from-blue-400/[0.3] via-neutral-900 to-neutral-900" },
    { code: "A", name: t('site.home_indAid'), desc: t('site.home_indAidDesc'), aurora: "from-rose-400/[0.3] via-neutral-900 to-neutral-900" },
  ];

  const coinFeatures = [
    { title: t('site.home_polygonTitle'), desc: t('site.home_polygonDesc'), icon: "P" },
    { title: t('site.home_walletTitle'), desc: t('site.home_walletDesc'), icon: "W" },
    { title: t('site.home_valueTitle'), desc: t('site.home_valueDesc'), icon: "V" },
  ];

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-blob-1 absolute -top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full blur-[100px] bg-cyan-500 opacity-30" />
          <div className="aurora-blob-2 absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-purple-500 opacity-30" />
          <div className="aurora-blob-3 absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full blur-[100px] bg-emerald-500 opacity-25" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center relative z-10">
          <ScrollReveal delay={0.1}>
            <div className="inline-block px-4 py-1.5 bg-neutral-800/80 border border-neutral-700 rounded-[3px] text-sm text-neutral-300 mb-6">
              {t('site.home_badge')}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {t('site.home_title1')}<br />
              <span className="text-neutral-400">{t('site.home_title2')}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('site.home_desc')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/enterprises"
                className="px-8 py-3.5 bg-white text-neutral-900 font-semibold rounded-[3px] hover:bg-neutral-100 transition"
              >
                {t('site.home_browseEnterprises')}
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 border border-neutral-600 text-white font-medium rounded-[3px] hover:bg-neutral-800 transition"
              >
                {t('site.home_learnMore')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ScrollReveal delay={0}>
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  <CountUp end={153} duration={2} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">{t('site.home_targetCountries')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  <CountUp end={5} duration={1.5} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">{t('site.home_coreIndustries')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  <CountUp end={1530} duration={2.5} suffix={t('site.home_billionSuffix')} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">{t('site.home_targetValuePerEnt')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div>
                <p className="text-3xl font-bold text-neutral-900">
                  <CountUp end={23409} duration={2.5} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">{t('site.home_targetEntCount')}</p>
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
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">{t('site.home_industriesTitle')}</h2>
              <p className="text-neutral-500">{t('site.home_industriesDesc')}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.code} delay={i * 0.1}>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('site.home_coinTitle')}</h2>
              <p className="text-neutral-400">{t('site.home_coinDesc')}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <ScrollReveal delay={0}>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-[3px] p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  <CountUp end={234} duration={2} suffix={t('site.home_billionSuffix')} />
                </p>
                <p className="text-xs text-neutral-400 mt-1">{t('site.home_totalSupply')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-[3px] p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  <CountUp end={25500} duration={2} prefix="₩" />
                </p>
                <p className="text-xs text-neutral-400 mt-1">{t('site.home_startPrice')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-[3px] p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  <CountUp end={153000} duration={2.5} prefix="₩" />
                </p>
                <p className="text-xs text-neutral-400 mt-1">{t('site.home_targetPrice')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-[3px] p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-amber-300">7%+</p>
                <p className="text-xs text-neutral-400 mt-1">{t('site.home_avgGrowth')}</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {coinFeatures.map((item, i) => (
              <ScrollReveal key={item.icon} delay={i * 0.1}>
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
              {t('site.home_coinNote')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t('site.home_ctaTitle')}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-neutral-500 mb-8">{t('site.home_ctaDesc')}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              href="/register"
              className="inline-block px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-[3px] hover:bg-neutral-800 transition"
            >
              {t('site.home_ctaButton')}
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
              <Link href="/about" className="hover:text-white transition">{t('site.footer_about')}</Link>
              <Link href="/enterprises" className="hover:text-white transition">{t('site.footer_enterprises')}</Link>
              <Link href="/dashboard" className="hover:text-white transition">{t('site.footer_dashboard')}</Link>
            </div>
            <p className="text-sm">&copy; 2026 CROWNY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
