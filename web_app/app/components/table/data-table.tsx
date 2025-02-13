import type { DataTableProps } from "~/types/components";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Button, Flex, Grid, IconButton, Select, Table, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import Input from "../forms/input";
import DialogForm from "./alert-dialog";
import { useState } from "react";
// import { Alert } from "./dialog-form";

export default function DataTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
    let [currPage, editCurrPage] = useState(1)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return <>
        <Flex className="!w-full p-2" align="end" justify="end" gapX="8">
            <DialogForm
                trigger={{
                    label: "Agregar",
                    icon: <PlusIcon />
                }}
                title="Agregar un elemento"
                description="Formulario para agregar un elemento."
            />
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
                                    <Table.ColumnHeaderCell key={h.id}>
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
                        <IconButton color="gray" variant="outline" onClick={() => editCurrPage((currPage - 1) < 1 ? (currPage - 1) : 0)}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Input
                            input={{
                                min: 1,
                                type: "number",
                                className: "w-[6ch] border-(--gray-8) no-spinner text-center",
                                disabled: true,
                                value: currPage
                            }}
                        />
                        <IconButton color="gray" variant="outline" onClick={() => editCurrPage(currPage + 1)}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Flex>
                </Table.Cell>
            </tfoot>
        </Table.Root >
    </>
}