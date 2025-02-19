import { redirect } from "react-router";
import { commitSession, validateAuthSession } from "../session.server";
import { addUbicacionSchema } from "~/routes/app/items/forms";

async function addUbicacion(request: Request) {
    const session = await validateAuthSession({ request })

    const form = await request.formData()
    console.debug("ubicacionId:", form.get("ubicacionId"))
    const formData = {
        descripcion: form.get("descripcion")?.toString(),
        corto: form.get("corto")?.toString(),
        isAlmacen: Boolean(form.get("isAlmacen")) ?? false,
        ubicacionId: form.get("ubicacionId")
    }

    console.debug("validando con zod...", formData)
    const { success, data, error } = await addUbicacionSchema.refine(async (values) => {
        console.debug("zod...", values)
        if (!values.isAlmacen) {
            return typeof values.ubicacionId !== "undefined"
        }
    }, {
        message: "Debes seleccionar una ubicación.",
        path: ["ubicacionId"]
    }).safeParseAsync(formData)

    if (!success) {
        console.debug("se han encontrado errores en el formulario", error.format())
        session.flash("zodErrors", error.format())
        throw redirect("/app/items", {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }
}

export { addUbicacion }