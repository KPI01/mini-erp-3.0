import { classMixer } from "~/helpers/utils";
import type { InputProps } from "~/types/components";
import { Label } from "@radix-ui/react-label";
import { Button, Em, Flex, Grid, IconButton, Text } from "@radix-ui/themes";

export default function Input({
  label,
  input,
  description,
  btn,
  containerClass = "",
  errors,
}: InputProps) {
  return (
    <Grid columns="1" gap="1" align="center" className={containerClass}>
      {(label && typeof label === "string")
        ? <Label htmlFor={input.name}>{label}</Label>
        : (label && typeof label !== "string")
          ? <Label htmlFor={input.name} {...label}>{label.content}</Label>
          : null
      }
      {btn === undefined
        ? <input className={classMixer("light radix-light", input.className ?? "")} {...input} />
        : <Flex gapX="3" justify="center">
          <input className={classMixer("light radix-light basis-full", input.className ?? "")} {...input} />
          {(btn && btn !== undefined) && (
            (btn.label && !btn.icon)
              ? (
                <Button type={btn.type} onClick={btn.onClick} className={btn.className}>{btn.label}</Button>
              )
              : (btn.icon && !btn.label)
                ? (<IconButton
                  variant="solid"
                  size="2"
                  className="light radix-light"
                  onClick={btn.onClick}
                  type={btn.type}
                >
                  {btn.icon}
                </IconButton>)
                : null
          )}
        </Flex>
      }
      {description && (<Text wrap="pretty" color="gray" size="1" trim="end">{description}</Text>)}
      {displayErrors(errors)}
    </Grid>
  );
}

function displayErrors(errors: InputProps["errors"]) {
  //@ts-ignore
  if (errors && errors?.length > 0)
    return <Text color="red" weight="light" size="1" trim="both" className="m-0">
      {//@ts-ignore
        errors[0]
      }
    </Text>
}
