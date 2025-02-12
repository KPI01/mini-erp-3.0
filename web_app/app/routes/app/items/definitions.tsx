import type { Seccion } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { DeleteActionDT } from "~/components/table/actions";

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
        header: "Descripción"
    }),
    itemColumnHelper.accessor(row => row.seccion.nombre, {
        header: "Sección"
    }),
    itemColumnHelper.display({
        id: "actions",
        cell: () => (<DeleteActionDT />)
    })
]

export { itemColumn }