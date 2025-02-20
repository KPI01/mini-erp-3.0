import { PrismaClient } from "@prisma/client";
import { redirect } from "react-router";
import { addItemSchema, editItemSchema, type AddItemType, type EditItemType } from "~/routes/app/items/forms";
import { commitSession, validateAuthSession } from "../session.server";

const routes = {
    base: "/app/items",
}

const prisma = new PrismaClient()

async function addItem(request: Request) {
    const session = await validateAuthSession({ request })

    const form = await request.formData()
    const formData: Partial<AddItemType> = {
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


async function updateItem(request: Request, id: number) {
    console.debug("validando sesion...")
    const session = await validateAuthSession({ request })

    const form = await request.formData()
    const formData: EditItemType = {
        descripcion: String(form.get("descripcion")),
        ubicacionId: form.get("ubicacionId")?.toString(),
        activo: Boolean(form.get("activo")),
        stockMax: form.get("stockMax") ? Number(form.get("stockMax")?.toString()) : undefined,
        stockMin: form.get("stockMin") ? Number(form.get("stockMax")?.toString()) : undefined
    }

    console.debug("validando con zod...", formData)
    const { success, data, error } = editItemSchema.refine(
        ({ descripcion }) => descripcion !== "",
        { message: "La descripción no puede estar vacía.", path: ["descripcion"] }
    ).safeParse(formData)

    if (!success) {
        console.debug("se han encontrado errores en el formulario", error.format())
        session.flash("zodErrors", error.format())
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }

    console.debug(`actualizando Item [${id}]...`, data)
    const item = await prisma.item.update({
        where: { id: Number(id) },
        data: {
            descripcion: data.descripcion,
            activo: data.activo,
            ubicacionId: Number(data.ubicacionId),
            stockMax: data.stockMax,
            stockMin: data.stockMin
        },
    }).catch(async (e) => {
        console.error(e)
        throw e
    })

    session.flash("info", { description: "Se ha actualizado el Item", payload: item })
    throw redirect(routes.base, { headers: { "Set-Cookie": await commitSession(session) } })
}

async function clearItem(id: number) {
    await prisma.item.update({ where: { id }, data: { ubicacionId: null, unidadMedidaId: null } })
    console.debug("El item ya no tiene relaciones...")
    await prisma.stock.deleteMany({ where: { itemId: id } })
    console.debug("El item ya no tiene movimientos...")
}
async function deleteItem(request: Request, id: number) {
    console.debug("validando sesión...")
    const session = await validateAuthSession({ request })

    if (id) {
        console.debug("eliminando Item...")
        await clearItem(id)
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

export { addItem, updateItem, deleteItem }