import { createCookieSessionStorage, redirect } from "react-router";
import { config } from "dotenv"
import { createSecret } from "../lib/auth/secrets";
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

    if (!session.has("user")) {
        console.debug("No existe sesion de usuario, redirigiendo")
        throw redirect("/guest", { headers: { "Set-Cookie": await commitSession(session) } })
    }

    return session
}

export { getSession, commitSession, destroySession, validateAuthSession }