import { redirect } from "react-router";
import type { Route } from "./+types";
import { logout } from "~/server/auth.server";
import { validateAuthSession } from "~/server/session.server";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await validateAuthSession({ request })

    if (request.method.toLowerCase() !== "post") return redirect("/guest/login")
}

export async function action({ request }: Route.ActionArgs) {
    return await logout(request)
}
