import { Heading, type HeadingProps } from "@radix-ui/themes";
import type { PageHeaderProps } from "~/types/components";

export function PageHeader({ title, props }: PageHeaderProps) {
  return (
    <Heading size="9" as="h1" {...props}>
      {title}
    </Heading>
  );
}
