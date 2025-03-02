import { createColumnHelper } from "@tanstack/react-table";
import type { Item } from "@prisma/client";
import type { ItemPedido } from "~/routes/app/items/forms/item";

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
  }),
  itemInPedidoColHelper.accessor("unidadMedida", {
    header: "Unidad",
  }),
];
