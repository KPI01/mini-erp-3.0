import { Box, Grid, Heading } from "@radix-ui/themes";
import { validateAuthSession } from "~/server/session.server";
import type { MetaFunction } from "react-router";
import CardContructor from "~/components/ui/card";
import {
  PrismaClient,
  type Item,
  type Ubicacion,
  type UnidadMedida,
} from "@prisma/client";
import type { Route } from "./+types/reception";
import type { SelectInputOptionsType } from "~/types/components";
import { addStock } from "~/server/actions/stock.server";
import { AddStockForm } from "./forms/stock";

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

  const ubicaciones = await prisma.ubicacion.findMany();

  return { ubicaciones };
}

export async function action({ request }: Route.ActionArgs) {
  await validateAuthSession({ request });

  if (request.method.toLowerCase() === "post") {
    return await addStock(request);
  }
}

export default function Reception({ loaderData }: Route.ComponentProps) {
  let ubicaciones: SelectInputOptionsType = {};
  //@ts-ignore
  loaderData.ubicaciones.map((i: Ubicacion) => {
    ubicaciones[String(i.id)] = i.descripcion;
  });
  return (
    <Grid height="100%" style={{ gridAutoRows: "auto 1fr" }}>
      <Heading as="h1" size="9">
        Recepción de Material
      </Heading>
      <Box width="40vw" m="auto">
        <CardContructor contentProps={{ px: "6", py: "4" }}>
          <AddStockForm aux={{ ubicaciones }} />
        </CardContructor>
      </Box>
    </Grid>
  );
}
