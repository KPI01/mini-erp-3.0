import { PrismaClient, type User } from "@prisma/client";
import { loginSchema, registerSchema } from "../lib/auth/schemas.server";
import { redirect, } from "react-router";
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

    const { data, error, success } = await registerSchema.safeParseAsync(formData)

    if (!success) {
        console.error("se han encontrado errores en el formulario`")
        session.flash("zodErrors", error.format())
        throw redirect(routes.register, {
            headers: {
                "Set-Cookie": await commitSession(session)
            }
        })
    }

    console.debug("creando usuario...")
    let user = await prisma.user.create({
        data: {
            name: data.name,
            username: data.username,
            email: data.email,
            password: await hashPassword(data.password)
        }
    })

    console.debug("guardando usuario en sesión....")
    session.set("user", {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username
    })

    throw redirect(routes.app, {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    })
}

async function login(request: Request) {
    console.debug("Creando sesión...")
    const session = await getSession(request.headers.get("Cookie"))

    const form = await request.formData();
    const formData: Pick<Partial<User>, "username" | "password"> = {
        username: form.get("username")?.toString(),
        password: form.get("password")?.toString()
    }

    console.debug("validando con zod...")
    const { data, error, success } = await loginSchema.safeParseAsync(formData)

    if (!success) {
        console.error("se han encontrado errores en el formulario")
        session.flash("zodErrors", error.format())
        throw redirect(routes.login, {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }

    console.debug("buscando en la base de datos...")
    let user = await prisma.user.findFirst({
        where: { username: data.username }
    }).then(async (user) => {
        if (!user) {
            console.error('usuario no encontrado')
            prisma.$disconnect();
            throw redirect(routes.login, {
                status: 401,
                statusText: 'Usuario no encontrado'
            })
        }

        console.debug('Usuario encontrado:', user)
        prisma.$disconnect();

        const validPassword = await validatePassword(data.password, user.password)
        if (!validPassword) {
            session.flash("error", {
                password: "Clave incorrecta"
            })
            throw redirect(routes.login, {
                headers: {
                    "Set-Cookie": await commitSession(session)
                }
            })
        }


        return user;

    })
    console.debug("guardando usuario en sesión...")
    session.set("user", {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username
    })

    throw redirect(routes.app, {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    })
}

async function logout(request: Request) {
    const { headers, method, url } = request
    const session = await getSession(headers.get("Cookie"))

    if (method.toLowerCase() !== "post") {
        console.debug("Solo se admiten peticiones POST")
        throw redirect(url)
    }
    console.debug("La petición es POST")

    if (session.has("user")) {
        console.debug("Cerrando sesión...")
        throw redirect(routes.login, {
            headers: {
                "Set-Cookie": await destroySession(session)
            }
        })
    }
}

export { register, login, logout }