import { cleanErrors } from "~/helpers/utils";
import type { CheckboxFieldProps, InputFieldProps } from "~/types/components";
import { Flex, Grid, IconButton, Text, TextField, Checkbox } from "@radix-ui/themes";
import { Label } from "radix-ui";
import React from "react";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

export function InputField({ label, input, errors, icon, description }: InputFieldProps) {
  const errorBag = cleanErrors(errors?.field, errors?.bag)
  const Description = <Text as="p" size="1" weight="light" trim="both"> {description}</Text >


  if (label && input.type === "checkbox") {
    console.debug(`InputField[${input.name}] es Checkbox`)
    return <Grid gapY="1">
      <CheckboxField
        label={typeof label === "string" ? label : label?.main}
        input={{ ...input }}
      />
      {errors && displayErrors(errorBag)}
    </Grid>
  }

  if (typeof label === "string") {
    console.debug(`InputField[${input.name}] no tiene prefijo y es ${input.type}`)

    if (icon) {
      return (
        <Grid gapY="1">
          <Label.Root htmlFor={String(input.id)}>{label}</Label.Root>
          <Flex gapX="4" justify="between">
            <input {...input} style={{ flexBasis: "100%" }} />
            <IconButton type="button" onClick={() => icon.stateHandler()}>
              {icon.children}
            </IconButton>
          </Flex>
          {description && Description}
          {displayErrors(errorBag)}

        </Grid>
      )
    }
    return (
      <Grid gapY="1">
        <Label.Root htmlFor={String(input.id)}>{label}</Label.Root>
        <input {...input} />
        {description && Description}
        {displayErrors(errorBag)}
      </Grid>
    )
  } else if (typeof label === "object") {
    console.debug(`InputField[${input.name}] tiene label y es ${input.type}`)
    return (
      <Grid gapY="1">
        <Label.Root htmlFor={String(input.id)}>{label.main}</Label.Root>
        {input.type === "text"
          ? (
            <input {...input} />
          ) : (
            <Flex align="center" gapX="4">
              <input {...input} />
              <Label.Root asChild>
                <Text size="3" weight="medium">
                  {label.suffix}
                </Text>
              </Label.Root>
            </Flex>
          )
        }
        {description && Description}
        {displayErrors(errorBag)}
      </Grid>
    )
  }

  return (
    <Grid gapY="1">
      <input {...input} />
      {description && Description}
      {displayErrors(errorBag)}
    </Grid>
  )

}

function CheckboxField({ label, input }: CheckboxFieldProps) {
  return <Flex gapX="2" align="center">
    <Checkbox
      id={input.name}
      name={input.name}
      defaultChecked={Boolean(input.value)}
      value={String(input.value)}
      onClick={input.onClick}
    />
    <Label.Root htmlFor={input.name}>{label ?? ""}</Label.Root>
  </Flex>
}

export function displayErrors(errors?: string[]) {
  console.debug("bag:", errors)
  //@ts-ignore
  if (errors && errors?.length > 0)
    return <Text color="red" weight="light" size="1" trim="both" className="m-0">
      {//@ts-ignore
        errors[0]
      }
    </Text>
}