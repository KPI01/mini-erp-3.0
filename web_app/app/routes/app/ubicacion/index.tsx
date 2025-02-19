import { commitSession, validateAuthSession } from "~/server/session.server";
import type { Route } from "../+types";
import { redirect } from "react-router";
import { addUbicacion } from "~/server/actions/ubicacion.server";

export async function action({ request }: Route.ActionArgs) {
    const session = await validateAuthSession({ request })

    if (request.method.toLocaleLowerCase() === "post") {
        console.debug("la petición es POST")
        const data = await addUbicacion(request)
        session.flash("info", { description: "Creada UnidadMedida", payload: data })
        throw redirect("/app/items", {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }
}
