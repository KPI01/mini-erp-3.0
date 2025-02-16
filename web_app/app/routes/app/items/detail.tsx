import { deleteItem } from "~/server/actions/items.server";
import type { Route } from "../+types";
import { Outlet } from "react-router";

export async function action({ request, params }: Route.ActionArgs) {
    if (request.method.toLocaleLowerCase() === "delete") {
        return await deleteItem(request, Number(params.id))
    }
}

export default function Detail({ actionData }: Route.ComponentProps) {
    console.debug("actionData:", actionData)
    return <Outlet />
}