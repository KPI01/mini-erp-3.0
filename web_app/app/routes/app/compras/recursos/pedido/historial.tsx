import { PrismaClient } from "@prisma/client";
import { Grid, Heading, Flex, Text, Card } from "@radix-ui/themes";
import { useState } from "react";
import { type MetaFunction } from "react-router";
import { validateAuthSession } from "~/server/session.server";
import DataTable from "~/components/table/data-table";
import { type ColumnDef, type ColumnFiltersState } from "@tanstack/react-table";
import { priceHistoryColumns, type PriceHistoryItem } from "~/lib/column-definitions/pedido";
import type { Route } from "./+types/historial";
import TableQuery from "~/components/table/table-query";
import { PageHeader } from "~/components/ui/header";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
    return [
        {
            title: "Historial de Precios",
            description: "Visualización del historial de precios de los artículos comprados",
        },
    ];
};

export async function loader({ request }: Route.LoaderArgs) {
    await validateAuthSession({ request });

    const url = new URL(request.url);
    const itemId = url.searchParams.get("itemId");
    const filterBy = url.searchParams.get("filterBy");
    const filterValue = url.searchParams.get("filterValue");

    let query: any = {
        include: {
            items: {
                include: {
                    unidadMedida: true,
                },
            },
            pedido: {
                include: {
                    proveedor: true,
                    ItemsOnPedidos: true
                },
            },
        },
        orderBy: {
            asignado: 'desc',
        },
    };

    // Add filter if itemId is provided
    if (itemId) {
        query.where = {
            itemId: Number(itemId),
        };
    } else if (filterBy && filterValue) {
        // Apply custom filtering based on filterBy and filterValue
        if (filterBy === 'items.id') {
            query.where = {
                itemId: Number(filterValue),
            };
        } else if (filterBy === 'items.descripcion') {
            query.where = {
                items: {
                    descripcion: {
                        contains: filterValue,
                    },
                },
            };
        } else if (filterBy === 'proveedor') {
            query.where = {
                pedido: {
                    proveedor: {
                        nombre: {
                            contains: filterValue,
                        },
                    },
                },
            };
        }
    }

    const priceHistory = await prisma.itemsOnPedidos.findMany(query);

    // Get the list of available items for dropdown filtering
    const items = await prisma.item.findMany({
        select: {
            id: true,
            descripcion: true,
        },
        orderBy: {
            descripcion: 'asc',
        },
    });

    return { priceHistory, items };
}

export default function PriceHistory({ loaderData }: Route.ComponentProps) {
    const columns = {
        "items_id": "Código",
        "items_descripcion": "Descripción del artículo",
        "pedido_proveedor_razonSocial": "Proveedor",
        "pedido_creado": "Fecha de Compra"
    };

    const { priceHistory } = loaderData;
    const [filter, setFilter] = useState<ColumnFiltersState>([]);
    console.debug(filter)

    return (
        <Grid gapY="6">
            <PageHeader title="Historial de Costes" />

            <TableQuery
                options={columns}
                changeColumnCallback={() => {
                    setFilter([]);
                }}
                changeQueryCallback={(col, val) => {
                    setFilter([{ id: col, value: val }]);
                }}
                clearQueryCallback={() => {
                    setFilter([]);
                }}
                clearAction
            />

            <DataTable
                data={priceHistory ?? []}
                columns={priceHistoryColumns as ColumnDef<any>[]}
                state={{
                    changePageSize: true,
                    showPagination: true,
                }}
                bodyFallback={
                    <Text color="red" weight="bold">
                        No se han encontrado registros para el filtro aplicado.
                    </Text>
                }
            />
        </Grid>
    );
}