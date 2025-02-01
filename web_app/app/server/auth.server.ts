import { PrismaClient, type User } from "@prisma/client";
import { registerSchema } from "../lib/auth/schemas.server";
import { data as dataFn, redirect, type Session } from "react-router";
import { commitSession, destroySession, getSession } from "~/server/session.server";
import { hashPassword, validatePassword } from "~/lib/auth/encrypt.server";

const routes = {
    login: "/guest/login",
    register: "/guest/register",
    app: "/app"
}

let prisma = new PrismaClient()

async function register(request: Request) {
    console.info("Registrando usuario...")
    const session = await getSession(request.headers.get("Cookie"))

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
            password: await hashPassword(data.password)
        }
    })

    session.set("user", {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username
    })
    const headers = new Headers({
        "Set-Cookie": await commitSession(session)
    })

    throw redirect(routes.app, { headers })
}

async function login(request: Request) {
    console.debug("Iniciando sesión...")
    const session = await getSession(request.headers.get("Cookie"))
    const form = await request.formData();
    const username = form.get('username');
    const password = form.get('password');

    if (!username || !password) {
        console.log('Alguno de los datos esta vacío')
        throw redirect(routes.login, {
            status: 400,
            statusText: 'Mala petición'
        })
    }

    if (typeof username === 'string' && typeof password === 'string') {
        let user = await prisma.user.findFirst({
            where: { username }
        }).then(async (user) => {
            if (!user) {
                console.log('Usuario no encontrado')
                prisma.$disconnect();
                throw redirect(routes.login, {
                    status: 401,
                    statusText: 'Usuario no encontrado'
                })
            }

            console.debug('Usuario encontrado:', user)
            prisma.$disconnect();

            const validPassword = await validatePassword(password, user.password)
            if (!validPassword) {
                throw redirect(routes.login, {
                    status: 400,
                    statusText: "Combinación usuario/clave incorrecta"
                })
            }


            return user;

        })
        console.debug('usuario:', user)

        session.set("user", {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username
        })

        const headers = new Headers({
            "Set-Cookie": await commitSession(session)
        })

        throw redirect(routes.app, { headers })
    }

    throw redirect(routes.login, {
        status: 400,
        headers: {
            'Content-Type': 'application/json',
        },
        statusText: 'Mala petición'
    })
}

async function logout(session: Session) {

    throw redirect(routes.login, {
        headers: {
            "Set-Cookie": await destroySession(session)
        }
    })
}

export { register, login, logout }