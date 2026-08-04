import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();

async function test() {
  await prisma.user.findMany();
  console.log("Database is awake!");
}

test();

export default prisma;