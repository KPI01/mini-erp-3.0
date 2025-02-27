import { PrismaClient } from "@prisma/client";
import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import { type ColumnDef, type ColumnFiltersState } from "@tanstack/react-table";
import { Label } from "radix-ui";
import { useState, type ChangeEvent } from "react";
import { type MetaFunction } from "react-router";
import { InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import DataTable from "~/components/table/data-table";
import type { Route } from "./+types";
import { itemColumn } from "./tables";
import { Item } from "@radix-ui/themes/components/segmented-control";
import TableQuery from "./forms/tableQuery";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    { title: "Items", description: "Visualización de los items registrados." },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  let items = [];
  const url = new URL(request.url);
  const relations = url.searchParams.getAll("relations");

  if (relations.length > 0) {
    console.debug("relations:", relations);

    items = await prisma.item.findMany({
      include: {
        unidadMedida: relations.includes("unidadMedida"),
        ubicacion: relations.includes("ubicacion"),
        stock: relations.includes("stock"),
      },
    });

    return { items };
  }

  items = await prisma.item.findMany({
    include: {
      unidadMedida: true,
      ubicacion: true,
      stock: true,
    },
  });

  return { items };
}

export async function action({}: Route.ActionArgs) {
  const items = await prisma.item.findMany({ include: { unidadMedida: true } });

  return { items };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData;

  const columns = {
    id: "Codigo",
    descripcion: "Descripcion",
  };

  const [filter, setFilter] = useState<ColumnFiltersState>([]);
  const [showData, setShowData] = useState(false);
  console.debug("table filters:", filter);

  return (
    <Grid gapY="6">
      <Heading as="h1" size="9">
        Consulta de Articulo
      </Heading>
      <Flex align="center" justify="start" gapX="2">
        <TableQuery
          options={columns}
          changeColumnCallback={() => {
            setFilter([]);
            setShowData(false);
          }}
          changeQueryCallback={(col, val) => {
            setFilter([{ id: col, value: val }]);
            if (val !== "") setShowData(true);
          }}
          clearQueryCallback={() => {
            setFilter([]);
            setShowData(false);
          }}
          clearAction
        />
      </Flex>
      <DataTable
        data={showData ? items : []}
        columns={itemColumn as ColumnDef<any>[]}
        state={{
          filter,
          onFilterChange: setFilter,
        }}
      />
    </Grid>
  );
}
