import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            CROWNY
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            전 세계를 하나의 웹사이트에서 관리하는 사업 플랫폼
          </p>
          <p className="text-gray-500 mb-12">
            153개국 &middot; 5대 산업 &middot; 글로벌 비즈니스 네트워크
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              시작하기
            </Link>
            <Link
              href="/enterprises"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg hover:bg-gray-50 transition"
            >
              기업 둘러보기
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">글로벌 사업 관리</h3>
              <p className="text-gray-500 text-sm">
                153개국의 사업을 한 곳에서 통합 관리합니다.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">5대 산업 분류</h3>
              <p className="text-gray-500 text-sm">
                금융, 바이오, 에너지, 재화, 구호 산업을 체계적으로 운영합니다.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">투자 및 성장</h3>
              <p className="text-gray-500 text-sm">
                투자자와 기업을 연결하고 가치 성장을 추적합니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
