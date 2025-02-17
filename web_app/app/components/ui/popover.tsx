import { Button, Popover as PO } from "@radix-ui/themes"
import type { PopoverProps } from "~/types/components"

export default function Popover({ trigger, variant, children }: PopoverProps) {
    return <PO.Root>
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