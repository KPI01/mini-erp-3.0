import type { DataTableProps } from "~/types/components";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Button, Flex, IconButton, Table } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import Input from "../forms/input";
// import { Alert } from "./dialog-form";

export default function DataTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return <>
        <Flex className="!w-full p-2" justify="end">
            {/* <Alert
                trigger={{
                    label: "Agregar",
                    icon: <PlusIcon />
                }}
                title="Agregar un elemento"
                description="Formulario para agregar un elemento."
            /> */}
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
                                    <Table.Cell key={c.id}>
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
                        <IconButton color="gray" variant="outline">
                            <ChevronLeftIcon />
                        </IconButton>
                        <Input
                            input={{
                                type: "number",
                                className: "w-[7.5ch]",
                                disabled: true
                            }}
                        />
                        <IconButton color="gray" variant="outline">
                            <ChevronRightIcon />
                        </IconButton>
                    </Flex>
                </Table.Cell>
            </tfoot>
        </Table.Root >
    </>
}