import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import type { DialogFormProps } from "~/types/components";

export default function DialogForm({
    trigger,
    title,
    description,
    actions = { confirm: "Enviar", cancel: "Cerrar" }
}: DialogFormProps) {
    title = (!title && typeof trigger === "string") ? trigger : title
    return (
        <AlertDialog.Root>
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
                {description && (
                    <AlertDialog.Description size="2" weight="light" wrap="pretty">
                        {description}
                    </AlertDialog.Description>
                )}

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="outline" color="gray">
                            {actions.cancel}
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid">
                            {actions.confirm}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}