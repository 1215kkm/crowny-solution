"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

interface Enterprise {
  id: string;
  name: string;
  status: string;
  currentValuation: string;
  valuationTarget: string;
  createdAt: string;
  country: { id: string; name: string; isoCode: string };
  industry: { id: string; name: string; code: string };
}

export default function EnterprisesPage() {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/enterprises")
      .then((res) => res.json())
      .then((data) => {
        setEnterprises(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">기업 목록</h1>
          <Link
            href="/enterprises/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
          >
            기업 등록
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">로딩 중...</p>
        ) : enterprises.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">등록된 기업이 없습니다.</p>
            <p className="text-sm">첫 번째 기업을 등록해보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enterprises.map((enterprise) => (
              <Link
                key={enterprise.id}
                href={`/enterprises/${enterprise.id}`}
                className="block bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold">{enterprise.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
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
                <p className="text-sm text-gray-500">
                  {enterprise.country.name} &middot; {enterprise.industry.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
