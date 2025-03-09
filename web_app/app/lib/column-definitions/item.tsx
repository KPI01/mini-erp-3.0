import { createColumnHelper } from "@tanstack/react-table";
import type { Item as ItemPrisma, Stock, Ubicacion, UnidadMedida } from "@prisma/client";
import type { ItemRecepcion } from "~/routes/app/inventario/forms/item/AddToRecepcion";


export type Item = ItemPrisma & {
  ubicacion: Ubicacion;
  stock: Stock[];
  unidadMedida: UnidadMedida;
};
export const itemColumnHelper = createColumnHelper<Item>();
export const itemColumn = [
  itemColumnHelper.accessor("id", {
    header: "Código",

    filterFn: (row, colId, filterValue) => {
      const value = row.getValue(colId);
      if (!filterValue) return false;
      return String(value).includes(String(filterValue));
    },
  }),
  itemColumnHelper.accessor("descripcion", {
    header: "Descripción",
  }),
  itemColumnHelper.accessor("stockMin", {
    header: "Stock Mínimo",
  }),
  itemColumnHelper.accessor("stockMax", {
    header: "Stock Máximo",
  }),
  itemColumnHelper.accessor((col) => col.stock, {
    header: "Stock Actual",
    cell: ({ cell, row }) => {
      let sum = 0;
      cell.getValue().map((mov) => {
        sum += mov.cant;
      });
      const und = row.original.unidadMedida.corto;
      return `${sum} ${und}`;
    },
  }),
];

export const addItemToFormColHelper = createColumnHelper<ItemRecepcion>();
export const addItemToFormCol = [
  addItemToFormColHelper.accessor("id", { header: "Código" }),
  addItemToFormColHelper.accessor("descripcion", { header: "Descripción" }),
  addItemToFormColHelper.accessor("unidadMedida.corto", {
    header: "Und. de Medida",
  }),
];

export type ItemInPedido = Pick<ItemPrisma, "id" | "descripcion"> & {
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
