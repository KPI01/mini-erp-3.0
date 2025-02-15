import { Cross1Icon } from "@radix-ui/react-icons";
import { AlertDialog, Box, Button, Container, Flex, Grid, IconButton } from "@radix-ui/themes";
import { Form } from "radix-ui";
import type { DialogFormProps } from "~/types/components";

export default function DialogForm({
    trigger,
    title,
    description,
    form,
    state,
}: DialogFormProps) {
    title = (!title && typeof trigger === "string") ? trigger : title
    return (
        <AlertDialog.Root open={state.open} onOpenChange={state.changer}>
            <AlertDialog.Trigger>
                <Button variant="surface">{typeof trigger === "string"
                    ? trigger
                    : <Flex gapX="3" wrap="nowrap" align="center" justify="between">
                        {trigger.label}
                        {trigger.icon}
                    </Flex>
                }</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>{title}</AlertDialog.Title>
                <AlertDialog.Cancel style={{ position: "absolute", right: "5%", top: "4%" }}>
                    <IconButton variant="ghost" color="gray"><Cross1Icon /></IconButton>
                </AlertDialog.Cancel>
                {description && (
                    <AlertDialog.Description size="2" weight="light" wrap="pretty">
                        {description}
                    </AlertDialog.Description>
                )}
                <Grid gapY="6" pt="4">
                    {form}
                </Grid>
            </AlertDialog.Content>
        </AlertDialog.Root >
    )
}