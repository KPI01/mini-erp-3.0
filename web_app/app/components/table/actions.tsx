import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Em, Flex, Grid, IconButton, Strong, Text } from "@radix-ui/themes";
import { Form, useSubmit } from "react-router";
import type { DTRowAction } from "~/types/components";
import Popover from "../ui/popover";
import { EditItemForm } from "~/routes/app/items/forms";

const ICON_SIZE = 20
const ICON_SIZE_PROPS = { height: ICON_SIZE, width: ICON_SIZE }

function DeleteAction({ id, route }: Omit<DTRowAction, "values" | "errorBag">) {
    return <Popover trigger={<TrashIcon {...ICON_SIZE_PROPS} />} color="red" maxWidth="210px">
        <Grid asChild gapY="2">
            <Form action={`${route}/${id}`} method="delete">
                <Text as="p" size="2">
                    Estás a punto de eliminar este registro, ¿estás seguro?<br />
                    <Em>Esta acción es irreversible</Em>
                </Text>
                <Button color="red" type="submit">
                    <Strong>Confirmar eliminación</Strong>
                </Button>
            </Form>
        </Grid>
    </Popover>
}

function EditAction({ id, values, aux, errorBag }: Omit<DTRowAction, "route">) {
    return <Popover variant="outline" trigger={<Pencil1Icon {...ICON_SIZE_PROPS} />} maxWidth="300px">
        <EditItemForm id={id} defaults={values} aux={aux} errors={errorBag} />
    </Popover>
}

function RowActions({ id, route, values, aux, errorBag }: DTRowAction) {
    return <Flex justify="end" gapX="6">
        <EditAction id={id} values={values} aux={aux} errorBag={errorBag} />
        <DeleteAction id={id} route={route} />
    </Flex>
}

export { RowActions }