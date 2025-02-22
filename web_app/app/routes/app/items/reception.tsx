import { Box, Flex, Grid, Heading, Separator } from "@radix-ui/themes";
import type { Route } from "../+types";
import { validateAuthSession } from "~/server/session.server";
import type { MetaFunction } from "react-router";
import CardContructor from "~/components/ui/card";
import { AddStockForm } from "./forms";

export const meta: MetaFunction = () => [
  {
    title: "Recepción de Material",
    description:
      "Formulario para recibir los materiales registrados en la empresa.",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  return await validateAuthSession({ request });
}

export default function Reception() {
  return (
    <>
      <Heading as="h1" size="8">
        Recepción de Material
      </Heading>
      <Box width="40vw" m="auto">
        <CardContructor
          title="Ingresa los datos del material"
          contentProps={{ px: "6", py: "4" }}
        >
          <AddStockForm />
        </CardContructor>
      </Box>
    </>
  );
}
