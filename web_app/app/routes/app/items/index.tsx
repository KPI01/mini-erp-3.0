import DataTable from "~/components/table/data-table";
import { itemColumn } from "./tables";
import { PrismaClient } from "@prisma/client";
import { type MetaFunction, data } from "react-router";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import {
  type ColumnFiltersState,
  type ColumnDef,
  type ColumnFilter,
} from "@tanstack/react-table";
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
  };
  const [column, setColumn] = useState<keyof typeof columns>("id");
  const [filter, setFilter] = useState<ColumnFiltersState>([]);
  const [showData, setShowData] = useState(false);
  console.debug("table filters:", filter);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    console.debug(`valor para [${column}]:`, input);

    if (input !== "") setShowData(true);

    setFilter([{ id: column, value: input }]);
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
            changer: setColumn,
          }}
        />
        <InputField
          input={{
            type: "text",
            onChange: handleChange,
          }}
        />
      </Flex>
      <DataTable
        data={showData ? loaderData.items : []}
        columns={itemColumn as ColumnDef<any>[]}
        state={{
          filter,
          onFilterChange: setFilter,
        }}
      />
    </Grid>
  );
}
