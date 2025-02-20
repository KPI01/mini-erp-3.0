import {
    type Item as ItemPrisma,
    type Ubicacion as UbicacionPrisma,
    type Stock as StockPrisma,
    type UnidadMedida,
    PrismaClient,
} from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnHeader } from "~/components/table/table-header";

const prisma = new PrismaClient()

export type Item = ItemPrisma & { ubicacion: UbicacionPrisma, stock: StockPrisma[], unidadMedida: UnidadMedida }
export const itemColumnHelper = createColumnHelper<Item>()
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
]

export type Stock = {
    id: string | number;
    fecha: Date | string;
    descripcion: string;
    cant: number;
    item: Item;
}
const stockColumnHelper = createColumnHelper<Stock>()
export const stockColumn = [
    stockColumnHelper.accessor("fecha", {
        header: "Fecha de movimiento",
        cell: ({ getValue }) => (new Date(getValue()).toLocaleString())
    }),
    stockColumnHelper.accessor("descripcion", {
        header: ({ header }) => (<ColumnHeader header={header} title="Descripción" />)
    }),
    stockColumnHelper.accessor("item.descripcion", {
        header: "Item"
    }),
    stockColumnHelper.accessor("cant", {
        header: "Cantidad",
        cell: ({ row, getValue }) => (`${getValue()} ${row.original.item.unidadMedida.corto}.`)
    }),
    stockColumnHelper.display({
        header: "Almacén destino",
        cell: ({ row }) => row.original.item.ubicacion.descripcion
    })
]
