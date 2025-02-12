import type { Seccion } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { RowActions } from "~/components/table/actions";
import { ColumnHeader } from "~/components/table/table-header";

export type Item = {
    id: string | number;
    descripcion: string;
    activo: boolean;
    seccion: Seccion
}
const itemColumnHelper = createColumnHelper<Item>()
const itemColumn = [
    itemColumnHelper.accessor("id", {
        header: "ID"
    }),
    itemColumnHelper.accessor("descripcion", {
        header: ({ column }) => (<ColumnHeader column={column} title="Descripción" />),
        enableSorting: true,
    }),
    itemColumnHelper.accessor(row => row.seccion.nombre, {
        header: "Sección"
    }),
    itemColumnHelper.display({
        id: "actions",
        cell: () => (<RowActions />)
    })
]

export { itemColumn }