import { Button, DropdownMenu, Flex, Select, Separator, Strong, Text } from "@radix-ui/themes";
import type { DTColHeaderDropDownProps, DTColumnHeaderProps, DTFilterArgs } from "~/types/components";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { DebouncedInput, InputField } from "../forms/input";
import React from "react";

function Filter({ column }: DTFilterArgs) {
    const filterValue = column.getFilterValue()
    console.debug("filter value:", filterValue)
    //@ts-ignore
    const { filterVariant } = column.columnDef.meta ?? {}

    return (
        <Flex direction="column" gap="2" className="m-2">
            <DebouncedInput
                className="!max-w-sm"
                debounce={250}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search...`}
                type="text"
                value={(filterValue ?? '') as string}
            />
        </Flex>
    )

}

function Dropdown({ trigger, header }: DTColHeaderDropDownProps) {
    return <DropdownMenu.Root >
        <DropdownMenu.Trigger>
            <Button color="gray" variant="ghost" className="!font-semibold">
                <Strong className="!text-black">
                    {trigger}
                </Strong>
                <DropdownMenu.TriggerIcon />
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="top" variant="soft" color="gray">
            <DropdownMenu.Item style={{ justifyContent: "center" }} onClick={() => header.column.toggleSorting()}>
                Ordenar
                <CaretSortIcon />
            </DropdownMenu.Item>
            <Separator size="4" my="4" />
            <Filter column={header.column} />
        </DropdownMenu.Content>
    </DropdownMenu.Root>
}

function ColumnHeader<TData, TValue>({
    header,
    title,
    className,
}: DTColumnHeaderProps<TData, TValue>) {
    if (!header.column.getCanSort()) return <div className={className}>{title}</div>

    return <Dropdown trigger={title} header={header} />
}

export { ColumnHeader }