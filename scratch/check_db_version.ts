import { prisma } from "../src/lib/db";

async function main() {
  const res = await prisma.$queryRawUnsafe<any[]>('SELECT version();');
  console.log("Database version query result:");
  console.log(res[0].version);
}

main().catch(console.error).finally(() => prisma.$disconnect());
