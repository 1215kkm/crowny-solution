"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
    } else {
      router.push("/dashboard");
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
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">로그인</h1>
          <p className="text-sm text-neutral-500 text-center mb-6">CROWNY 계정으로 로그인하세요</p>

          {error && (
            <div className="bg-neutral-50 text-neutral-700 p-3 rounded-[3px] mb-4 text-sm border border-neutral-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="비밀번호 입력"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-neutral-900 text-white font-medium rounded-[3px] hover:bg-neutral-800 disabled:opacity-50 transition text-sm"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              계정이 없으신가요?{" "}
              <Link href="/register" className="text-neutral-900 font-medium hover:underline">
                회원가입
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
