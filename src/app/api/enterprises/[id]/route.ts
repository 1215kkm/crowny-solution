import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const enterprise = await prisma.enterprise.findUnique({
    where: { id },
    include: {
      country: true,
      industry: true,
      investments: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
      capitalLedger: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!enterprise) {
    return NextResponse.json({ error: "기업을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json(enterprise);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  try {
    const enterprise = await prisma.enterprise.update({
      where: { id },
      data: {
        name: data.name,
        status: data.status,
      },
      include: { country: true, industry: true },
    });

    return NextResponse.json(enterprise);
  } catch {
    return NextResponse.json({ error: "수정 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.enterprise.delete({ where: { id } });
    return NextResponse.json({ message: "삭제되었습니다." });
  } catch {
    return NextResponse.json({ error: "삭제 중 오류가 발생했습니다." }, { status: 500 });
  }
}
