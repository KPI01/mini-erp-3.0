import { Button, Flex, Popover as PO } from "@radix-ui/themes"
import type { PopoverProps } from "~/types/components"

export default function Popover({ color, trigger, variant, children, state, maxWidth = "fit" }: PopoverProps) {
    console.debug("popover state:", state)
    return <PO.Root open={state?.value} onOpenChange={state?.handler}>
        <PO.Trigger>
            <Flex align="center" asChild>
                <Button color={color} variant={variant}>
                    {trigger}
                </Button>
            </Flex>
        </PO.Trigger>
        <PO.Content align="end" maxWidth={maxWidth}>
            {children}
        </PO.Content>
    </PO.Root>
}