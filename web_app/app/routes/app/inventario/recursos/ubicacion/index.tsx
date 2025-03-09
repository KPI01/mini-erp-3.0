import { commitSession, validateAuthSession } from "~/server/session.server";
import { redirect } from "react-router";
import { createUbicacion } from "~/server/actions/ubicacion.server";
import { PrismaClient } from "@prisma/client";
import type { Route } from "../../../ubicacion/+types";

const prisma = new PrismaClient();

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const isAlmacenParam = url.searchParams.get("isAlmacen");

    // Parse the isAlmacen parameter
    const isAlmacen =
        isAlmacenParam === "true"
            ? true
            : isAlmacenParam === "false"
                ? false
                : null;

    // Build the query based on whether isAlmacen filter was provided
    const where = isAlmacen !== null ? { isAlmacen } : {};

    // Query the database
    const ubicaciones = await prisma.ubicacion.findMany({
        where,
        orderBy: { descripcion: "asc" },
    });

    return { ubicaciones };
}

export async function action({ request }: Route.ActionArgs) {
    const session = await validateAuthSession({ request });

    if (request.method.toLocaleLowerCase() === "post") {
        console.debug("la petición es POST");
        const data = await createUbicacion(request);
        session.flash("info", {
            description: "Creada UnidadMedida",
            payload: data,
        });
        throw redirect("/app/items", {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }
}
