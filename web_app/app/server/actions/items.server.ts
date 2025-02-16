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
        descripcion: form.get("descripcion")?.toString(),
        activo: Boolean(form.get("activo")),
        ubicacionId: String(form.get("ubicacionId")),
        stockMin: Number(form.get("stockMin")),
        stockMax: Number(form.get("stockMax")),
        precio: Number(form.get("precio"))
    }

    console.debug("validando con zod...")
    const { success, data, error } = await addItemSchema.safeParseAsync(formData)

    if (!success) {
        console.debug("se han encontrado errores en el formulario:")
        session.flash("zodErrors", error.format())
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }

    console.debug("creando Item...")
    let item = await prisma.item.create({
        data: {
            descripcion: data?.descripcion,
            activo: data?.activo,
            precio: data?.precio,
            stockMax: data?.stockMax,
            stockMin: data?.stockMin,
            ubicacionId: Number(data?.ubicacionId)
        }
    }
    ).then(async (item) => {
        console.debug("", item)
        if (!item) return undefined
        return item
    }).catch(async (e) => {
        console.error(e)
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