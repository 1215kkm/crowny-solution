export const MOCK_ENTERPRISES = [
  {
    id: "ent-1",
    name: "크라운 파이낸스",
    industry: { code: "finance", name: "금융" },
    country: { isoCode: "KR", name: "대한민국" },
    status: "APPROVED",
    currentValuation: 42000000000,
    valuationTarget: 153000000000,
    description: "글로벌 디지털 금융 서비스를 선도하는 핀테크 기업",
    founded: "2024",
    employees: 128,
    ceo: "김민준",
  },
  {
    id: "ent-2",
    name: "바이오젠 코리아",
    industry: { code: "bio", name: "바이오" },
    country: { isoCode: "KR", name: "대한민국" },
    status: "APPROVED",
    currentValuation: 67000000000,
    valuationTarget: 153000000000,
    description: "차세대 유전자 치료제 개발 전문 바이오텍 기업",
    founded: "2023",
    employees: 256,
    ceo: "이서연",
  },
  {
    id: "ent-3",
    name: "그린에너지 솔루션",
    industry: { code: "energy", name: "에너지" },
    country: { isoCode: "KR", name: "대한민국" },
    status: "APPROVED",
    currentValuation: 35000000000,
    valuationTarget: 153000000000,
    description: "태양광·수소 에너지 기반 친환경 발전 솔루션 제공",
    founded: "2024",
    employees: 89,
    ceo: "박지훈",
  },
  {
    id: "ent-4",
    name: "스마트굿즈",
    industry: { code: "goods", name: "재화" },
    country: { isoCode: "KR", name: "대한민국" },
    status: "PENDING",
    currentValuation: 12000000000,
    valuationTarget: 153000000000,
    description: "AI 기반 스마트 유통 및 물류 플랫폼",
    founded: "2025",
    employees: 45,
    ceo: "최유진",
  },
  {
    id: "ent-5",
    name: "글로벌에이드",
    industry: { code: "aid", name: "구호" },
    country: { isoCode: "KR", name: "대한민국" },
    status: "APPROVED",
    currentValuation: 8000000000,
    valuationTarget: 153000000000,
    description: "국제 구호·의료 지원 및 교육 인프라 구축",
    founded: "2024",
    employees: 312,
    ceo: "정하늘",
  },
];

export const MOCK_STATS = {
  totalCountries: 1,
  targetCountries: 153,
  totalEnterprises: 5,
  targetEnterprises: 153,
  totalInvestment: 164000000000,
  totalValuation: 765000000000,
};

export const MOCK_INVESTMENTS = [
  { id: "inv-1", userName: "홍길동", amount: 50000000, enterpriseName: "크라운 파이낸스", date: "2026-01-20", status: "APPROVED" },
  { id: "inv-2", userName: "김투자", amount: 30000000, enterpriseName: "바이오젠 코리아", date: "2026-01-18", status: "APPROVED" },
  { id: "inv-3", userName: "이사업", amount: 100000000, enterpriseName: "그린에너지 솔루션", date: "2026-01-15", status: "PENDING" },
  { id: "inv-4", userName: "박성장", amount: 20000000, enterpriseName: "스마트굿즈", date: "2026-01-10", status: "APPROVED" },
];

export function formatKRW(amount: number): string {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(0)}억원`;
  }
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(0)}만원`;
  }
  return `${amount.toLocaleString()}원`;
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "APPROVED": return "승인됨";
    case "PENDING": return "검토 중";
    case "REJECTED": return "반려";
    default: return status;
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "APPROVED": return "text-emerald-600 bg-emerald-50";
    case "PENDING": return "text-amber-600 bg-amber-50";
    case "REJECTED": return "text-red-600 bg-red-50";
    default: return "text-gray-600 bg-gray-50";
  }
}

export function getIndustryColor(code: string): string {
  switch (code) {
    case "finance": return "from-blue-500 to-indigo-600";
    case "bio": return "from-green-500 to-teal-600";
    case "energy": return "from-yellow-500 to-orange-600";
    case "goods": return "from-purple-500 to-pink-600";
    case "aid": return "from-rose-500 to-red-600";
    default: return "from-gray-500 to-gray-600";
  }
}

export function getIndustryIcon(code: string): string {
  switch (code) {
    case "finance": return "💰";
    case "bio": return "🧬";
    case "energy": return "⚡";
    case "goods": return "📦";
    case "aid": return "🤝";
    default: return "🏢";
  }
}
