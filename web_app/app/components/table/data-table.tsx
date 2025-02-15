import type { DataTableProps } from "~/types/components";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Box, Flex, Grid, IconButton, Select, Table, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import DialogForm from "./alert-dialog";
import { useState } from "react";

export default function DataTable<TData, TValue>({
    data,
    columns,
    config = {
        buttons: { add: { enabled: true } }
    }
}: DataTableProps<TData, TValue>) {
    let [currPage, editCurrPage] = useState(1)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return <Box>
        <Flex className="!w-full p-2" align="end" justify="end" gapX="8">
            {(config.buttons?.add.enabled || config.dialog) && (
                <DialogForm
                    trigger={{
                        label: config?.buttons?.add?.label ?? "Agregar",
                        icon: config?.buttons?.add?.icon ?? <PlusIcon />
                    }}
                    title={config?.dialog?.title ?? "Agregar un elemento"}
                    description={config?.dialog?.description ?? "Formulario para agregar un elemento."}
                    form={config?.dialog?.form}
                    state={config?.dialog?.state}
                />)}
            <Grid gapY="2">
                <Text size="1" as="span">Registros a mostrar:</Text>
                <Select.Root defaultValue="1">
                    <Select.Trigger placeholder="Paginación" />
                    <Select.Content align="end">
                        <Select.Item value="1">5</Select.Item>
                        <Select.Item value="2">10</Select.Item>
                        <Select.Item value="3">15</Select.Item>
                        <Select.Item value="4">20</Select.Item>
                    </Select.Content>
                </Select.Root >
            </Grid>
        </Flex>
        <Table.Root variant="surface">
            <Table.Header>
                {table.getHeaderGroups().map((hGroup) => (
                    <Table.Row key={hGroup.id} className="bg-(--gray-2)">
                        {
                            hGroup.headers.map((h) => {
                                return (
                                    <Table.ColumnHeaderCell key={h.id} align={h.id === "actions" ? "right" : "left"}>
                                        {h.isPlaceholder
                                            ? null
                                            : flexRender(
                                                h.column.columnDef.header,
                                                h.getContext()
                                            )}
                                    </Table.ColumnHeaderCell>
                                )
                            })
                        }
                    </Table.Row>
                ))}
            </Table.Header>
            <Table.Body className="border-b border-b-(--gray-5)">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((r) => (
                        <Table.Row key={r.id}>
                            {
                                r.getVisibleCells().map((c) => (
                                    <Table.Cell key={c.id} justify={c.column.columnDef.id === 'actions' ? "end" : "start"}>
                                        {flexRender(c.column.columnDef.cell, c.getContext())}
                                    </Table.Cell>
                                ))
                            }
                        </Table.Row>
                    ))
                ) : (
                    <Table.Row>
                        <Table.Cell colSpan={columns.length}>
                            Nada que mostrar.
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
            <tfoot>
                <Table.Cell colSpan={columns.length} align="right">
                    <Flex gapX="3" className="w-full" justify="end">
                        <IconButton color="gray" variant="outline" onClick={() => editCurrPage((currPage - 1) < 1 ? 0 : (currPage - 1))}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <input
                            min={0}
                            type="number"
                            className="w-[6ch] border-(--gray-8) no-spinner text-center"
                            disabled
                            value={currPage}
                        />
                        <IconButton color="gray" variant="outline" onClick={() => editCurrPage(currPage + 1)}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Flex>
                </Table.Cell>
            </tfoot>
        </Table.Root >
    </Box>
}