"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!session) return null;

  const roles = (session.user as { roles?: string[] }).roles || [];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">대시보드</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">내 이름</h3>
            <p className="text-lg font-semibold">{session.user?.name}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">이메일</h3>
            <p className="text-lg font-semibold">{session.user?.email}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">역할</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {roles.map((role) => (
                <span
                  key={role}
                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/enterprises"
            className="block bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2">기업 목록</h3>
            <p className="text-gray-500 text-sm">등록된 기업을 확인합니다.</p>
          </Link>

          {roles.some((r) =>
            ["GLOBAL_ADMIN", "COUNTRY_ADMIN", "INDUSTRY_ADMIN", "ENTERPRISE_ADMIN"].includes(r)
          ) && (
            <Link
              href="/enterprises/new"
              className="block bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">기업 등록</h3>
              <p className="text-gray-500 text-sm">새로운 기업을 등록합니다.</p>
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
