import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Dialog as D, Separator } from "@radix-ui/themes";
import type { DialogProps } from "~/types/components";

export function Dialog({ trigger, header, config, state = { open: false }, children }: DialogProps) {
  return (
    <D.Root open={state?.open} onOpenChange={state?.setOpen}>
      <D.Trigger>
        <Button {...config?.trigger}>{trigger}</Button>
      </D.Trigger>
      <D.Content {...config?.content}>
        {header?.title && <D.Title mb="1">{header?.title}</D.Title>}
        {header?.description && (
          <D.Description weight="light">{header?.description}</D.Description>
        )}
        {(header?.title ||
          header?.description) && <Separator my="4" size="4" />}
        {children}
        <D.Close>
          <Button
            color="red"
            variant="ghost"
            className="!rounded-full !p-2"
            style={{ position: "absolute", top: "1rem", right: "1.5rem" }}
          >
            <Cross1Icon height={20} width={20} />
          </Button>
        </D.Close>
      </D.Content>
    </D.Root>
  );
}
