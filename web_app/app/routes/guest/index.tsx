import { redirect } from "react-router"
import type { Route } from "../+types"

export async function loader({ request }: Route.LoaderArgs) {
    const { method } = request
    if (method.toLowerCase() !== "post") return redirect("/guest/login")
}