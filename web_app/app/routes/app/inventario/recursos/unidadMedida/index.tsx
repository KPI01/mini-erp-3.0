import { commitSession, validateAuthSession } from "~/server/session.server";
import { createUnidadMedida } from "~/server/actions/unidadMedida.server";
import { redirect } from "react-router";
import { PrismaClient } from "@prisma/client";
import type { Route } from "./+types";

const prisma = new PrismaClient();

export async function loader({ request }: Route.LoaderArgs) {
    console.debug("dentro del loader...");
    await validateAuthSession({ request });

    const unidadMedida = await prisma.unidadMedida.findMany({});

    return { unidadMedida };
}

export async function action({ request }: Route.ActionArgs) {
    const session = await validateAuthSession({ request });

    if (request.method.toLocaleLowerCase() === "post") {
        console.debug("la petición es POST");
        const data = await createUnidadMedida(request);
        session.flash("info", {
            description: "Creada UnidadMedida",
            payload: data,
        });
        throw redirect("/app/inventario/consulta", {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }
}
