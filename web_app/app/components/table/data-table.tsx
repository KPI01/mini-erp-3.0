import type { DataTableProps } from "~/types/components";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import {
  Flex,
  IconButton,
  Select,
  Separator,
  Table,
  Text,
} from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function DataTable<TData, TValue>({
  data,
  columns,
  bodyFallback,
  state = {
    filter: undefined,
    onFilterChange: () => {},
    changePageSize: true,
  },
}: DataTableProps<TData, TValue>) {
  console.debug("data:", data);
  console.debug("columns:", columns);
  console.debug("filter:", state.filter);
  const [internalFilters, setInternalFilters] = useState<ColumnFiltersState>(
    [],
  );
  const columnFilters = state.filter || internalFilters;
  const setColumnFilters = state.onFilterChange || setInternalFilters;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [internalPagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: state.pageSize || 10,
  });
  const pagination = state.pagination || internalPagination;

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugAll: true,
  });

  console.debug("state:", table.getState());

  return (
    <Table.Root variant="surface">
      <Table.Header>
        {table.getHeaderGroups().map((hGroup) => (
          <Table.Row key={hGroup.id} className="bg-(--gray-2)">
            {hGroup.headers.map((h) => {
              return (
                <Table.ColumnHeaderCell
                  key={h.id}
                  align={h.id === "actions" ? "right" : "left"}
                >
                  {h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body className="border-b border-b-(--gray-5)">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((r) => (
            <Table.Row key={r.id}>
              {r.getVisibleCells().map((c) => (
                <Table.Cell
                  key={c.id}
                  justify={
                    c.column.columnDef.id === "actions" ? "end" : "start"
                  }
                >
                  {flexRender(c.column.columnDef.cell, c.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={columns.length}>
              {bodyFallback ? bodyFallback : "Nada que mostrar"}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      <tfoot style={{ marginTop: "100px" }}>
        <Table.Row>
          <Table.Cell colSpan={columns.length} align="right">
            <Flex gapX="3" className="w-full" justify="end">
              <Flex align="center" gapX="1">
                <Text>Mostrando</Text>
                {state.changePageSize && (
                  <Select.Root
                    value={String(table.getState().pagination.pageSize)}
                    onValueChange={(v) => table.setPageSize(Number(v))}
                  >
                    <Select.Trigger placeholder="Nada que mostrar..." />
                    <Select.Content>
                      {[5, 10, 15, 20].map((pageSize) => (
                        <Select.Item key={pageSize} value={String(pageSize)}>
                          {pageSize}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                )}
              </Flex>
              <Separator orientation="vertical" style={{ height: "100%" }} />
              <IconButton
                type="button"
                color="gray"
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon />
              </IconButton>
              <input
                min={0}
                type="number"
                className="w-[6ch] border-(--gray-8) no-spinner text-center"
                disabled
                value={table.getState().pagination.pageIndex + 1}
              />
              <IconButton
                type="button"
                color="gray"
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon />
              </IconButton>
            </Flex>
          </Table.Cell>
        </Table.Row>
      </tfoot>
    </Table.Root>
  );
}
