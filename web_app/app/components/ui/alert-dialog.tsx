import { Cross1Icon } from "@radix-ui/react-icons";
import {
  AlertDialog as AD,
  Button,
  Grid,
  Separator,
} from "@radix-ui/themes";
import type { AlertDialogContentProps, AlertDialogProps, AlertDialogRootProps } from "~/types/components";

export function AlertDialogRoot({ trigger, state, children }: AlertDialogRootProps) {
  return <AD.Root {...state}>
    {trigger && <AD.Trigger>{trigger}</AD.Trigger>}
    {children}
  </AD.Root>
}

export function AlertDialogContent({ header, children }: AlertDialogContentProps) {
  return <AD.Content>
    <AD.Cancel>
      <Button
        color="red"
        variant="ghost"
        style={{ position: "absolute", top: "1rem", right: "1.25rem" }}
        className="!p-2 !rounded-full"
      >
        <Cross1Icon height={18} width={18} />
      </Button>
    </AD.Cancel>
    {header && (
      <Grid gapY="0">
        {header?.title && (
          <AD.Title as="h2" size="7">
            {header.title}
          </AD.Title>
        )}
        {header?.description && (
          <AD.Description size="2" weight="light" trim="both">
            {header.description}
          </AD.Description>
        )}
        {(header?.title || header?.description) && (
          <Separator mt="2" mb="5" size="4" />
        )}
      </Grid>
    )}
    {children}
  </AD.Content>
}

export default function AlertDialog({
  trigger,
  children,
  header,
}: AlertDialogProps) {
  return (
    <AD.Root>
      <AD.Trigger>
        {trigger}
      </AD.Trigger>
      <AlertDialogContent header={header}>
        {children}
      </AlertDialogContent>
    </AD.Root>
  );
}
