import type { DataTableProps } from "~/types/components";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type ColumnOrderState,
    type PaginationState,
    type SortingState,
} from '@tanstack/react-table'
import { Box, Flex, Grid, IconButton, Select, Table, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function DataTable<TData, TValue>({
    data,
    columns,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state: {
            columnFilters,
            sorting,
            pagination
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return <Table.Root variant="surface">
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
            <Table.Row>
                <Table.Cell colSpan={columns.length} align="right">
                    <Flex gapX="3" className="w-full" justify="end">
                        <IconButton color="gray" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <input
                            min={0}
                            type="number"
                            className="w-[6ch] border-(--gray-8) no-spinner text-center"
                            disabled
                            value={table.getState().pagination.pageIndex + 1}
                        />
                        <IconButton color="gray" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Flex>
                </Table.Cell>
            </Table.Row>
        </tfoot>
    </Table.Root >
}