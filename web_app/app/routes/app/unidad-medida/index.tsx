import { commitSession, validateAuthSession } from "~/server/session.server";
import type { Route } from "../+types";
import { addUnidadMedida } from "~/server/actions/unidadMedida.server";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
    const session = await validateAuthSession({ request })

    if (request.method.toLocaleLowerCase() === "post") {
        console.debug("la petición es POST")
        const data = await addUnidadMedida(request)
        session.flash("info", { description: "Creada UnidadMedida", payload: data })
        throw redirect("/app/items", {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }
}
