import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: "apex",
      primaryColor: "#ff673d",
      logoUrl: "",
      watermarkEnabled: false,
      watermarkText: "Velmora Softlab",
      contactLabel: "Contact Us",
      contactEmail: "hello@apexroofing.com",
    },
  });
  console.log("Seeded SiteConfig");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
