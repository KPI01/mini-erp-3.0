import type { Route } from "../+types";
import DataTable from "~/components/table/data-table";
import { itemColumn } from "./tables";
import { PrismaClient, type Item, type Ubicacion, type UnidadMedida } from "@prisma/client";
import { type MetaFunction, data, Form } from "react-router";
import { Header } from "../components";
import { validateAuthSession } from "~/server/session.server";
import { Flex, Grid, Text } from "@radix-ui/themes";
import type { SelectInputOptionsType } from "~/types/components";
import { AddItemForm, AddUbicacionForm, AddUnidadMedidaForm } from "./forms";
import { addItem, deleteItem } from "~/server/actions/item.server";
import { validateSessionErrors } from "~/server/form-validation.server";
import { PlusIcon } from "@radix-ui/react-icons";
import AlertDialog from "~/components/ui/alert-dialog";
import Popover from "~/components/ui/popover";
import { useState } from "react";

export const meta: MetaFunction = () => {
    return [{ title: "Items", description: "Visualización de los items registrados." }];
};

export async function loader({ request }: Route.LoaderArgs) {
    const session = await validateAuthSession({ request })

    const prisma = new PrismaClient()
    const aux = {
        items: await prisma.item.findMany({
            include: { ubicacion: true, stock: true, unidadMedida: true }
        }),
        ubicaciones: await prisma.ubicacion.findMany(),
        unidades: await prisma.unidadMedida.findMany()
    }

    const sessionData = await validateSessionErrors({ session, key: "zodErrors", extraData: aux })
    if (sessionData) {
        return data(...sessionData)
    }

    return aux
}

export async function action({ request, params }: Route.ActionArgs) {

    if (request.method.toLocaleLowerCase() === "post") {
        return await addItem(request)
    }
    if (request.method.toLocaleLowerCase() === "delete") {
        return await deleteItem(request, Number(params.id))
    }
}

export default function Index({ loaderData }: Route.ComponentProps) {
    console.debug("loaderData:", loaderData)
    //@ts-ignore
    const errors = loaderData?.zodErrors
    console.error("errores:", errors)
    //@ts-ignore
    const ubicaciones = loaderData.ubicaciones.map((ub: Ubicacion) => {
        return { [String(ub.id)]: `${ub.descripcion} - ${ub.corto}` } satisfies SelectInputOptionsType
    })
    //@ts-ignore
    const unidades = loaderData?.unidades.map((und: UnidadMedida) => {
        return { [String(und.id)]: `${und.descripcion} (${und.corto}.)` } satisfies SelectInputOptionsType
    })

    return (
        <Grid gapY="4">
            <Header>Consulta de Artículo</Header>
            <Flex justify="between" align="end">
                <Text as="p" weight="light" size="1">Todos los campos que tengan (*), son obligatorios</Text>
                <Flex gapX="5" align="center" justify="end">
                    <Popover variant="surface" trigger={{ icon: <PlusIcon />, label: "Und. Medida" }}>
                        <AddUnidadMedidaForm errors={errors} />
                    </Popover>
                    <Popover variant="surface" trigger={{ label: "Ubicación", icon: <PlusIcon /> }}>
                        <AddUbicacionForm errors={errors} ubicaciones={ubicaciones} />
                    </Popover>
                    <AlertDialog
                        trigger={{ label: "Articulo", icon: <PlusIcon /> }}
                        header={{ title: "Agregando articulo", description: "Formulario para agregar un articulo." }}
                    >
                        <AddItemForm errors={errors} ubicaciones={ubicaciones} unidades={unidades} />
                    </AlertDialog>
                </Flex>
            </Flex>
            {/* @ts-ignore */}
            <DataTable data={loaderData?.items} columns={itemColumn} />
        </Grid>
    )
}