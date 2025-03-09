import type { Prisma } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

export type ItemPedido = {
    id: number;
    descripcion: string;
    unidadMedida: string;
    cant: number;
    precio: number;
};

const itemPedidoColumnHelper = createColumnHelper<ItemPedido>();

export const itemPedidoColumns = [
    itemPedidoColumnHelper.display({
        id: "index",
        header: "Nº",
        cell: ({ row }) => row.index + 1,
    }),
    itemPedidoColumnHelper.accessor("id", {
        header: "Código",
    }),
    itemPedidoColumnHelper.accessor("descripcion", {
        header: "Descripción del artículo",
    }),
    itemPedidoColumnHelper.accessor("cant", {
        header: "Cantidad",
    }),
    itemPedidoColumnHelper.accessor("unidadMedida", {
        header: "Unidad",
    }),
    itemPedidoColumnHelper.accessor("precio", {
        header: "Precio Unitario",
        cell: ({ getValue }) => {
            const value = getValue();
            return `€${value.toFixed(2)}`;
        },
    }),
    itemPedidoColumnHelper.accessor(row => row.cant * row.precio, {
        id: "subtotal",
        header: "Subtotal",
        cell: ({ getValue }) => {
            const value = getValue();
            return `€${value.toFixed(2)}`;
        },
    }),
];

export type PriceHistoryItem = Prisma.ItemsOnPedidosGetPayload<{
    include: {
        items: {
            include: { unidadMedida: true }
        },
        pedido: {
            include: { proveedor: true }
        }
    }
}>;

// Create column helper
export const priceHistoryColumnHelper = createColumnHelper<PriceHistoryItem>();

// Define columns for the price history table
export const priceHistoryColumns = [
    priceHistoryColumnHelper.accessor("items.id", {
        header: "Código",
        filterFn: "equalsString",
    }),
    priceHistoryColumnHelper.accessor("items.descripcion", {
        header: "Descripción del artículo",
        filterFn: "includesString",
    }),
    priceHistoryColumnHelper.accessor((row) => row.items.unidadMedida?.corto, {
        header: "Unidad de Medida",
        filterFn: "includesString",
    }),
    priceHistoryColumnHelper.accessor("precio", {
        header: "Precio",
        cell: (info) => `€${info.getValue().toFixed(2)}`,
    }),
    priceHistoryColumnHelper.accessor("cant", {
        header: "Cantidad",
    }),
    priceHistoryColumnHelper.accessor("pedido.creado", {
        header: "Fecha de compra",
        cell: (info) => format(new Date(info.getValue()), "dd/MM/yyyy"),
        filterFn: (row, _, filterValue) => {
            const search = new Date(filterValue).toLocaleDateString();
            const current = new Date(row.original.pedido.creado).toLocaleDateString();

            return search === current;
        },
    }),
    priceHistoryColumnHelper.accessor("pedido.proveedor.razonSocial", {
        header: "Proveedor",
        filterFn: (row, id, filterValue) => {
            const value = String(row.getValue(id)).toLowerCase();
            if (!filterValue) return true;
            return value.includes(String(filterValue).toLowerCase());
        },
    }),
];