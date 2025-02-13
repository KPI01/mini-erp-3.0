import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            name: "Jorge",
            username: "jlrd",
            email: "correo@gmail.com",
            password: hashSync("39LCjK!&", 10)
        }
    })
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