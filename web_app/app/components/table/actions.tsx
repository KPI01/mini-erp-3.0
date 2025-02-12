import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton } from "@radix-ui/themes";

const ICON_SIZE = 20
const ICON_SIZE_PROPS = { height: ICON_SIZE, width: ICON_SIZE }

function DeleteAction() {
    return <IconButton color="red" variant="ghost" size="3">
        <TrashIcon {...ICON_SIZE_PROPS} />
    </IconButton >
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