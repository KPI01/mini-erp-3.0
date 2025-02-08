import { classMixer } from "~/helpers/utils";
import type { InputProps } from "~/types/components";
import { Label } from "@radix-ui/react-label";
import { Button, Flex, Grid, IconButton } from "@radix-ui/themes";

function displayErrors(errors: InputProps["errors"]) {
  if (errors && errors.length > 0)
    return <ul className="ps-4 list-disc text-xs mt-2 font-semibold text-(--color-alertRed)">
      {errors.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
}

export default function Input({
  label,
  input,
  btn,
  containerClass = "",
  errors,
}: InputProps) {
  return (
    <Grid columns="1" gap="1" align="center" className={classMixer(containerClass)}>
      {(typeof label === "string")
        ? <Label htmlFor={input.name}>{label}</Label>
        : (typeof label !== undefined)
          ? <Label htmlFor={input.name} {...label}>{label.content}</Label>
          : null
      }
      {btn === undefined
        ? <input className={classMixer("light radix-light", input.className ?? "")} {...input} />
        : <Flex gapX="3" justify="center">
          <input className={classMixer("light radix-light basis-full", input.className ?? "")} {...input} />
          {(btn !== undefined) && (
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
      {displayErrors(errors)}
    </Grid>
  );
}
