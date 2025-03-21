import { redirect } from "react-router";
import { commitSession, validateAuthSession } from "~/server/session.server";
import {
    getUbicacion,
    updateUbicacion,
} from "~/server/actions/ubicacion.server";
import type { Route } from "./+types/detail";

export async function loader({ request, params }: Route.LoaderArgs) {
    const session = await validateAuthSession({ request });

    if (!params.ubicacionId) {
        session.flash("error", "ID de ubicación no proporcionado");
        throw redirect("/app/inventario/recepcuon", {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }

    return await getUbicacion(request, Number(params.ubicacionId));
}

export async function action({ request, params }: Route.ActionArgs) {
    const session = await validateAuthSession({ request });

    if (!params.ubicacionId) {
        session.flash("error", "ID de ubicación no proporcionado");
        throw redirect("/app/inventario/recepcion", {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }

    const method = request.method.toLowerCase();

    if (method === "put" || method === "patch") {
        return await updateUbicacion(request, Number(params.ubicacionId));
    }

    session.flash("error", `Método no soportado: ${request.method}`);
    throw redirect("/app/inventario/recpecion", {
        headers: { "Set-Cookie": await commitSession(session) },
    });
}
