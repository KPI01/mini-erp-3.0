import { Button, Dialog as D, Separator } from "@radix-ui/themes";
import type { DialogProps } from "~/types/components";

export function Dialog({ trigger, header, config, children }: DialogProps) {
  return (
    <D.Root>
      <D.Trigger>
        <Button {...config.trigger}>{trigger}</Button>
      </D.Trigger>
      <D.Content {...config.content}>
        {header.title && <D.Title>{header.title}</D.Title>}
        {header.description && (
          <D.Description>{header.description}</D.Description>
        )}
        {header.title || (header.description && <Separator my="3" size="4" />)}
        {children}
      </D.Content>
    </D.Root>
  );
}
