import type { Route } from "../+types";
import DataTable from "~/components/table/datatable";
import { itemColumn, type Item } from "./definitions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function loader({ }: Route.LoaderArgs) {
    const data = await prisma.item.findMany()

    return { data }
}

export default function Table({ loaderData }: Route.ComponentProps) {
    const { data } = loaderData as unknown as { data: Item[] }
    console.debug(data)

    return <DataTable data={data} columns={itemColumn} />
}