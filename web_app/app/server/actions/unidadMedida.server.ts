import { addUnidadMedidaSchema, type addUnidadMedidaType } from "~/routes/app/items/forms";
import { commitSession, validateAuthSession } from "../session.server";
import { redirect } from "react-router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function addUnidadMedida(request: Request) {
    const session = await validateAuthSession({ request })

    const form = await request.formData()
    const formData: Partial<addUnidadMedidaType> = {
        descripcion: form.get("descripcion")?.toString(),
        corto: form.get("corto")?.toString()
    }

    console.debug("validando con zod...", formData)
    const { success, data, error } = await addUnidadMedidaSchema.safeParseAsync(formData)

    if (!success) {
        console.debug("se han encontrado errores en el formulario", error.format())
        session.flash("zodErrors", error.format())
        throw redirect("/app/items", {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }

    console.debug("creando UnidadMedida...")
    const unidadMedida = await prisma.unidadMedida.create({ data })
        .then(async (und) => {
            console.debug('UnidadMediad:', und)
            if (!und) return undefined
            return und
        }).catch(async (e) => {
            console.error(e)
            throw e
        })

    return unidadMedida
}

export { addUnidadMedida }