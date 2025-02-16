import { Button, DropdownMenu, Flex, Select, Separator, Strong, Text } from "@radix-ui/themes";
import type { DTColHeaderDropDownProps, DTColumnHeaderProps, DTFilterArgs } from "~/types/components";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { InputField } from "../forms/input";

function Filter({ defaultValue }: DTFilterArgs) {
    return (
        <Flex direction="column" gap="2" className="m-2">
            <InputField
                input={{
                    type: "text",
                    className: "border-(--gray-6)"
                }}
            />
        </Flex>
    )

}

function Dropdown({ trigger }: DTColHeaderDropDownProps) {
    return <DropdownMenu.Root >
        <DropdownMenu.Trigger>
            <Button color="gray" variant="ghost" className="!font-semibold">
                <Strong className="!text-black">
                    {trigger}
                </Strong>
                <DropdownMenu.TriggerIcon />
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft" color="gray" className="!w-[150px]">
            <DropdownMenu.Item>
                <Text as="span">Ordenar</Text>
                <CaretSortIcon />
            </DropdownMenu.Item>
            <Separator size="4" my="4" />
            <Filter defaultValue="0" />
        </DropdownMenu.Content>
    </DropdownMenu.Root>
}

function ColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DTColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) return <div className={className}>{title}</div>

    return <Dropdown trigger={title} />
}

export { ColumnHeader }