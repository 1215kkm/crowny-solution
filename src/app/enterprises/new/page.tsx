"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function NewEnterprisePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    industry: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const industries = [
    { code: "finance", name: "금융" },
    { code: "bio", name: "바이오" },
    { code: "energy", name: "에너지" },
    { code: "goods", name: "재화" },
    { code: "aid", name: "구호" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock - DB 연동 전 데모용
    setTimeout(() => {
      if (form.name && form.industry) {
        router.push("/enterprises");
      } else {
        setError("모든 항목을 입력해주세요.");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
          <Link href="/enterprises" className="hover:text-neutral-700 transition">기업 목록</Link>
          <span>/</span>
          <span className="text-neutral-700">기업 등록</span>
        </div>

        <div className="bg-white rounded-[3px] border border-neutral-200 overflow-hidden">
          <div className="h-1 bg-neutral-900" />
          <div className="p-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">기업 등록</h1>

            {error && (
              <div className="bg-neutral-50 text-neutral-700 p-3 rounded-[3px] border border-neutral-200 mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  기업명
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-[3px] focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none transition"
                  placeholder="기업 이름을 입력하세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  산업 분야
                </label>
                <select
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-[3px] focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none transition"
                  required
                >
                  <option value="">산업 선택</option>
                  {industries.map((i) => (
                    <option key={i.code} value={i.code}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neutral-900 text-white py-2.5 rounded-[3px] font-medium hover:bg-neutral-800 disabled:opacity-50 transition"
              >
                {loading ? "등록 중..." : "기업 등록"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
