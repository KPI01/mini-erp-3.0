import { PrismaClient, type Ubicacion } from "@prisma/client";
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/recepcion";
import { validateAuthSession } from "~/server/session.server";
import { createStock } from "~/server/actions/stock.server";
import { Box, Grid, Heading } from "@radix-ui/themes";
import CardContructor from "~/components/ui/card";
import { CreateStockForm } from "../../forms/stock/Create";
import type { SelectInputOptionsType } from "~/types/components";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => [
    {
        title: "Recepción de Material",
        description:
            "Formulario para recibir los materiales registrados en la empresa.",
    },
];

export async function loader({ request }: Route.LoaderArgs) {
    await validateAuthSession({ request });

    const ubicaciones = await prisma.ubicacion.findMany({});

    return { ubicaciones };
}

export async function action({ request }: Route.ActionArgs) {
    await validateAuthSession({ request });

    if (request.method.toLowerCase() === "post") {
        return await createStock(request);
    }
}

export default function Recepcion({ loaderData }: Route.ComponentProps) {
    console.log("dentro del componente en item/recepcion")
    let ubicaciones: SelectInputOptionsType = {};
    const almacenDescriptions = {} as Record<number, string>;
    loaderData.ubicaciones
        .filter((ub: Ubicacion) => ub.isAlmacen === true)
        .forEach((almacen: Ubicacion) => {
            almacenDescriptions[almacen.id] = almacen.descripcion;
        });

    loaderData.ubicaciones.forEach((ubicacion: Ubicacion) => {
        let displayValue = ubicacion.descripcion;

        if (
            ubicacion.ubicacionId &&
            ubicacion.ubicacionId > 0 &&
            almacenDescriptions[ubicacion.ubicacionId]
        ) {
            displayValue = `${displayValue} (${almacenDescriptions[ubicacion.ubicacionId]})`;
        }

        ubicaciones[String(ubicacion.id)] = displayValue;
    });

    return (
        <Grid height="100%" style={{ gridAutoRows: "auto 1fr" }}>
            <Heading as="h1" size="9">
                Recepción de Material
            </Heading>
            <Box width="40vw" m="auto">
                <CardContructor contentProps={{ px: "6", py: "4" }}>
                    <CreateStockForm aux={{ ubicaciones }} />
                </CardContructor>
            </Box>
        </Grid>
    );
}
