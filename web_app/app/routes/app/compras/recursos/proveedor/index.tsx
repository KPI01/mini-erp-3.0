import { validateAuthSession } from "~/server/session.server";
import { Flex, Grid } from "@radix-ui/themes";
import { PageHeader } from "~/components/ui/header";
import DataTable from "~/components/table/data-table";
import { PrismaClient, } from "@prisma/client";
import TableQuery from "~/components/table/table-query";
import { Dialog } from "~/components/ui/dialog";
import { Pencil2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import CreateProveedorForm from "~/routes/app/compras/forms/proveedor/Create";
import { createProveedor } from "~/server/actions/proveedor.server";
import { useRef, useState } from "react";
import { proveedorColHelper, proveedorColumn } from "~/lib/column-definitions/proveedor";
import { type ColumnFiltersState, type ColumnDef } from "@tanstack/react-table";
import RowMenu from "~/components/table/actions";
import { AlertDialogContent, AlertDialogRoot } from "~/components/ui/alert-dialog";
import UpdateProveedorForm from "~/routes/app/compras/forms/proveedor/Update";
import type { Route } from "./+types/index";

const prisma = new PrismaClient();

export async function loader({ request }: Route.LoaderArgs) {
    await validateAuthSession({ request });
    const url = new URL(request.url)
    const searchParams = url.searchParams
    let data = undefined

    if (searchParams && searchParams.has("id")) {
        const id = Number(searchParams.get("id"))
        data = await prisma.proveedor.findFirst({ where: { id } })
    } else {
        data = await prisma.proveedor.findMany({ where: { activo: true } });
    }

    return { data };
}

export async function action({ request }: Route.ActionArgs) {
    await validateAuthSession({ request })

    if (request.method.toLowerCase() === "post") {
        const formData = await request.formData();
        const result = await createProveedor({ formData })
        return { ...result }
    }

}





export default function Proveedores({ loaderData, actionData }: Route.ComponentProps) {
    console.debug("loaderData:", loaderData)
    const { data } = loaderData
    const rows = (data !== null && Array.isArray(data)) ? data : []
    console.debug("actionData:", actionData)

    const [createOpen, setCreateOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const editingRef = useRef("")
    const proveedorMenu = (id: number) => [
        <Flex gapX="3" align="center" onClick={() => {
            editingRef.current = String(id)
            setEditOpen(true)
        }}><Pencil2Icon /> Editar</Flex>
    ]
    const proveedoresWithActions = () => {
        return [
            ...proveedorColumn,
            proveedorColHelper.display({
                id: "actions",
                header: "Opciones",
                cell: ({ row }) => <RowMenu items={proveedorMenu(row.original.id)} />
            })
        ]
    }
    const columns = {
        razonSocial: "Razón Social",
        idFiscal: "ID Fiscal",
        correo: "Correo"
    };
    const [filter, setFilter] = useState<ColumnFiltersState>([])

    return (
        <Grid gapY="6">
            <PageHeader title="Ingreso de Proveedor" />
            <Flex align="center" justify="between">
                <TableQuery
                    options={columns}
                    changeColumnCallback={() => {
                        setFilter([]);
                    }}

                    changeQueryCallback={
                        //@ts-ignore
                        (col, val) => {
                            setFilter([{ id: col, value: val }]);
                        }}
                />
                <Dialog
                    trigger={
                        <>
                            <PlusCircledIcon /> Agregar proveedor
                        </>
                    }
                    header={{
                        title: "Agregando un nuevo Proveedor",
                        description: "Ingresa los datos del proveedor para registrarlo."
                    }}
                    state={{
                        open: createOpen,
                        setOpen: setCreateOpen
                    }}
                >
                    <CreateProveedorForm submitFn={() => setCreateOpen(!createOpen)} />
                </Dialog>
            </Flex>
            <DataTable
                columns={proveedoresWithActions() as ColumnDef<any>[]}
                data={rows}
                state={{
                    filter,
                    onFilterChange: setFilter,
                    showPagination: true,
                    changePageSize: true
                }}
            />
            <AlertDialogRoot state={{ open: editOpen, onOpenChange: setEditOpen }}>
                <AlertDialogContent header={{
                    title: "Modificando los datos del proveedor",
                    description: "Ingresa los datos actualizados del proveedor."
                }}>
                    <UpdateProveedorForm id={editingRef.current} submitFn={() => setEditOpen(false)} />
                </AlertDialogContent>
            </AlertDialogRoot>
        </Grid>
    );
}
