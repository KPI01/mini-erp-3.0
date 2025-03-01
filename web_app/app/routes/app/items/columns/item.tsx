import { createColumnHelper } from "@tanstack/react-table";
import type { ItemPedido } from "../forms/item";
import type { Item, UnidadMedida } from "@prisma/client";

export const addItemToFormColHelper = createColumnHelper<ItemPedido>();
export const addItemToFormCol = [
  addItemToFormColHelper.accessor("id", { header: "Código" }),
  addItemToFormColHelper.accessor("descripcion", { header: "Descripción" }),
  addItemToFormColHelper.accessor("unidadMedida.corto", {
    header: "Und. de Medida",
  }),
];

export type ItemInPedido = Pick<Item, "id" | "descripcion"> & {
  unidadMedida: string;
  cant: number;
};
export const itemInPedidoColHelper = createColumnHelper<ItemInPedido>();
export const itemInPedidoCol = [
  itemInPedidoColHelper.display({
    id: "index",
    header: "Nº",
    cell: ({ row }) => row.index + 1,
  }),
  itemInPedidoColHelper.accessor("id", {
    header: "Código",
  }),
  itemInPedidoColHelper.accessor("descripcion", {
    header: "Descripción del artículo",
  }),
  itemInPedidoColHelper.accessor("cant", {
    header: "Cantidad",
    cell: ({ getValue, row }) => `${getValue()} ${row.original.unidadMedida}.`,
  }),
];
