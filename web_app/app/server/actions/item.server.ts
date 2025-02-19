import { PrismaClient } from "@prisma/client";
import { redirect } from "react-router";
import { addItemSchema, type addItemSchemaType } from "~/routes/app/items/forms";
import { commitSession, validateAuthSession } from "../session.server";

const routes = {
    base: "/app/items",
    query: "/app/items?id="
}

const prisma = new PrismaClient()

async function addItem(request: Request) {
    const session = await validateAuthSession({ request })

    const form = await request.formData()
    const formData: Partial<addItemSchemaType> = {
        descripcion: String(form.get("descripcion")),
        activo: Boolean(form.get("activo")),
        ubicacionId: form.get("ubicacionId")?.toString(),
        unidadMedidaId: form.get("unidadMedidaId")?.toString()
    }

    console.debug("validando con zod...", formData)
    const { success, data, error } = await addItemSchema.safeParseAsync(formData)

    if (!success) {
        console.debug("se han encontrado errores en el formulario", error.format())
        session.flash("zodErrors", error.format())
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }

    console.debug("creando Item...")
    const item = await prisma.item.create({
        data: {
            descripcion: data.descripcion,
            activo: data.activo,
            unidadMedidaId: Number(data.unidadMedidaId),
            ubicacionId: Number(data.ubicacionId)
        }
    }).catch(async (e) => {
        console.error("ha ocurrido un error creando el Item...")
        throw e
    })

    return item
}

async function deleteItem(request: Request, id: number) {
    console.debug("validando sesión...")
    const session = await validateAuthSession({ request })

    if (id) {
        console.debug("eliminando Item...")
        const item = await prisma.item.delete({
            where: { id },
        }).catch(async (e) => {
            console.error("ha ocurrido un error eliminando el Item...")
            throw e
        })

        session.flash("info", { description: "Item eliminado", payload: item })
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }

    session.flash("error", "No se ha enviado ningún {id} de Item")
    throw redirect(routes.base, {
        headers: { "Set-Cookie": await commitSession(session) }
    })
}

export { addItem, deleteItem }