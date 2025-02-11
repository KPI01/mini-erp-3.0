import { PrismaClient } from "@prisma/client";
import { fakerES as faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    const item = await prisma.item.create({
        data: { descripcion: faker.commerce.product() }
    })
    console.log("Item creado:", item)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })