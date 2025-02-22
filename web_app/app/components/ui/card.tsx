import { Card, Grid, Heading, Text } from "@radix-ui/themes";
import type { CardContructorProps } from "~/types/components";

export default function CardContructor({
  title,
  description,
  size = "2",
  variant = "surface",
  children,
  contentProps,
}: CardContructorProps) {
  return (
    <Card size={size} variant={variant} className="shadow">
      {(title || description) && (
        <Grid gapY="1">
          {title && <Heading size="5">{title}</Heading>}
          {description && (
            <Text as="p" size="2" weight="light">
              {description}
            </Text>
          )}
        </Grid>
      )}
      <Grid {...contentProps}>{children}</Grid>
    </Card>
  );
}
