import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu as DM } from "@radix-ui/themes";
import type { RowMenuProps } from "~/types/components";

export default function RowMenu({ items }: RowMenuProps) {
  return <DM.Root>
    <DM.Trigger>
      <DotsHorizontalIcon />
    </DM.Trigger>
    <DM.Content side="right" sideOffset={5}>
      {items.map((children, ix) => (
        <DM.Item key={ix}>{children}</DM.Item>
      ))}
    </DM.Content>
  </DM.Root>
}