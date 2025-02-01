import { redirect } from "react-router";
import { PrismaClient, type User } from "@prisma/client";
import { sessionStorage, saveInSession } from "./session";

const loginRoute = '/guest/login';

let prisma = new PrismaClient();

export async function login(request: Request) {
    console.log("Iniciando sesión...")
    const form = await request.formData();
    const username = form.get('username');
    const password = form.get('password');

    if (!username || !password) {
        console.log('Alguno de los datos esta vacío')
        throw redirect(loginRoute, {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
            statusText: 'Mala petición'
        })
    }

    if (typeof username === 'string' && typeof password === 'string') {
        let user = await prisma.user.findFirst({
            where: { username, password }
        }).then(async (user) => {
            if (!user) {
                console.log('Usuario no encontrado')
                prisma.$disconnect();
                throw redirect(loginRoute, {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusText: 'Usuario no encontrado'
                })
            }

            console.log('Usuario encontrado:', user)
            prisma.$disconnect();
            return user;
        })
        console.log('usuario:', user)
        const sessionUser: Omit<User, "password"> = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        };

        const session = await sessionStorage.getSession();
        await saveInSession(session, { user: sessionUser });
        const headers = new Headers({
            "Set-Cookie": await sessionStorage.commitSession(session)
        })

        throw redirect("/app", { headers })
    }

    throw redirect(loginRoute, {
        status: 400,
        headers: {
            'Content-Type': 'application/json',
        },
        statusText: 'Mala petición'
    })
}