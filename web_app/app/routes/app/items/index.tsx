import DataTable from "~/components/table/data-table";
import { itemColumn } from "./tables";
import { PrismaClient } from "@prisma/client";
import { type MetaFunction, data } from "react-router";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import type { ColumnDef } from "@tanstack/react-table";
import { InputField } from "~/components/forms/input";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import type { Route } from "./+types";
import SelectInput from "~/components/forms/select";
import { useState, type ChangeEvent } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Items", description: "Visualización de los items registrados." },
  ];
};

export async function loader() {
  const prisma = new PrismaClient();
  const items = await prisma.item.findMany({
    include: { unidadMedida: true, ubicacion: true, stock: true },
  });

  return { items };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const columns = {
    id: "Codigo",
    descripcion: "Descripcion",
    ubicacion: "Ubicacion",
  };
  const [column, setColumn] = useState<keyof typeof columns>("id");
  const [data, setData] = useState<typeof loaderData.items>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    let filtered: typeof data = [];

    if (value === "") {
      setData([]);
      return;
    }

    filtered = loaderData.items.filter((val) => {
      if (column === "ubicacion") {
        return String(val[column]?.descripcion).toLowerCase().includes(value);
      }
      return String(val[column]).toLowerCase().includes(value);
    });

    setData(filtered);
  }
  return (
    <Grid gapY="6">
      <Heading as="h1" size="9">
        Consulta de Articulo
      </Heading>
      <Flex align="center" justify="start" gapX="2">
        <SelectInput
          name="column"
          options={columns}
          state={{
            value: column,
            changer: (value) => setColumn(value),
          }}
        />
        <InputField
          input={{
            type: "search",
            onChange: (e) => setTimeout(() => handleChange(e), 500),
          }}
        />
      </Flex>
      <DataTable data={data} columns={itemColumn as ColumnDef<any>[]} />
    </Grid>
  );
}
