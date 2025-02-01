import { createCookieSessionStorage } from "react-router";
import { config } from "dotenv"
import { createSecret } from "../lib/auth/secrets.server";

config()

const COOKIE_NAME = process.env.SESSION_NAME || "__session"
const SECRET = process.env.SESSION_SECRET
    ? [ process.env.SESSION_SECRET ]
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

export { getSession, commitSession, destroySession }