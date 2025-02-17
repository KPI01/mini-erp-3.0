import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Popover, Strong, Text } from "@radix-ui/themes";
import { useCallback } from "react";
import { Form, useSubmit } from "react-router";
import type { DTRowAction } from "~/types/components";

const ICON_SIZE = 20
const ICON_SIZE_PROPS = { height: ICON_SIZE, width: ICON_SIZE }

function DeleteAction({ id, relativeRoute }: DTRowAction) {
    return <Popover.Root>
        <Popover.Trigger>
            <IconButton color="red" variant="ghost" size="3">
                <TrashIcon {...ICON_SIZE_PROPS} />
            </IconButton >
        </Popover.Trigger>
        <Popover.Content align="end" maxWidth="250px">
            <Text as="p" size="1" wrap="pretty" style={{ lineHeight: "normal" }}>
                Estas a punto de eliminar este registro, la acción es irreversible. <Strong>¿Estás seguro?</Strong>
            </Text>
            <Popover.Close className="!my-2 !flex">
                <Form action={`/${relativeRoute}/${id}`} method="delete">
                    <Button color="red" size="2" className="!w-auto !mx-auto !p-2" type="submit">
                        <TrashIcon /> Eliminar
                    </Button>
                </Form>
            </Popover.Close>
        </Popover.Content>
    </Popover.Root>
}

function EditAction() {
    return <IconButton color="gray" variant="ghost" size="3">
        <Pencil1Icon {...ICON_SIZE_PROPS} />
    </IconButton >
}

function RowActions(props: DTRowAction) {
    return <Flex justify="end" gapX="6">
        <EditAction />
        <DeleteAction {...props} />
    </Flex>
}

export { RowActions }