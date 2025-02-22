import { Box, Grid, Heading } from "@radix-ui/themes";
import { validateAuthSession } from "~/server/session.server";
import type { MetaFunction } from "react-router";
import CardContructor from "~/components/ui/card";
import { AddStockForm } from "./forms";
import { PrismaClient, type Item, type UnidadMedida } from "@prisma/client";
import type { Route } from "./+types/reception";
import type { SelectInputOptionsType } from "~/types/components";
import { addStock } from "~/server/actions/stock.server";

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

  const items = await prisma.item.findMany({
    where: { activo: true },
    include: { ubicacion: false, stock: false, unidadMedida: true },
  });
  return { items };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await validateAuthSession({ request });

  if (request.method.toLowerCase() === "post") {
    return await addStock(request);
  }
}

export default function Reception({ loaderData }: Route.ComponentProps) {
  let items: SelectInputOptionsType = {};
  //@ts-ignore
  loaderData.items.map((i: Item & { unidadMedida: UnidadMedida }) => {
    items[String(i.id)] = i.descripcion;
  });
  return (
    <Grid height="100%" style={{ gridAutoRows: "auto 1fr" }}>
      <Heading as="h1" size="8">
        Recepción de Material
      </Heading>
      <Box width="40vw" m="auto">
        <CardContructor
          title="Ingresa los datos del movimiento"
          contentProps={{ px: "6", py: "4" }}
        >
          <AddStockForm aux={{ items, itemsObj: loaderData.items }} />
        </CardContructor>
      </Box>
    </Grid>
  );
}
