import {
  type Item as ItemPrisma,
  type Ubicacion as UbicacionPrisma,
  type Stock as StockPrisma,
  type UnidadMedida,
  PrismaClient,
} from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnHeader } from "~/components/table/table-header";
import { format } from "date-fns";

const prisma = new PrismaClient();

export type Item = ItemPrisma & {
  ubicacion: UbicacionPrisma;
  stock: StockPrisma[];
  unidadMedida: UnidadMedida;
};
export const itemColumnHelper = createColumnHelper<Item>();
export const itemColumn = [
  itemColumnHelper.accessor("id", {
    header: "Codigo",

    filterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId);

      // Si no hay valor de filtro, no mostramos nada
      if (!filterValue) return false;

      // Si estamos filtrando por id, convertimos ambos a string para comparar
      return String(rowValue).includes(String(filterValue));
    },
  }),
  itemColumnHelper.accessor("descripcion", {
    header: "Descripcion",
  }),
  itemColumnHelper.accessor("ubicacionId", {
    header: "Ubicación",
    cell: ({ row }) => {
      if (row.original.ubicacionId) return row.original.ubicacion.descripcion;
      return "Sin ubicación";
    },
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
      return `${sum} ${und}.`;
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
    cell: ({ getValue }) =>
      format(getValue(), "'El' dd/MM/yyyy 'a las' hh:mm aaa"),
  }),
  stockColumnHelper.accessor("descripcion", {
    header: ({ header }) => (
      <ColumnHeader header={header} title="Descripción" />
    ),
  }),
  stockColumnHelper.accessor("item.descripcion", { header: "Item" }),
  stockColumnHelper.accessor("cant", {
    header: "Cantidad",
    cell: ({ row }) =>
      `${row.original.cant} ${row.original.item.unidadMedida.corto}.`,
  }),
  stockColumnHelper.accessor("item.ubicacion.descripcion", {
    header: "Ubicacion",
  }),
];
