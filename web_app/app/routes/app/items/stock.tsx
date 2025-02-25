import { validateAuthSession } from "~/server/session.server";
import { PrismaClient } from "@prisma/client";
import type { MetaFunction } from "react-router";
import DataTable from "~/components/table/data-table";
import { stockColumn } from "./tables";
import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import { type ColumnDef, type ColumnFiltersState } from "@tanstack/react-table";
import type { Route } from "./+types/stock";
import { useMemo, useState, type ChangeEvent } from "react";
import SelectInput from "~/components/forms/select";
import { InputField } from "~/components/forms/input";
import { Label } from "radix-ui";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    {
      title: "Stock",
      description:
        "Visualización de los movimientos de los materiales de la empresa.",
    },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  await validateAuthSession({ request });
  const stock = await prisma.stock.findMany({
    include: { item: { include: { unidadMedida: true, ubicacion: true } } },
  });

  return { stock };
}

export default function Stock({ loaderData }: Route.ComponentProps) {
  const { stock } = loaderData;

  const columns = {
    fecha: "Fecha",
    item: "Artículo",
    ubicacion: "Ubicación",
  };
  const [column, setColumn] = useState<keyof typeof columns>("item");
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<ColumnFiltersState>([]);

  function handleColumnChange(value: keyof typeof columns) {
    setQuery("");
    setFilter([]);
    setColumn(value);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    console.debug(`valor para [${column}]:`, input);

    setQuery(input);
    setFilter([{ id: column, value: input }]);
  }

  function clearInput() {
    setQuery("");
    setFilter([]);
  }

  return (
    <Grid gapY="8">
      <Heading as="h1" size="9">
        Rotación de Material
      </Heading>
      <Grid columns="1" gapY="2">
        <Label.Root>Ingresa un valor para iniciar la búsqueda:</Label.Root>
        <Flex gapX="3" align="center">
          <SelectInput
            name="column"
            options={columns}
            state={{
              value: column,
              changer: handleColumnChange,
            }}
          />
          <InputField
            input={{
              type: column === "fecha" ? "date" : "text",
              value: query,
              onChange: handleChange,
            }}
          />
          <Button color="red" variant="outline" onClick={() => clearInput()}>
            Limpiar
          </Button>
        </Flex>
      </Grid>
      <DataTable
        data={stock}
        columns={stockColumn as ColumnDef<any>[]}
        state={{ filter, onFilterChange: setFilter }}
      />
    </Grid>
  );
}
