import { PrismaClient, type User } from "@prisma/client";
import { registerSchema } from "./schemas";
import { data as dataFn, redirect } from "react-router";
import { saveInSession, sessionStorage } from "./session";

const registerRoute = "/guest/register"

let prisma = new PrismaClient()

export async function register(request: Request) {
    console.info("Registrando usuario...")
    const form = await request.formData();
    const formData: Omit<Partial<User & { confirmation: string }>, "id"> = {
        name: form.get("name")?.toString(),
        username: form.get("username")?.toString(),
        email: form.get("email")?.toString(),
        password: form.get("password")?.toString(),
        confirmation: form.get("confirmation")?.toString()
    }

    const { data, error } = await registerSchema.safeParseAsync(formData)

    if (error) return dataFn({ errors: error.format() }, { status: 400 })

    let user = await prisma.user.create({
        data: {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password
        }
    })

    const session = await sessionStorage.getSession();
    await saveInSession(session, { user });
    const headers = new Headers({
        "Set-Cookie": await sessionStorage.commitSession(session)
    })

    throw redirect("/app", { headers })
}