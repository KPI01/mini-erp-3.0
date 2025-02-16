import { PrismaClient } from "@prisma/client";
import { redirect, type Session } from "react-router";
import { addItemSchema, type addItemSchemaType } from "~/routes/app/items/forms";
import { commitSession, getSession, validateAuthSession } from "../session.server";

const routes = {
    base: "/app/items"
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

export { addItem }