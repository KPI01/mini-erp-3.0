import type { DataTableProps } from "~/types/components";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Container, Table } from "@radix-ui/themes";

export default function DataTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return <Container className="border border-(--blue-12) rounded-lg">
        <Table.Root >
            <Table.Header >
                {table.getHeaderGroups().map((hGroup) => (
                    <Table.Row key={hGroup.id}>
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
            <Table.Body>
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
        </Table.Root >
    </Container>
}