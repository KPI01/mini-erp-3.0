import { Button, Popover as PO } from "@radix-ui/themes"
import type { PopoverProps } from "~/types/components"

export default function Popover({ trigger, variant, children, state }: PopoverProps) {
    console.debug("popover state:", state)
    return <PO.Root open={state?.value} onOpenChange={state?.handler}>
        <PO.Trigger>
            <Button variant={variant}>
                {typeof trigger === "string"
                    ? trigger
                    : <>{trigger.icon} {trigger.label}</>
                }
            </Button>
        </PO.Trigger>
        <PO.Content align="end">
            {children}
        </PO.Content>
    </PO.Root>
}