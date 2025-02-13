import type { Seccion as SeccionPrisma, Stock as StockPrisma, Item as ItemPrisma } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { RowActions } from "~/components/table/actions";
import { ColumnHeader } from "~/components/table/table-header";

type Item = {
    id: string | number;
    descripcion: string;
    activo: boolean;
    seccion: SeccionPrisma
    stock: StockPrisma[]
}
const itemColumnHelper = createColumnHelper<Item>()
const itemColumn = [
    itemColumnHelper.accessor("id", {
        header: "ID"
    }),
    itemColumnHelper.accessor("descripcion", {
        header: ({ column }) => (<ColumnHeader column={column} title="Descripción" />),
        enableSorting: true,
    }),
    itemColumnHelper.accessor(row => row.seccion.nombre, {
        header: "Sección"
    }),
    itemColumnHelper.display({
        id: "stock",
        header: "Stock",
        cell: ({ cell }) => (cell.row.original.stock.reduce((s, i) => s + i.cant, 0)) + " und."
    }),
    itemColumnHelper.display({
        id: "actions",
        cell: () => (<RowActions />)
    })
]

type Stock = {
    id: string | number;
    fecha: Date | string;
    descripcion: string;
    cant: number;
    item: ItemPrisma;
}
const stockColumnHelper = createColumnHelper<Stock>()
const stockColumn = [
    stockColumnHelper.accessor("fecha", {
        header: "Fecha",
        cell: ({ cell }) => cell.getValue().toLocaleString()
    }),
    stockColumnHelper.accessor("descripcion", {
        header: "Descripción"
    }),

    stockColumnHelper.accessor("item.descripcion", {
        header: "Item"
    }),
    stockColumnHelper.accessor("cant", {
        header: "Cantidad"
    })
]

export { type Item, itemColumn, type Stock, stockColumn }