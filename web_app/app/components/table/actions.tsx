import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Popover, Strong, Text } from "@radix-ui/themes";

const ICON_SIZE = 20
const ICON_SIZE_PROPS = { height: ICON_SIZE, width: ICON_SIZE }

function DeleteAction() {
    return <Popover.Root>
        <Popover.Trigger>
            <IconButton color="red" variant="ghost" size="3">
                <TrashIcon {...ICON_SIZE_PROPS} />
            </IconButton >
        </Popover.Trigger>
        <Popover.Content align="end" maxWidth="200px">
            <Text size="1" wrap="pretty" style={{ lineHeight: "normal" }}>
                Estas a punto de eliminar este registro, <Strong>¿estás seguro?</Strong>
            </Text>
        </Popover.Content>
    </Popover.Root>
}

function EditAction() {
    return <IconButton color="gray" variant="ghost" size="3">
        <Pencil1Icon {...ICON_SIZE_PROPS} />
    </IconButton >
}

function RowActions() {
    return <Flex justify="end" gapX="6">
        <EditAction />
        <DeleteAction />
    </Flex>
}

export { RowActions }