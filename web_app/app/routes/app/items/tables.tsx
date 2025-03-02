import {
  type Item as ItemPrisma,
  type Ubicacion as UbicacionPrisma,
  type Stock as StockPrisma,
  type UnidadMedida,
  PrismaClient,
} from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

export type Item = ItemPrisma & {
  ubicacion: UbicacionPrisma;
  stock: StockPrisma[];
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

export type Stock = {
  id: string | number;
  fecha: Date | string;
  descripcion: string;
  cant: number;
  item: Item;
};
const stockColumnHelper = createColumnHelper<Stock>();
export const stockColumn = [
  stockColumnHelper.accessor("fecha", {
    header: "Fecha de movimiento",
    cell: ({ getValue }) => getValue().toLocaleString(),
    filterFn: (row, _, filterValue) => {
      const { original } = row;
      const search = new Date(filterValue).toLocaleDateString();
      const current = new Date(row.original.fecha).toLocaleDateString();

      return search === current;
    },
  }),
  stockColumnHelper.accessor("item.descripcion", {
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
      `${row.original.cant} ${row.original.item.unidadMedida.corto}.`,
  }),
  stockColumnHelper.accessor("item.ubicacion.descripcion", {
    id: "ubicacion",
    header: "Ubicación",
    cell: ({ row }) => row.original.item.ubicacion.descripcion,
    filterFn: (row, colId, filterValue) => {
      const value = String(row.getValue(colId)).toLowerCase();
      if (!filterValue) return true;
      return value.includes(String(filterValue).toLowerCase());
    },
  }),
];
