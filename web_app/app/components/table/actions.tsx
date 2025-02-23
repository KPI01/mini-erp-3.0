import {
  Button,
  Em,
  Flex,
  Grid,
  IconButton,
  Strong,
  Text,
} from "@radix-ui/themes";
import { Form, useSubmit } from "react-router";
import type { DTRowAction } from "~/types/components";
import Popover from "../ui/popover";
import { EditItemForm } from "~/routes/app/items/forms";
import AlertDialog from "../ui/alert-dialog";

const ICON_SIZE = 20;
const ICON_SIZE_PROPS = { height: ICON_SIZE, width: ICON_SIZE };

function DeleteAction({
  id,
  route,
}: Omit<DTRowAction, "values" | "errorBag" | "editForm">) {
  return (
    <Popover
      trigger={"Eliminar"}
      color="red"
      maxWidth="210px"
    >
      <Grid asChild gapY="2">
        <Form action={`${route}/${id}`} method="delete">
          <Text as="p" size="2">
            Estás a punto de eliminar este registro, ¿estás seguro?
            <br />
            <Em>Esta acción es irreversible</Em>
          </Text>
          <Button color="red" type="submit">
            <Strong>Confirmar eliminación</Strong>
          </Button>
        </Form>
      </Grid>
    </Popover>
  );
}

function EditAction({ editForm }: Pick<DTRowAction, "editForm">) {
  editForm.type = editForm.type ?? "popover"
  if (editForm.type === "popover") {
    return (
      <Popover
        variant="outline"
        trigger={"Editar"}
        maxWidth="300px"
      >
        {editForm.children}
      </Popover>
    );
  }

  if (editForm.type === "alertDialog") {
    return (
      <AlertDialog variant="outline" trigger={"Editar"}>
        {editForm.children}
      </AlertDialog>
    );
  }
}

function RowActions({ id, route, editForm }: DTRowAction) {
  return (
    <Flex justify="end" gapX="6">
      <EditAction editForm={editForm} />
      <DeleteAction id={id} route={route} />
    </Flex>
  );
}

export { RowActions };
