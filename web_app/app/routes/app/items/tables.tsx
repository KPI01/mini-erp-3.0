import type {
    Item as ItemPrisma,
    Ubicacion as UbicacionPrisma,
    Stock as StockPrisma,
    UnidadMedida,
} from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { RowActions } from "~/components/table/actions";
import { ColumnHeader } from "~/components/table/table-header";

export type Item = ItemPrisma & { ubicacion: UbicacionPrisma, stock: StockPrisma[], unidadMedida: UnidadMedida }
const itemColumnHelper = createColumnHelper<Item>()
export const itemColumn = [
    itemColumnHelper.accessor("id", {
        header: ({ header }) => (<ColumnHeader header={header} title="Código" />),
        sortDescFirst: true
    }),
    itemColumnHelper.accessor("descripcion", {
        header: ({ header }) => (<ColumnHeader header={header} title="Descripción" />),
        enableColumnFilter: true,
        meta: {
            filterVariant: "text"
        }
    }),
    itemColumnHelper.accessor("ubicacionId", {
        header: "Ubicación",
        cell: ({ row }) => {
            if (row.original.ubicacionId) return row.original.ubicacion.descripcion
            return "Sin ubicación"
        }
    }),
    itemColumnHelper.accessor("stockMin", {
        header: "Stock Mínimo",
    }),
    itemColumnHelper.accessor("stockMax", {
        header: "Stock Máximo",
    }),
    itemColumnHelper.accessor(col => col.stock, {
        header: "Stock Actual",
        cell: ({ cell, row }) => {
            let sum = 0
            cell.getValue().map((mov) => { sum += mov.cant })
            const und = row.original.unidadMedida.corto
            return `${sum} ${und}.`
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
        header: ({ header }) => (<ColumnHeader header={header} title="Descripción" />)
    }),
    stockColumnHelper.accessor("item.descripcion", {
        header: "Item"
    }),
    stockColumnHelper.accessor("cant", {
        header: "Cantidad"
    })
]
