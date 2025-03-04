import { validateAuthSession } from "~/server/session.server";
import { PrismaClient } from "@prisma/client";
import type { MetaFunction } from "react-router";
import DataTable from "~/components/table/data-table";
import { stockColumn } from "./tables";
import { Grid, Heading } from "@radix-ui/themes";
import { type ColumnDef, type ColumnFiltersState } from "@tanstack/react-table";
import type { Route } from "./+types/stock";
import { useState } from "react";
import TableQuery from "./forms/tableQuery";
import { PageHeader } from "~/components/ui/header";

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
    include: { item: { include: { unidadMedida: true } }, ubicacion: true },
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

  const [filter, setFilter] = useState<ColumnFiltersState>([]);

  return (
    <Grid gapY="8">
      <PageHeader title="Rotación de Material" />
      <TableQuery
        options={columns}
        changeColumnCallback={() => {
          setFilter([]);
        }}
        changeQueryCallback={(col, val) => {
          setFilter([{ id: col, value: val }]);
        }}
      />
      <DataTable
        data={stock}
        columns={stockColumn as ColumnDef<any>[]}
        state={{
          filter,
          onFilterChange: setFilter,
          showPagination: true,
          changePageSize: true,
        }}
      />
    </Grid>
  );
}
