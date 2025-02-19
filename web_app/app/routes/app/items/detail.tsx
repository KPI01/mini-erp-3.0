import { deleteItem } from "~/server/actions/item.server";
import type { Route } from "../+types";
import { validateAuthSession } from "~/server/session.server";

export async function loader({ request }: Route.LoaderArgs) {
    await validateAuthSession({ request })
}

export async function action({ request, params }: Route.ActionArgs) {
    if (request.method.toLocaleLowerCase() === "delete") {
        return await deleteItem(request, Number(params.id))
    }
}
