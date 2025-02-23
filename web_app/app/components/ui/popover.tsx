import { Button, Flex, Popover as PO } from "@radix-ui/themes";
import type { PopoverProps } from "~/types/components";

export default function Popover({
  color,
  trigger,
  variant,
  children,
  maxWidth = "fit",
}: PopoverProps) {
  return (
    <PO.Root>
      <PO.Trigger>
        <Button color={color} variant={variant}>
          {trigger}
        </Button>
      </PO.Trigger>
      <PO.Content sideOffset={5} align="end" maxWidth={maxWidth}>
        {children}
      </PO.Content>
    </PO.Root>
  );
}
