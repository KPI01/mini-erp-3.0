import { createCookieSessionStorage } from "react-router";
import dotenv from "dotenv";
import { handleToken } from "./token";

dotenv.config();

const cookieName = process.env.SESSION_COOKIE_NAME || "__session";
const cookieMaxAge =
    process.env.SESSION_COOKIE_AGE_HOURS
        ? 60 * 60 * Number(process.env.SESSION_COOKIE_AGE_HOURS)
        : 60 * 60 * 2;

console.log("Nombre de la cookie:", cookieName);
console.log("Duración de la cookie (segundos):", cookieMaxAge);

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: cookieName,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: cookieMaxAge,
        secrets: handleToken(),
    },
});

async function checkCookieExists(request: Request, cookieName: string) {
    const cookieHeader = request.headers.get("cookie");

    if (!cookieHeader) return false;

    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());

    return cookies.some(cookie => {
        const [ name ] = cookie.split('=');
        return name === cookieName;
    });
}


async function sessionExists(request: Request) {
    const hasCookie = await checkCookieExists(request, cookieName);

    if (!hasCookie) return undefined;

    const cookieHeader = request.headers.get("cookie");
    return sessionStorage.getSession(cookieHeader);
}

async function getSession(cookieHeader: string | null) {
    return sessionStorage.getSession(cookieHeader);
}

async function saveInSession(session: any, data: Record<string, any>) {
    for (const [ key, value ] of Object.entries(data)) {
        session.set(key, value);
    }
    return session;
}

async function destroySession(cookieHeader: string | null) {
    const session = await sessionStorage.getSession(cookieHeader);
    return sessionStorage.destroySession(session);
}

export { sessionStorage, sessionExists, saveInSession };
