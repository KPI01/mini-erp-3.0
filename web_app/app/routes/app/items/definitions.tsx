import type { Seccion } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

export type Item = {
    id: string | number;
    descripcion: string;
    activo: boolean;
    seccionId: string | number;
    seccion: Seccion
}
const itemColumnHelper = createColumnHelper<Item>()
const itemColumn = [
    itemColumnHelper.accessor("id", {
        header: "ID"
    }),
    itemColumnHelper.accessor("descripcion", {
        header: "Descripción"
    })
]

export { itemColumn }