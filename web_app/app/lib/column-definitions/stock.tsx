import {
    Prisma,
} from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";


const stockColumnHelper = createColumnHelper<
    Prisma.StockGetPayload<{
        include: { item: { include: { unidadMedida: true } }; ubicacion: true };
    }>
>();
export const stockColumn = [
    stockColumnHelper.accessor("fecha", {
        header: "Fecha de movimiento",
        cell: ({ getValue }) => getValue().toLocaleString(),
        filterFn: (row, _, filterValue) => {
            const search = new Date(filterValue).toLocaleDateString();
            const current = new Date(row.original.fecha).toLocaleDateString();

            return search === current;
        },
    }),
    stockColumnHelper.accessor("descripcion", {
        id: "item",
        header: "Descripción del Artículo",
        cell: ({ row }) => row.original.item.descripcion,
        filterFn: (row, colId, filterValue) => {
            const value = String(row.getValue(colId)).toLowerCase();
            if (!filterValue) return true;
            return value.includes(String(filterValue).toLowerCase());
        },
    }),
    stockColumnHelper.accessor("cant", {
        header: "Cantidad",
        cell: ({ row }) =>
            `${row.original.cant} ${row.original.item.unidadMedida?.corto}`,
    }),
    stockColumnHelper.accessor("ubicacion.descripcion", {
        id: "ubicacion",
        header: "Ubicación",
        cell: ({ row }) => row.original.ubicacion.descripcion,
        filterFn: (row, colId, filterValue) => {
            const value = String(row.getValue(colId)).toLowerCase();
            if (!filterValue) return true;
            return value.includes(String(filterValue).toLowerCase());
        },
    }),
];
