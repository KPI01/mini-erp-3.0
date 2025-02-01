import { Outlet, redirect } from "react-router";
import { destroySession, getSession } from "~/server/session.server";
import type { Route } from "./+types";
import { logout } from "~/server/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
    console.debug("metodo:", request.method)
    if (request.method.toLowerCase() !== "post") {
        console.debug("No es una petición POST")
        throw redirect("/guest/login", { status: 400 })
    }
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"))

    console.debug("La petición es POST")
    if (session.has("user")) {
        return logout(session)
    }
}

export default function Logout() {
    return <Outlet />
}
