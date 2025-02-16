import type {
    Item as ItemPrisma,
    Ubicacion as UbicacionPrisma,
    Stock as StockPrisma,
} from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { RowActions } from "~/components/table/actions";
import { ColumnHeader } from "~/components/table/table-header";

export type Item = ItemPrisma & { ubicacion: UbicacionPrisma, stock: StockPrisma[] }
const itemColumnHelper = createColumnHelper<Item>()
export const itemColumn = [
    itemColumnHelper.accessor("id", { header: "Código" }),
    itemColumnHelper.accessor("descripcion", {
        header: ({ column }) => (<ColumnHeader column={column} title="Descripción" />)
    }),
    itemColumnHelper.accessor(col => col.ubicacion, {
        header: "Ubicación",
        cell: ({ cell }) => (cell.getValue().descripcion)
    }),
    itemColumnHelper.accessor("precio", {
        header: "Precio",
        cell: ({ cell }) => `${cell.getValue()} €`
    }),
    itemColumnHelper.accessor("stockMin", {
        header: "Stock Mínimo",
    }),
    itemColumnHelper.accessor("stockMax", {
        header: "Stock Máximo",
    }),
    itemColumnHelper.accessor(col => col.stock, {
        header: "Stock Actual",
        cell: ({ cell }) => {
            let sum = 0
            cell.getValue().map((mov) => { sum += mov.cant })
            return `${sum} und.`
        }
    }),
    itemColumnHelper.display({
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (<RowActions id={String(row.original.id)} relativeRoute="app/items" />)
    })
]

export type Stock = {
    id: string | number;
    fecha: Date | string;
    descripcion: string;
    cant: number;
    item: ItemPrisma;
}
const stockColumnHelper = createColumnHelper<Stock>()
export const stockColumn = [
    stockColumnHelper.accessor("fecha", {
        header: "Fecha",
        cell: ({ cell }) => cell.getValue().toLocaleString()
    }),
    stockColumnHelper.accessor("descripcion", {
        header: ({ column }) => (<ColumnHeader column={column} title="Descripción" />)
    }),
    stockColumnHelper.accessor("item.descripcion", {
        header: "Item"
    }),
    stockColumnHelper.accessor("cant", {
        header: "Cantidad"
    })
]
