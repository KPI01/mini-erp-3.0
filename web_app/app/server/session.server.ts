import { createCookieSessionStorage, redirect } from "react-router";
import { config } from "dotenv"
import { createSecret } from "../lib/auth/secrets.server";
import type { RequireAuthCookieProps, SessionData, SessionFlashData } from "~/types/session";

config()

const COOKIE_NAME = process.env.SESSION_NAME || "__session"
const SECRET = process.env.SESSION_SECRET
    ? [process.env.SESSION_SECRET]
    : createSecret()

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>({
        cookie: {
            name: COOKIE_NAME,
            maxAge: 60 ** 2,
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            secrets: SECRET
        }
    })

async function validateAuthSession({ request }: RequireAuthCookieProps) {
    const session = await getSession(request.headers.get("Cookie"))
    const user = session.get("user")

    if (user) {
        console.debug("La sesión de usuario existe")
        throw redirect("/app")
    }

    console.debug("La sesión de usuario no existe")
    return session

}

export { getSession, commitSession, destroySession, validateAuthSession }