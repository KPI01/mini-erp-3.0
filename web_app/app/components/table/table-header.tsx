import { Button, DropdownMenu, Flex, Select, Separator, Strong } from "@radix-ui/themes";
import type { DTColHeaderDropDownProps, DTColumnHeaderProps, DTFilterArgs } from "~/types/components";
import Input from "../forms/input";

function Filter({ defaultValue }: DTFilterArgs) {
    return (
        <Flex direction="column" gap="2" className="m-2">
            <Select.Root defaultValue={defaultValue}>
                <Select.Trigger placeholder="Tipo" />
                <Select.Content align="end">
                    <Select.Item value="1">Contiene</Select.Item>
                    <Select.Item value="2">Exacto</Select.Item>
                    <Select.Item value="3">Empieza con</Select.Item>
                    <Select.Item value="4">Termina con</Select.Item>
                </Select.Content>
            </Select.Root >
            <Input
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
            <DropdownMenu.Item>Orden asc.</DropdownMenu.Item>
            <DropdownMenu.Item>Orden desc.</DropdownMenu.Item>
            <Separator size="4" />
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