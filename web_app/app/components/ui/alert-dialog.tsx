import { Cross1Icon } from "@radix-ui/react-icons";
import {
  AlertDialog as AD,
  Button,
  Flex,
  Grid,
  Separator,
} from "@radix-ui/themes";
import type { AlertDialogProps } from "~/types/components";

export default function AlertDialog({
  trigger,
  variant = "solid",
  children,
  header,
}: AlertDialogProps) {
  return (
    <AD.Root>
      <AD.Trigger>
        <Flex align="center" asChild>
          <Button variant={variant}>{trigger}</Button>
        </Flex>
      </AD.Trigger>
      <AD.Content>
        <AD.Cancel>
          <Button
            color="gray"
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
    </AD.Root>
  );
}
