'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/i18n';

export default function MarketplacePlanPage() {
  const { t } = useTranslation();

  useEffect(() => {
    // 인쇄 스타일 적용
    document.title = t('site.docs_marketplacePlanTitle');
  }, [t]);

  return (
    <div className="min-h-screen bg-white">
      {/* 인쇄 버튼 - 인쇄 시 숨김 */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t('site.docs_pdfDownload')}
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-neutral-200 text-neutral-900 px-6 py-3 rounded-lg hover:bg-neutral-300 transition-colors"
        >
          {t('site.docs_goBack')}
        </button>
      </div>

      {/* 문서 내용 */}
      <div className="max-w-4xl mx-auto px-8 py-12 print:px-0 print:py-0">
        {/* 표지 */}
        <div className="text-center py-20 border-b-4 border-neutral-900 mb-12 print:break-after-page">
          <div className="text-6xl mb-8">CROWNY</div>
          <h1 className="text-4xl font-bold mb-4">코인 마켓플레이스</h1>
          <h2 className="text-2xl text-neutral-600 mb-8">기획서</h2>
          <div className="text-neutral-500 mt-12">
            <p>버전: 1.0</p>
            <p>작성일: 2026년 2월 3일</p>
          </div>
        </div>

        {/* 목차 */}
        <div className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">목차</h2>
          <ol className="space-y-2 text-lg">
            <li>1. 프로젝트 개요</li>
            <li>2. 회원 등급 시스템</li>
            <li>3. 권한 부여 시스템</li>
            <li>4. 수수료 분배 시스템</li>
            <li>5. 지갑 시스템</li>
            <li>6. 마켓플레이스 기능</li>
            <li>7. 데이터베이스 설계</li>
            <li>8. 화면 설계</li>
            <li>9. API 설계</li>
            <li>10. 글로벌 운영 전략</li>
            <li>11. 기술 스택</li>
            <li>12. 구현 로드맵</li>
            <li>13. 보안 고려사항</li>
          </ol>
        </div>

        {/* 1. 프로젝트 개요 */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">1. 프로젝트 개요</h2>

          <h3 className="text-xl font-semibold mb-4">1.1 서비스 소개</h3>
          <p className="mb-6 leading-relaxed">
            CROWNY 코인 마켓플레이스는 <strong>CROWNY 코인</strong>을 기반으로 한 글로벌 P2P 거래 플랫폼입니다.
            중고나라, 당근마켓과 같이 누구나 상품을 등록하고 거래할 수 있으며,
            다단계 회원 등급 시스템을 통해 상위 회원이 하위 회원에게 권한을 부여하고
            거래 수수료가 상위 라인으로 분배되는 구조입니다.
          </p>

          <h3 className="text-xl font-semibold mb-4">1.2 핵심 특징</h3>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border border-neutral-300 px-4 py-2 text-left">특징</th>
                <th className="border border-neutral-300 px-4 py-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-neutral-300 px-4 py-2 font-semibold">CROWNY 코인 거래</td>
                <td className="border border-neutral-300 px-4 py-2">모든 거래는 CROWNY 코인으로 진행</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2 font-semibold">6단계 회원 등급</td>
                <td className="border border-neutral-300 px-4 py-2">SUPER_ADMIN → CROWN → DIAMOND → GOLD → SILVER → BRONZE</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2 font-semibold">다단계 수수료 분배</td>
                <td className="border border-neutral-300 px-4 py-2">거래 발생 시 상위 라인으로 수수료 자동 분배</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2 font-semibold">에스크로 시스템</td>
                <td className="border border-neutral-300 px-4 py-2">안전한 거래를 위한 에스크로 결제</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2 font-semibold">글로벌 서비스</td>
                <td className="border border-neutral-300 px-4 py-2">153개국 전 세계 사용자 지원</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-4">1.3 플랫폼 전략</h3>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border border-neutral-300 px-4 py-2 text-left">플랫폼</th>
                <th className="border border-neutral-300 px-4 py-2 text-left">우선순위</th>
                <th className="border border-neutral-300 px-4 py-2 text-left">기술</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-neutral-300 px-4 py-2 font-semibold">모바일 앱</td>
                <td className="border border-neutral-300 px-4 py-2">1순위 (메인)</td>
                <td className="border border-neutral-300 px-4 py-2">React Native / Expo</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2 font-semibold">모바일 웹</td>
                <td className="border border-neutral-300 px-4 py-2">2순위</td>
                <td className="border border-neutral-300 px-4 py-2">Next.js (반응형)</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2 font-semibold">PC 웹</td>
                <td className="border border-neutral-300 px-4 py-2">3순위</td>
                <td className="border border-neutral-300 px-4 py-2">Next.js (반응형)</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 2. 회원 등급 시스템 */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">2. 회원 등급 시스템</h2>

          <h3 className="text-xl font-semibold mb-4">2.1 등급 구조 (6단계)</h3>

          <div className="space-y-3 mb-8">
            <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4">
              <div className="font-bold text-lg text-purple-900">L0. SUPER_ADMIN (슈퍼관리자)</div>
              <ul className="text-sm mt-2 text-purple-800">
                <li>• 시스템 최고 권한, 모든 CROWN 임명/해임</li>
                <li>• 전체 시스템 설정 관리, 수수료 정책 결정</li>
                <li>• 수수료 배분: 0.5%</li>
              </ul>
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4">
              <div className="font-bold text-lg text-yellow-900">L1. CROWN (크라운)</div>
              <ul className="text-sm mt-2 text-yellow-800">
                <li>• 국가/지역 최상위 관리자</li>
                <li>• DIAMOND 임명/해임, 국가별 정책 관리</li>
                <li>• 수수료 배분: 1.5%</li>
              </ul>
            </div>

            <div className="bg-cyan-100 border-2 border-cyan-500 rounded-lg p-4">
              <div className="font-bold text-lg text-cyan-900">L2. DIAMOND (다이아몬드)</div>
              <ul className="text-sm mt-2 text-cyan-800">
                <li>• 지역/카테고리 총괄 관리자</li>
                <li>• GOLD 임명/해임, 산하 회원 관리</li>
                <li>• 수수료 배분: 1.0%</li>
              </ul>
            </div>

            <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-4">
              <div className="font-bold text-lg text-amber-900">L3. GOLD (골드)</div>
              <ul className="text-sm mt-2 text-amber-800">
                <li>• 중간 관리자</li>
                <li>• SILVER 승인/관리, 판매자 심사</li>
                <li>• 수수료 배분: 0.75%</li>
              </ul>
            </div>

            <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-4">
              <div className="font-bold text-lg text-gray-900">L4. SILVER (실버)</div>
              <ul className="text-sm mt-2 text-gray-800">
                <li>• 일반 판매자 (승인된 회원)</li>
                <li>• 상품 등록/판매 가능, BRONZE 초대 가능</li>
                <li>• 수수료 배분: 0.25%</li>
              </ul>
            </div>

            <div className="bg-orange-100 border-2 border-orange-400 rounded-lg p-4">
              <div className="font-bold text-lg text-orange-900">L5. BRONZE (브론즈)</div>
              <ul className="text-sm mt-2 text-orange-800">
                <li>• 신규 가입자/구매자</li>
                <li>• 구매만 가능, 판매하려면 SILVER 승인 필요</li>
                <li>• 수수료 배분: 0%</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">2.2 등급별 권한 요약</h3>
          <table className="w-full border-collapse mb-6 text-sm">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border border-neutral-300 px-3 py-2">등급</th>
                <th className="border border-neutral-300 px-3 py-2">상품등록</th>
                <th className="border border-neutral-300 px-3 py-2">구매</th>
                <th className="border border-neutral-300 px-3 py-2">하위임명</th>
                <th className="border border-neutral-300 px-3 py-2">수수료</th>
                <th className="border border-neutral-300 px-3 py-2">관리범위</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-neutral-300 px-3 py-2 font-semibold">SUPER_ADMIN</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2">CROWN</td>
                <td className="border border-neutral-300 px-3 py-2">0.5%</td>
                <td className="border border-neutral-300 px-3 py-2">전체 시스템</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-3 py-2 font-semibold">CROWN</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2">DIAMOND</td>
                <td className="border border-neutral-300 px-3 py-2">1.5%</td>
                <td className="border border-neutral-300 px-3 py-2">국가/지역</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-3 py-2 font-semibold">DIAMOND</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2">GOLD</td>
                <td className="border border-neutral-300 px-3 py-2">1.0%</td>
                <td className="border border-neutral-300 px-3 py-2">지역/카테고리</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-3 py-2 font-semibold">GOLD</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2">SILVER</td>
                <td className="border border-neutral-300 px-3 py-2">0.75%</td>
                <td className="border border-neutral-300 px-3 py-2">판매자 그룹</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-3 py-2 font-semibold">SILVER</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2">BRONZE 초대</td>
                <td className="border border-neutral-300 px-3 py-2">0.25%</td>
                <td className="border border-neutral-300 px-3 py-2">본인</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-3 py-2 font-semibold">BRONZE</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">X</td>
                <td className="border border-neutral-300 px-3 py-2 text-center">O</td>
                <td className="border border-neutral-300 px-3 py-2">X</td>
                <td className="border border-neutral-300 px-3 py-2">0%</td>
                <td className="border border-neutral-300 px-3 py-2">본인</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 3. 권한 부여 시스템 */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">3. 권한 부여 시스템</h2>

          <h3 className="text-xl font-semibold mb-4">3.1 권한 부여 흐름</h3>
          <div className="bg-neutral-50 p-6 rounded-lg font-mono text-sm mb-6">
            <pre>{`SUPER_ADMIN
    │
    ├──→ CROWN 임명 (국가별)
    │        │
    │        ├──→ DIAMOND 임명
    │        │        │
    │        │        ├──→ GOLD 임명
    │        │        │        │
    │        │        │        ├──→ SILVER 승인
    │        │        │        │        │
    │        │        │        │        └──→ BRONZE 초대
    │        │        │        │
    │        │        │        └── (SILVER 관리)
    │        │        │
    │        │        └── (GOLD 관리)
    │        │
    │        └── (DIAMOND 관리)
    │
    └── (CROWN 관리)`}</pre>
          </div>

          <h3 className="text-xl font-semibold mb-4">3.2 권한 부여 규칙</h3>
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li><strong>상위 → 하위만 가능:</strong> 자신보다 정확히 한 단계 아래 등급만 부여 가능</li>
            <li><strong>산하 관계 유지:</strong> 권한 부여 시 추천인-피추천인 관계 자동 형성</li>
            <li><strong>권한 회수:</strong> 상위자는 자신이 부여한 권한 회수 가능</li>
            <li><strong>권한 승계:</strong> 상위자 탈퇴 시 그 상위자에게 산하 회원 승계</li>
          </ol>
        </section>

        {/* 4. 수수료 분배 시스템 */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">4. 수수료 분배 시스템</h2>

          <h3 className="text-xl font-semibold mb-4">4.1 수수료 구조</h3>
          <p className="mb-4 font-semibold">총 거래 수수료: 4%</p>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border border-neutral-300 px-4 py-2 text-left">등급</th>
                <th className="border border-neutral-300 px-4 py-2 text-left">수수료율</th>
                <th className="border border-neutral-300 px-4 py-2 text-left">역할</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-neutral-300 px-4 py-2">SUPER_ADMIN</td>
                <td className="border border-neutral-300 px-4 py-2">0.5%</td>
                <td className="border border-neutral-300 px-4 py-2">시스템 운영비</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2">CROWN</td>
                <td className="border border-neutral-300 px-4 py-2">1.5%</td>
                <td className="border border-neutral-300 px-4 py-2">국가 관리</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2">DIAMOND</td>
                <td className="border border-neutral-300 px-4 py-2">1.0%</td>
                <td className="border border-neutral-300 px-4 py-2">지역 관리</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2">GOLD</td>
                <td className="border border-neutral-300 px-4 py-2">0.75%</td>
                <td className="border border-neutral-300 px-4 py-2">판매자 관리</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-2">SILVER</td>
                <td className="border border-neutral-300 px-4 py-2">0.25%</td>
                <td className="border border-neutral-300 px-4 py-2">추천 보상</td>
              </tr>
              <tr className="bg-neutral-100 font-semibold">
                <td className="border border-neutral-300 px-4 py-2">합계</td>
                <td className="border border-neutral-300 px-4 py-2">4.0%</td>
                <td className="border border-neutral-300 px-4 py-2"></td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-4">4.2 수수료 분배 예시</h3>
          <div className="bg-neutral-50 p-6 rounded-lg mb-6">
            <p className="font-semibold mb-4">거래 금액: 10,000 CROWNY 상품 판매 시</p>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span>판매자 수령액</span>
                <span className="font-semibold">9,600 CROWNY (96%)</span>
              </div>
              <div className="text-sm space-y-1 pt-2">
                <div className="flex justify-between">
                  <span>→ SUPER_ADMIN</span>
                  <span>50 CROWNY (0.5%)</span>
                </div>
                <div className="flex justify-between">
                  <span>→ CROWN</span>
                  <span>150 CROWNY (1.5%)</span>
                </div>
                <div className="flex justify-between">
                  <span>→ DIAMOND</span>
                  <span>100 CROWNY (1.0%)</span>
                </div>
                <div className="flex justify-between">
                  <span>→ GOLD</span>
                  <span>75 CROWNY (0.75%)</span>
                </div>
                <div className="flex justify-between">
                  <span>→ SILVER (추천인)</span>
                  <span>25 CROWNY (0.25%)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 지갑 시스템 */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">5. 지갑 시스템</h2>

          <h3 className="text-xl font-semibold mb-4">5.1 지갑 구조</h3>
          <div className="bg-neutral-50 p-6 rounded-lg mb-6">
            <p className="font-mono text-sm mb-4">지갑 주소: CRW-XXXX-XXXX-XXXX-XXXX</p>
            <div className="space-y-3">
              <div className="bg-green-100 p-3 rounded">
                <div className="font-semibold">사용 가능 잔액 (balance)</div>
                <div className="text-sm text-green-800">실제 사용 가능한 코인</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <div className="font-semibold">거래 중 잔액 (pendingBalance)</div>
                <div className="text-sm text-yellow-800">에스크로 진행 중인 금액</div>
              </div>
              <div className="bg-red-100 p-3 rounded">
                <div className="font-semibold">잠금 잔액 (lockedBalance)</div>
                <div className="text-sm text-red-800">출금 대기 등 잠금된 금액</div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">5.2 거래 유형</h3>
          <table className="w-full border-collapse mb-6 text-sm">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border border-neutral-300 px-3 py-2">유형</th>
                <th className="border border-neutral-300 px-3 py-2">코드</th>
                <th className="border border-neutral-300 px-3 py-2">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-neutral-300 px-3 py-2">입금</td><td className="border border-neutral-300 px-3 py-2">DEPOSIT</td><td className="border border-neutral-300 px-3 py-2">외부에서 코인 입금</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">출금</td><td className="border border-neutral-300 px-3 py-2">WITHDRAW</td><td className="border border-neutral-300 px-3 py-2">외부로 코인 출금</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">구매</td><td className="border border-neutral-300 px-3 py-2">PURCHASE</td><td className="border border-neutral-300 px-3 py-2">상품 구매</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">판매</td><td className="border border-neutral-300 px-3 py-2">SALE</td><td className="border border-neutral-300 px-3 py-2">상품 판매 수익</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">수수료</td><td className="border border-neutral-300 px-3 py-2">COMMISSION</td><td className="border border-neutral-300 px-3 py-2">다단계 수수료 수령</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">송금</td><td className="border border-neutral-300 px-3 py-2">TRANSFER</td><td className="border border-neutral-300 px-3 py-2">회원간 직접 송금</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">에스크로 잠금</td><td className="border border-neutral-300 px-3 py-2">ESCROW_LOCK</td><td className="border border-neutral-300 px-3 py-2">거래 시작 시 잠금</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">에스크로 해제</td><td className="border border-neutral-300 px-3 py-2">ESCROW_RELEASE</td><td className="border border-neutral-300 px-3 py-2">거래 완료/취소</td></tr>
            </tbody>
          </table>
        </section>

        {/* 6. 마켓플레이스 기능 */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">6. 마켓플레이스 기능</h2>

          <h3 className="text-xl font-semibold mb-4">6.1 상품 카테고리</h3>
          <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
            <div className="bg-neutral-50 p-2 rounded">디지털/가전</div>
            <div className="bg-neutral-50 p-2 rounded">패션/의류</div>
            <div className="bg-neutral-50 p-2 rounded">가구/인테리어</div>
            <div className="bg-neutral-50 p-2 rounded">자동차/오토바이</div>
            <div className="bg-neutral-50 p-2 rounded">도서/티켓/문구</div>
            <div className="bg-neutral-50 p-2 rounded">게임/취미</div>
            <div className="bg-neutral-50 p-2 rounded">유아동</div>
            <div className="bg-neutral-50 p-2 rounded">스포츠/레저</div>
            <div className="bg-neutral-50 p-2 rounded">반려동물</div>
            <div className="bg-neutral-50 p-2 rounded">기타</div>
          </div>

          <h3 className="text-xl font-semibold mb-4">6.2 거래 흐름</h3>
          <ol className="list-decimal list-inside space-y-3 mb-6">
            <li><strong>상품 등록:</strong> 판매자(SILVER+)가 상품 정보 입력 → 등록 완료</li>
            <li><strong>관심 표시 & 채팅:</strong> 구매자와 판매자가 채팅으로 협의</li>
            <li><strong>구매 요청:</strong> 구매자가 [구매하기] 클릭 → 주문 생성</li>
            <li><strong>에스크로 결제:</strong> 구매자 지갑에서 차감 → 에스크로 계정 잠금</li>
            <li><strong>거래 진행:</strong> 직거래(만남) 또는 배송(발송→수령)</li>
            <li><strong>거래 완료:</strong> 구매 확정 → 에스크로 해제 → 수수료 분배 → 판매자 입금</li>
            <li><strong>리뷰 작성:</strong> 구매자 ↔ 판매자 상호 평가</li>
          </ol>

          <h3 className="text-xl font-semibold mb-4">6.3 주문 상태</h3>
          <table className="w-full border-collapse mb-6 text-sm">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border border-neutral-300 px-3 py-2">상태</th>
                <th className="border border-neutral-300 px-3 py-2">코드</th>
                <th className="border border-neutral-300 px-3 py-2">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-neutral-300 px-3 py-2">결제 대기</td><td className="border border-neutral-300 px-3 py-2">PENDING</td><td className="border border-neutral-300 px-3 py-2">주문 생성됨, 결제 전</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">결제 완료</td><td className="border border-neutral-300 px-3 py-2">PAID</td><td className="border border-neutral-300 px-3 py-2">에스크로 잠금 완료</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">배송중</td><td className="border border-neutral-300 px-3 py-2">SHIPPING</td><td className="border border-neutral-300 px-3 py-2">판매자가 발송</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">배송 완료</td><td className="border border-neutral-300 px-3 py-2">DELIVERED</td><td className="border border-neutral-300 px-3 py-2">배송 완료</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">구매 확정</td><td className="border border-neutral-300 px-3 py-2">CONFIRMED</td><td className="border border-neutral-300 px-3 py-2">구매자 확인, 정산 완료</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">취소</td><td className="border border-neutral-300 px-3 py-2">CANCELLED</td><td className="border border-neutral-300 px-3 py-2">거래 취소</td></tr>
              <tr><td className="border border-neutral-300 px-3 py-2">환불</td><td className="border border-neutral-300 px-3 py-2">REFUNDED</td><td className="border border-neutral-300 px-3 py-2">환불 처리 완료</td></tr>
            </tbody>
          </table>
        </section>

        {/* 7~13 간략화 */}
        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">7. 데이터베이스 설계</h2>
          <h3 className="text-xl font-semibold mb-4">주요 테이블</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">User</div>
              <div className="text-neutral-600">회원 정보</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">MemberRelation</div>
              <div className="text-neutral-600">회원 관계 (다단계)</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">Wallet</div>
              <div className="text-neutral-600">지갑</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">Transaction</div>
              <div className="text-neutral-600">거래 내역</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">Product</div>
              <div className="text-neutral-600">상품</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">ProductCategory</div>
              <div className="text-neutral-600">상품 카테고리</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">Order</div>
              <div className="text-neutral-600">주문</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">Commission</div>
              <div className="text-neutral-600">수수료 분배</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">ChatRoom / ChatMessage</div>
              <div className="text-neutral-600">채팅</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <div className="font-semibold">Review</div>
              <div className="text-neutral-600">리뷰</div>
            </div>
          </div>
        </section>

        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">8-9. 화면 및 API 설계</h2>

          <h3 className="text-xl font-semibold mb-4">주요 화면</h3>
          <div className="grid grid-cols-3 gap-2 mb-6 text-sm">
            <div className="bg-neutral-50 p-2 rounded text-center">홈 (피드)</div>
            <div className="bg-neutral-50 p-2 rounded text-center">검색</div>
            <div className="bg-neutral-50 p-2 rounded text-center">상품 등록</div>
            <div className="bg-neutral-50 p-2 rounded text-center">상품 상세</div>
            <div className="bg-neutral-50 p-2 rounded text-center">채팅</div>
            <div className="bg-neutral-50 p-2 rounded text-center">마이페이지</div>
            <div className="bg-neutral-50 p-2 rounded text-center">지갑</div>
            <div className="bg-neutral-50 p-2 rounded text-center">주문 내역</div>
            <div className="bg-neutral-50 p-2 rounded text-center">관리자</div>
          </div>

          <h3 className="text-xl font-semibold mb-4">주요 API 카테고리</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-neutral-50 p-2 rounded">/api/auth/* - 인증</div>
            <div className="bg-neutral-50 p-2 rounded">/api/wallet/* - 지갑</div>
            <div className="bg-neutral-50 p-2 rounded">/api/products/* - 상품</div>
            <div className="bg-neutral-50 p-2 rounded">/api/orders/* - 주문</div>
            <div className="bg-neutral-50 p-2 rounded">/api/chats/* - 채팅</div>
            <div className="bg-neutral-50 p-2 rounded">/api/members/* - 회원</div>
            <div className="bg-neutral-50 p-2 rounded">/api/reviews/* - 리뷰</div>
            <div className="bg-neutral-50 p-2 rounded">/api/admin/* - 관리자</div>
          </div>
        </section>

        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">10. 글로벌 운영 전략</h2>

          <h3 className="text-xl font-semibold mb-4">다국가 운영 구조</h3>
          <div className="bg-neutral-50 p-4 rounded-lg mb-6 font-mono text-sm">
            <pre>{`          SUPER_ADMIN (본사)
                  │
    ┌─────────────┼─────────────┐
    │             │             │
CROWN (KR)   CROWN (US)   CROWN (JP)
 한국 총괄     미국 총괄     일본 총괄`}</pre>
          </div>

          <h3 className="text-xl font-semibold mb-4">지원 언어 (우선순위)</h3>
          <ol className="list-decimal list-inside mb-6">
            <li>한국어 (ko)</li>
            <li>영어 (en)</li>
            <li>일본어 (ja)</li>
            <li>중국어 간체 (zh-CN)</li>
            <li>스페인어 (es)</li>
          </ol>
        </section>

        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">11. 기술 스택</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">프론트엔드</h3>
              <ul className="text-sm space-y-1">
                <li>• Next.js 16.x</li>
                <li>• React 19.x</li>
                <li>• TypeScript 5.x</li>
                <li>• Tailwind CSS 4.x</li>
                <li>• React Native / Expo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">백엔드</h3>
              <ul className="text-sm space-y-1">
                <li>• Next.js API Routes</li>
                <li>• Prisma 5.x</li>
                <li>• PostgreSQL 15+</li>
                <li>• NextAuth.js 4.x</li>
                <li>• Socket.io 4.x</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">인프라</h3>
              <ul className="text-sm space-y-1">
                <li>• AWS S3 / Cloudinary</li>
                <li>• Redis</li>
                <li>• Firebase FCM</li>
                <li>• Vercel / AWS</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">개발 도구</h3>
              <ul className="text-sm space-y-1">
                <li>• ESLint</li>
                <li>• Prettier</li>
                <li>• Jest</li>
                <li>• GitHub Actions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 print:break-after-page">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">12. 구현 로드맵</h2>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">Phase 1: 기반 구축 (1-2주)</div>
              <p className="text-sm text-blue-800">DB 스키마, 회원 등급, 권한 부여, 지갑 시스템</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-900">Phase 2: 마켓 핵심 (3-4주)</div>
              <p className="text-sm text-green-800">상품 CRUD, 검색/필터, 이미지 업로드, 카테고리</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="font-semibold text-yellow-900">Phase 3: 거래 시스템 (5-6주)</div>
              <p className="text-sm text-yellow-800">주문, 에스크로, 수수료 분배, 거래 상태</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-semibold text-purple-900">Phase 4: 소셜 기능 (7-8주)</div>
              <p className="text-sm text-purple-800">실시간 채팅, 알림, 리뷰/평점, 찜 목록</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="font-semibold text-pink-900">Phase 5: 모바일 최적화 (9-10주)</div>
              <p className="text-sm text-pink-800">반응형 UI, PWA, 푸시 알림, 위치 기반</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="font-semibold text-orange-900">Phase 6: 고도화 (11-12주)</div>
              <p className="text-sm text-orange-800">관리자 대시보드, 통계, 다국어, 보안/성능</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-neutral-900">13. 보안 고려사항</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-neutral-50 p-4 rounded">
              <div className="font-semibold mb-2">거래 보안</div>
              <ul className="space-y-1 text-neutral-600">
                <li>• 에스크로 시스템</li>
                <li>• 실시간 잔액 검증</li>
                <li>• 트랜잭션 원자성</li>
                <li>• 이중 결제 방지</li>
              </ul>
            </div>
            <div className="bg-neutral-50 p-4 rounded">
              <div className="font-semibold mb-2">인증 보안</div>
              <ul className="space-y-1 text-neutral-600">
                <li>• bcrypt 해싱</li>
                <li>• JWT + Refresh Token</li>
                <li>• 2FA 지원</li>
                <li>• 로그인 시도 제한</li>
              </ul>
            </div>
            <div className="bg-neutral-50 p-4 rounded">
              <div className="font-semibold mb-2">데이터 보안</div>
              <ul className="space-y-1 text-neutral-600">
                <li>• HTTPS 필수</li>
                <li>• 민감 정보 암호화</li>
                <li>• 채팅 E2E 암호화</li>
                <li>• 일일 자동 백업</li>
              </ul>
            </div>
            <div className="bg-neutral-50 p-4 rounded">
              <div className="font-semibold mb-2">API 보안</div>
              <ul className="space-y-1 text-neutral-600">
                <li>• Rate Limiting</li>
                <li>• 권한 검증</li>
                <li>• 입력 검증</li>
                <li>• CORS 설정</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="text-center text-neutral-500 text-sm py-8 border-t">
          <p>CROWNY 코인 마켓플레이스 기획서 v1.0</p>
          <p>2026년 2월 3일</p>
        </footer>
      </div>

      {/* 인쇄용 스타일 */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:break-after-page {
            break-after: page;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
