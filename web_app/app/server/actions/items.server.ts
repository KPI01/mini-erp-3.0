import { PrismaClient } from "@prisma/client";
import { redirect, type Session } from "react-router";
import { addItemSchema, type addItemSchemaType } from "~/routes/app/items/forms";
import { commitSession, getSession } from "../session.server";

const routes = {
    base: "/app/items"
}

const prisma = new PrismaClient()

async function addItem(session: Session, formData: addItemSchemaType) {
    console.debug("creando Item...")

    const { success, data, error } = await addItemSchema.safeParseAsync(formData)

    if (!success) {
        console.debug("se han encontrado errores en el formulario:", error)
        session.flash("zodErrors", error.format())
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }

    if (data) {
        const item = await prisma.item.create({
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
            console.debug(item)
            if (!item) return undefined
            return item
        })
        return item
    }
}

export { addItem }