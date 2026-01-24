"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

interface EnterpriseDetail {
  id: string;
  name: string;
  status: string;
  currentValuation: string;
  valuationTarget: string;
  createdAt: string;
  country: { id: string; name: string; isoCode: string };
  industry: { id: string; name: string; code: string };
  investments: {
    id: string;
    amount: string;
    status: string;
    user: { id: string; name: string; email: string };
  }[];
  capitalLedger: {
    id: string;
    type: string;
    amount: string;
    description: string | null;
    createdAt: string;
  }[];
}

export default function EnterpriseDetailPage() {
  const params = useParams();
  const [enterprise, setEnterprise] = useState<EnterpriseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/enterprises/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        setEnterprise(data);
        setLoading(false);
      })
      .catch(() => {
        setError("기업을 찾을 수 없습니다.");
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </>
    );
  }

  if (error || !enterprise) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/enterprises" className="text-blue-600 hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </>
    );
  }

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat("ko-KR").format(BigInt(amount));
  };

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/enterprises" className="text-sm text-blue-600 hover:underline mb-4 block">
          &larr; 기업 목록
        </Link>

        <div className="bg-white p-6 rounded-xl border shadow-sm mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-bold">{enterprise.name}</h1>
            <span
              className={`text-sm px-3 py-1 rounded ${
                enterprise.status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : enterprise.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {enterprise.status === "APPROVED"
                ? "승인"
                : enterprise.status === "PENDING"
                ? "대기"
                : "거절"}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">국가</p>
              <p className="font-medium">{enterprise.country.name}</p>
            </div>
            <div>
              <p className="text-gray-500">산업</p>
              <p className="font-medium">{enterprise.industry.name}</p>
            </div>
            <div>
              <p className="text-gray-500">현재 가치</p>
              <p className="font-medium">{formatAmount(enterprise.currentValuation)}원</p>
            </div>
            <div>
              <p className="text-gray-500">목표 가치</p>
              <p className="font-medium">{formatAmount(enterprise.valuationTarget)}원</p>
            </div>
          </div>
        </div>

        {enterprise.investments.length > 0 && (
          <div className="bg-white p-6 rounded-xl border shadow-sm mb-6">
            <h2 className="font-semibold text-lg mb-4">투자 현황</h2>
            <div className="space-y-3">
              {enterprise.investments.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{inv.user.name}</p>
                    <p className="text-xs text-gray-500">{inv.user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{formatAmount(inv.amount)}원</p>
                    <p className="text-xs text-gray-500">{inv.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {enterprise.capitalLedger.length > 0 && (
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-lg mb-4">자본 원장</h2>
            <div className="space-y-3">
              {enterprise.capitalLedger.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{entry.type}</p>
                    <p className="text-xs text-gray-500">{entry.description || "-"}</p>
                  </div>
                  <p className="font-medium text-sm">{formatAmount(entry.amount)}원</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
