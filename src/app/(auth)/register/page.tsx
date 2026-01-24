"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ROLES = [
  { value: "GLOBAL_ADMIN", label: "관리자 (Admin)" },
  { value: "BUSINESSMAN", label: "사업자 (Business)" },
  { value: "INVESTOR", label: "투자자 (Investor)" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "INVESTOR",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch {
      setError("회원가입 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center leading-none">
            <span className="text-3xl font-black text-neutral-900 tracking-tight">CROWNY</span>
            <span className="text-[10px] font-medium text-neutral-400 tracking-[0.3em] mt-1">PRESENT</span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-[3px] border border-neutral-200">
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">회원가입</h1>
          <p className="text-sm text-neutral-500 text-center mb-6">CROWNY 파트너로 등록하세요</p>

          {error && (
            <div className="bg-neutral-50 text-neutral-700 p-3 rounded-[3px] mb-4 text-sm border border-neutral-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">이름</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-[3px] focus:ring-2 focus:ring-neutral-400 focus:border-transparent outline-none transition text-sm"
                placeholder="홍길동"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">이메일</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-[3px] focus:ring-2 focus:ring-neutral-400 focus:border-transparent outline-none transition text-sm"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">비밀번호</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-[3px] focus:ring-2 focus:ring-neutral-400 focus:border-transparent outline-none transition text-sm"
                placeholder="6자 이상 입력"
                minLength={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">역할 선택</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-[3px] focus:ring-2 focus:ring-neutral-400 focus:border-transparent outline-none transition text-sm bg-white"
              >
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-neutral-900 text-white font-medium rounded-[3px] hover:bg-neutral-800 disabled:opacity-50 transition text-sm"
            >
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-neutral-900 font-medium hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </div>

        <p className="text-xs text-neutral-400 text-center mt-6">
          &copy; 2026 CROWNY. All rights reserved.
        </p>
      </div>
    </div>
  );
}
