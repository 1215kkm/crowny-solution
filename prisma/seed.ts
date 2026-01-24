import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed countries (MVP: 한국만)
  const korea = await prisma.country.upsert({
    where: { isoCode: "KR" },
    update: {},
    create: {
      isoCode: "KR",
      name: "대한민국",
      status: "ACTIVE",
    },
  });

  console.log("Created country:", korea.name);

  // Seed industries (5대 산업)
  const industries = [
    { code: "finance", name: "금융" },
    { code: "bio", name: "바이오" },
    { code: "energy", name: "에너지" },
    { code: "goods", name: "재화" },
    { code: "aid", name: "구호" },
  ];

  for (const ind of industries) {
    const industry = await prisma.industry.upsert({
      where: { code: ind.code },
      update: {},
      create: ind,
    });
    console.log("Created industry:", industry.name);
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
