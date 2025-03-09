import { PrismaClient, type Prisma } from "@prisma/client"
import { z } from "zod"
import { createProveedorSchema, updateProveedorSchema, } from "~/lib/zod-schemas/compras/proveedor"

const prisma = new PrismaClient()

async function uniqueExists(key: string, value: any) {
    const existance = await prisma.proveedor.findFirst({ where: { [key]: value } })

    if (existance !== null) {
        return true
    } else {
        return false
    }
}

interface CreateProveedorProps {
    formData: FormData
}
async function createProveedor({ formData }: CreateProveedorProps): Promise<{ success: boolean, payload: Record<string, any> }> {
    const input = {
        razonSocial: String(formData.get("razonSocial")),
        idFiscal: String(formData.get("idFiscal")),
        correo: String(formData.get("correo")),
        direccion: String(formData.get("direccion")),
        telefono: formData.get("telefono")?.toString() ?? null,
        url: formData.get("url")?.toString() ?? null,
        observaciones: formData.get("observaciones")?.toString() ?? null
    } satisfies Omit<Prisma.ProveedorCreateInput, "activo" | "Pedido">

    console.debug("validando con zod...")
    const { success, data, error } = await createProveedorSchema.superRefine(async (d, ctx) => {
        if (await uniqueExists("idFiscal", d.idFiscal)) ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["idFiscal"],
            message: "Este ID Fiscal ya se encuentra registrado."
        })

        if (await uniqueExists("correo", d.correo)) ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["correo"],
            message: "Este correo ya se encuentra registrado."
        })
    }).safeParseAsync(input)

    if (!success) {
        console.error("se han encontrado errores en el formulario", error.format())
        return { success, payload: error.format() }
    }

    console.info("creando Proveedor...")
    const proveedor = await prisma.proveedor.create({ data })
        .catch(async (e) => {
            console.error("error al crear Proveedor", e)
            throw e
        })

    return { success, payload: proveedor }
}

interface UpdateProveedorProps {
    formData: FormData;
    id: number
}
async function updateProveedor({ formData, id }: UpdateProveedorProps) {
    const input = {
        razonSocial: String(formData.get("razonSocial")),
        idFiscal: String(formData.get("idFiscal")),
        direccion: String(formData.get("direccion")),
        correo: String(formData.get("correo")),
        activo: Boolean(formData.get("activo")),
        url: formData.get("url")?.toString() ?? null,
        telefono: formData.get("telefono")?.toString() ?? null,
        observaciones: formData.get("observaciones")?.toString() ?? null,
    } satisfies Omit<Prisma.ProveedorUpdateInput, "Pedido">

    console.debug("validando con zod...")
    const { success, data, error } = await updateProveedorSchema.safeParseAsync(input)

    if (!success) {
        console.error("se han encontrado errores en el formulario", error.format())
        return { success, payload: error.format() }
    }

    console.info(`actualizando Proveedor[${id}] con...`, data)
    const proveedor = await prisma.proveedor.update({
        where: { id },
        data
    })
        .catch(async (e) => {
            console.error("error al actualizar Proveedor", e)
            throw e
        })

    return { success, payload: proveedor }
}

export { createProveedor, updateProveedor }