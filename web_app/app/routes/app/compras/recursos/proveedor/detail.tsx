import { validateAuthSession } from "~/server/session.server";
import type { Route } from "./+types/detail";
import { updateProveedor } from "~/server/actions/proveedor.server";

export async function action({ request, params }: Route.ActionArgs) {
    const session = await validateAuthSession({ request })
    const formData = await request.formData()

    if (["put", "patch"].includes(request.method.toLowerCase())) {
        console.info("se procede a actualizar el Proveedor")
        const result = await updateProveedor({ formData, id: Number(params.proveedorId) })
    }
}