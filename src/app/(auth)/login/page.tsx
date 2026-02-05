"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/i18n";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock login - DB 연동 전 데모용
    setTimeout(() => {
      if (form.email && form.password) {
        router.push("/dashboard");
      } else {
        setError(t("site.login_fillAll"));
        setLoading(false);
      }
    }, 500);
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
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">{t("site.login_title")}</h1>
          <p className="text-sm text-neutral-500 text-center mb-6">{t("site.login_desc")}</p>

          {error && (
            <div className="bg-neutral-50 text-neutral-700 p-3 rounded-[3px] mb-4 text-sm border border-neutral-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t("site.login_email")}</label>
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
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t("site.login_password")}</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-[3px] focus:ring-2 focus:ring-neutral-400 focus:border-transparent outline-none transition text-sm"
                placeholder={t("site.login_passwordPlaceholder")}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-neutral-900 text-white font-medium rounded-[3px] hover:bg-neutral-800 disabled:opacity-50 transition text-sm"
            >
              {loading ? t("site.login_loading") : t("site.login_submit")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              {t("site.login_noAccount")}{" "}
              <Link href="/register" className="text-neutral-900 font-medium hover:underline">
                {t("site.login_signup")}
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
