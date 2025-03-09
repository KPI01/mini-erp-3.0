import { deleteItem, updateItem } from "~/server/actions/item.server";
import { validateAuthSession } from "~/server/session.server";
import type { Route } from "./+types/detail";

export async function loader({ request }: Route.LoaderArgs) {
    await validateAuthSession({ request })
}

export async function action({ request, params }: Route.ActionArgs) {
    const { method } = request
    if (method.toLocaleLowerCase() === "delete") {
        return await deleteItem(request, Number(params.itemId))
    }

    if (method.toLocaleLowerCase() === "put") {
        return await updateItem(request, Number(params.itemId))
    }
}
