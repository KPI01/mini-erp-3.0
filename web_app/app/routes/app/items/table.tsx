import type { Route } from "../+types";
import DataTable from "~/components/table/data-table";
import { itemColumn, type Item } from "./definitions";
import { PrismaClient } from "@prisma/client";
import type { MetaFunction } from "react-router";
import { Header } from "../components";

export const meta: MetaFunction = () => {
    return [{ title: "Items", description: "Visualización de los items registrados." }];
};

export async function loader({ }: Route.LoaderArgs) {
    const prisma = new PrismaClient()
    const data = await prisma.item.findMany({ include: { seccion: true } })

    return { data }
}

export default function Table({ loaderData }: Route.ComponentProps) {
    const { data } = loaderData as unknown as { data: Item[] }
    console.debug(data)

    return (
        <>
            <Header>Items de la Empresa</Header>
            <DataTable data={data} columns={itemColumn} />
        </>
    )
}