import { classMixer } from "~/helpers/utils";
import type { InputProps } from "~/types/components";
import { Label } from "@radix-ui/react-label";
import { Button, Flex, Grid, IconButton, Text } from "@radix-ui/themes";
import { Form } from "radix-ui";

export default function Input({
  label,
  input,
  description,
  btn,
  containerClass = "",
  errors,
}: InputProps) {


  return (
    <Form.Field name={input.name ?? ""}>
      <Grid columns="1" gap="1" align="center" className={containerClass}>
        {(label && typeof label === "string")
          ? <Form.Label htmlFor={input.name}>{label}</Form.Label>
          : (label && typeof label !== "string")
            ? <Form.Label htmlFor={input.name} {...label}>{label.content}</Form.Label>
            : null
        }
        {btn === undefined
          ? <Form.Control asChild>
            <input className={classMixer("light radix-light", input.className ?? "")} {...input} />
          </Form.Control>
          : <Flex gapX="3" justify="center">
            <Form.Control asChild>
              <input className={classMixer("light radix-light basis-full", input.className ?? "")} {...input} />
            </Form.Control>
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
        <Form.Message>
          {description && (
            <Text wrap="pretty" color="gray" size="1" trim="end">{description}</Text>
          )}
          {displayErrors(errors)}
        </Form.Message>
      </Grid>
    </Form.Field>
  );
}


function displayErrors(errors: InputProps["errors"]) {
  console.debug("bag:", errors)
  //@ts-ignore
  if (errors && errors?.length > 0)
    return <Text color="red" weight="light" size="1" trim="both" className="m-0">
      {//@ts-ignore
        errors[0]
      }
    </Text>
}
