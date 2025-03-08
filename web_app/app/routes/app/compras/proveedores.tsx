import { validateAuthSession } from "~/server/session.server";
import type { Route } from "./+types/proveedores";
import { Flex, Grid } from "@radix-ui/themes";
import { PageHeader } from "~/components/ui/header";
import DataTable from "~/components/table/data-table";
import { PrismaClient } from "@prisma/client";
import { baseProveedorColumn } from "~/lib/column-definitions/proveedor";
import TableQuery from "../items/forms/tableQuery";
import { Dialog } from "~/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import CreateProveedorForm from "./forms/proveedor/Create";
import { createProveedor } from "~/server/actions/proveedor.server";
import { useState } from "react";

const prisma = new PrismaClient();

export async function loader({ request }: Route.LoaderArgs) {
  await validateAuthSession({ request });

  const proveedores = await prisma.proveedor.findMany();

  return { proveedores };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await validateAuthSession({ request })

  if (request.method.toLowerCase() === "post") {
    const formData = await request.formData();
    const action = await createProveedor({ formData })
    return { ...action }
  }

}

export default function Proveedores({ loaderData, actionData }: Route.ComponentProps) {
  console.debug("laoderData:", loaderData)
  console.debug("actionData:", actionData)

  const [createOpen, setCreateOpen] = useState(false)
  return (
    <Grid gapY="6">
      <PageHeader title="Ingreso de Proveedor" />
      <Flex align="center" justify="between">
        <TableQuery placeholder="Ingresa el nombre del proveedor:" />
        <Dialog
          trigger={
            <>
              <PlusCircledIcon /> Agregar proveedor
            </>
          }
          header={{
            title: "Agregando un nuevo Proveedor",
            description: "Ingresa los datos del proveedor para almacernalos."
          }}
          state={{
            open: createOpen,
            setOpen: setCreateOpen
          }}
        >
          <CreateProveedorForm submitFn={() => setCreateOpen(!createOpen)} />
        </Dialog>
      </Flex>
      <DataTable data={loaderData.proveedores} columns={baseProveedorColumn} />
    </Grid>
  );
}
