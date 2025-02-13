import { validateAuthSession } from "~/server/session.server";
import type { Route } from "../+types";
import type { Routes } from "~/types/session";
import { PrismaClient } from "@prisma/client";
import { Header } from "../components";
import type { MetaFunction } from "react-router";
import DataTable from "~/components/table/data-table";
import { stockColumn, type Stock } from "./definitions";

const route: Routes = "inventory.stock"

export const meta: MetaFunction = () => {
    return [{ title: "Stock", description: "Visualización de los movimientos de los materiales de la empresa." }];
};

export async function loader({ request }: Route.LoaderArgs) {
    const session = await validateAuthSession({ request, data: { route } })

    const prisma = new PrismaClient()
    const data = await prisma.stock.findMany({ include: { item: true } })

    return { data }
}

export default function Stock({ loaderData }: Route.ComponentProps) {
    const { data } = loaderData as unknown as { data: Stock[] }
    console.debug(data)
    return <>
        <Header>Ruta para mostrar stock</Header>
        {/* @ts-ignore */}
        <DataTable data={data} columns={stockColumn} />
    </>
}