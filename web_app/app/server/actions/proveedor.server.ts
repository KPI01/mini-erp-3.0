import { PrismaClient, type Prisma } from "@prisma/client"
import { z } from "zod"
import { createProveedorSchema } from "~/lib/zod-schemas/compras/proveedor"

const prisma = new PrismaClient()

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
        const checkIdFiscal = await prisma.proveedor.findFirst({
            where: { idFiscal: d.idFiscal }
        })
        if (checkIdFiscal !== null) ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["idFiscal"],
            message: "Este ID Fiscal ya se encuentra registrado."
        })

        const checkCorreo = await prisma.proveedor.findFirst({
            where: { correo: d.correo }
        })
        if (checkCorreo !== null) ctx.addIssue({
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

export { createProveedor }