import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryId = searchParams.get("countryId");
  const industryId = searchParams.get("industryId");

  const where: Record<string, string> = {};
  if (countryId) where.countryId = countryId;
  if (industryId) where.industryId = industryId;

  const enterprises = await prisma.enterprise.findMany({
    where,
    include: {
      country: true,
      industry: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(enterprises);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const roles = (session.user as { roles?: string[] }).roles || [];
  const isAdmin = roles.some((r) =>
    ["GLOBAL_ADMIN", "COUNTRY_ADMIN", "INDUSTRY_ADMIN", "ENTERPRISE_ADMIN"].includes(r)
  );

  if (!isAdmin) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
  }

  try {
    const { name, countryId, industryId } = await request.json();

    if (!name || !countryId || !industryId) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    const enterprise = await prisma.enterprise.create({
      data: {
        name,
        countryId,
        industryId,
      },
      include: {
        country: true,
        industry: true,
      },
    });

    return NextResponse.json(enterprise, { status: 201 });
  } catch (error) {
    console.error("Enterprise creation error:", error);
    return NextResponse.json(
      { error: "기업 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
