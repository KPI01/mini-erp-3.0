import type { Route } from "../+types";
import DataTable from "~/components/table/data-table";
import { itemColumn, itemColumnHelper } from "./tables";
import {
  PrismaClient,
  type Item,
  type Ubicacion,
  type UnidadMedida,
} from "@prisma/client";
import { type MetaFunction, data, Form } from "react-router";
import { Header } from "../components";
import { validateAuthSession } from "~/server/session.server";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import type { SelectInputOptionsType } from "~/types/components";
import {
  AddItemForm,
  AddUbicacionForm,
  AddUnidadMedidaForm,
  EditItemForm,
  type EditItemType,
} from "./forms";
import { addItem, deleteItem } from "~/server/actions/item.server";
import { validateSessionErrors } from "~/server/form-validation.server";
import { CubeIcon, PlusIcon } from "@radix-ui/react-icons";
import AlertDialog from "~/components/ui/alert-dialog";
import Popover from "~/components/ui/popover";
import { RowActions } from "~/components/table/actions";

export const meta: MetaFunction = () => {
  return [
    { title: "Items", description: "Visualización de los items registrados." },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await validateAuthSession({ request });

  const prisma = new PrismaClient();
  const aux = {
    items: await prisma.item.findMany({
      include: { ubicacion: true, stock: true, unidadMedida: true },
    }),
    ubicaciones: await prisma.ubicacion.findMany(),
    unidades: await prisma.unidadMedida.findMany(),
  };

  const sessionData = await validateSessionErrors({
    session,
    key: "zodErrors",
    extraData: aux,
  });
  if (sessionData) {
    return data(...sessionData);
  }

  return aux;
}

export async function action({ request, params }: Route.ActionArgs) {
  if (request.method.toLocaleLowerCase() === "post") {
    return await addItem(request);
  }
  if (request.method.toLocaleLowerCase() === "delete") {
    return await deleteItem(request, Number(params.id));
  }
}

export default function Index({ loaderData }: Route.ComponentProps) {
  console.debug("loaderData:", loaderData);
  //@ts-ignore
  const errors = loaderData?.zodErrors;
  if (errors) console.error("errores:", errors);
  let ubicaciones: SelectInputOptionsType = {};
  //@ts-ignore
  loaderData.ubicaciones.map((ub: Ubicacion) => {
    ubicaciones[String(ub.id)] = `${ub.descripcion} - ${ub.corto}`;
  });
  console.debug("ubicaciones:", ubicaciones);
  let unidades: SelectInputOptionsType = {};
  //@ts-ignore
  loaderData?.unidades.map((und: UnidadMedida) => {
    unidades[String(und.id)] = `${und.descripcion} - ${und.corto}`;
  });
  console.debug("unidades:", unidades);
  let itemColumnWithActions = [
    ...itemColumn,
    itemColumnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <RowActions
          id={String(row.original.id)}
          route="/app/items"
          values={row.original}
          editForm={{
            children: (
              <EditItemForm
                id={row.original.id}
                defaults={row.original as any}
                aux={ubicaciones}
                errors={errors}
              />
            ),
          }}
          aux={ubicaciones}
          errorBag={errors}
        />
      ),
    }),
  ];

  return (
    <Grid gapY="6">
      <Heading as="h1" size="8">
        Consulta de Articulo
      </Heading>
      <Flex justify="between" align="end" maxHeight="fit-content">
        <Text as="p" weight="light" size="2">
          Todos los campos que tengan (*), son obligatorios
        </Text>
        <Flex
          gapX="5"
          align="center"
          justify="end"
          style={{ maxHeight: "fit-content" }}
        >
          <Popover
            variant="surface"
            trigger={
              <>
                <PlusIcon /> Und. Medida
              </>
            }
          >
            <AddUnidadMedidaForm errors={errors} />
          </Popover>
          <Popover
            variant="surface"
            trigger={
              <>
                <PlusIcon /> Ubicación
              </>
            }
          >
            {/* @ts-ignore */}
            <AddUbicacionForm errors={errors} ubicaciones={ubicaciones} />
          </Popover>
          <AlertDialog
            trigger={
              <>
                <CubeIcon /> Agregar articulo
              </>
            }
            header={{
              title: "Agregando articulo",
              description: "Formulario para agregar un articulo.",
            }}
          >
            {/* ts-ignore */}
            <AddItemForm
              errors={errors}
              ubicaciones={ubicaciones}
              unidades={unidades}
            />
          </AlertDialog>
        </Flex>
      </Flex>
      {/* @ts-ignore */}
      <DataTable data={loaderData?.items} columns={itemColumnWithActions} />
    </Grid>
  );
}
