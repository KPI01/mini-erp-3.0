import { createColumnHelper } from "@tanstack/react-table";

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