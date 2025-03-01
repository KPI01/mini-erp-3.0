import { Prisma, PrismaClient } from "@prisma/client";
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
import { validateAuthSession } from "~/server/session.server";
import { addItem } from "~/server/actions/item.server";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    { title: "Items", description: "Visualización de los items registrados." },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  let items = [];
  let where = {} satisfies Prisma.ItemWhereInput;
  let include = {} satisfies Prisma.ItemInclude;
  const url = new URL(request.url);
  const keys = url.searchParams.getAll("key");
  const relations = url.searchParams.getAll("relations");

  if (keys.length > 0) {
    keys.forEach((k) => {
      if (k === "id") {
        //@ts-ignore
        where[k] = Number(url.searchParams.get(k));
        return;
      }
      //@ts-ignore
      where[k] = { contains: url.searchParams.get(k) };
      return;
    });
  }

  if (relations.length > 0) {
    relations.forEach((r) => {
      //@ts-ignore
      include[r] = true;
    });
  }

  if (Object.keys(where).length > 0 && Object.keys(include).length > 0) {
    //@ts-ignore
    items = await prisma.item.findMany({
      where,
      include,
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

export async function action({ request }: Route.ActionArgs) {
  await validateAuthSession({ request });

  if (request.method.toLowerCase() === "post") {
    return await addItem(request);
  }

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
