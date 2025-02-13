import type { Route } from "../+types";
import DataTable from "~/components/table/data-table";
import { itemColumn, type Item } from "./definitions";
import { PrismaClient } from "@prisma/client";
import type { MetaFunction } from "react-router";
import { Header } from "../components";
import type { Routes } from "~/types/session";
import { validateAuthSession } from "~/server/session.server";

const route: Routes = "inventory.items"

export const meta: MetaFunction = () => {
    return [{ title: "Items", description: "Visualización de los items registrados." }];
};

export async function loader({ request }: Route.LoaderArgs) {
    const session = await validateAuthSession({ request, data: { route } })

    const prisma = new PrismaClient()
    const data = await prisma.item.findMany({ include: { seccion: true, stock: true } })

    return { data }
}

export default function Index({ loaderData }: Route.ComponentProps) {
    const { data } = loaderData as unknown as { data: Item[] }
    console.debug(data)

    return (
        <>
            <Header>Consulta de Artículo</Header>
            {/* @ts-ignore */}
            <DataTable data={data} columns={itemColumn} />
        </>
    )
}