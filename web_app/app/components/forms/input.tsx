import { cleanErrors } from "~/helpers/utils";
import type {
  CheckboxFieldProps,
  DebouncedInputProps,
  InputFieldProps,
} from "~/types/components";
import {
  Flex,
  Grid,
  IconButton,
  Text,
  TextField,
  Checkbox,
} from "@radix-ui/themes";
import { Label } from "radix-ui";
import React from "react";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  slots,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  if (slots) {
    <TextField.Root
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {slots}
    </TextField.Root>;
  } else {
    return (
      <TextField.Root
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
}

export function InputField({
  label,
  input,
  errors,
  icon,
  description,
}: InputFieldProps) {
  const errorBag = cleanErrors(input.name, errors);

  // Simple string label
  if (typeof label === "string") {
    console.debug(
      `InputField[${input.name}] no tiene prefijo y es ${input.type}`,
    );

    if (icon) {
      return (
        <Grid gapY="1">
          <Label.Root htmlFor={String(input.name)}>{label}</Label.Root>
          <TextField.Root {...input} id={String(input.name)}>
            <TextField.Slot side="right">
              <IconButton type="button" onClick={() => icon.stateHandler()}>
                {icon.children}
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
          {description && (
            <Text as="p" size="1" weight="light" trim="both">
              {description}
            </Text>
          )}
          {displayErrors(errorBag)}
        </Grid>
      );
    }

    return (
      <Grid gapY="1">
        <Label.Root htmlFor={String(input.id || input.name)}>
          {label}
        </Label.Root>
        <TextField.Root {...input} id={String(input.id || input.name)} />
        {description && (
          <Text as="p" size="1" weight="light" trim="both">
            {description}
          </Text>
        )}
        {displayErrors(errorBag)}
      </Grid>
    );
  }
  // Object label with main/suffix
  else if (typeof label === "object") {
    console.debug(`InputField[${input.name}] tiene label y es ${input.type}`);

    return (
      <Grid gapY="1">
        <TextField.Root {...input} id={String(input.name)}>
          <TextField.Slot>
            <Label.Root htmlFor={String(input.name)}>{label.main}</Label.Root>
          </TextField.Slot>
          {label.suffix && (
            <TextField.Slot side="right">
              <Text size="3" weight="medium">
                {label.suffix}
              </Text>
            </TextField.Slot>
          )}
        </TextField.Root>
        {description && (
          <Text as="p" size="1" weight="light" trim="both">
            {description}
          </Text>
        )}
        {displayErrors(errorBag)}
      </Grid>
    );
  }

  // No label case
  return (
    <Grid gapY="1">
      <TextField.Root {...input} />
      {description && (
        <Text as="p" size="1" weight="light" trim="both">
          {description}
        </Text>
      )}
      {displayErrors(errorBag)}
    </Grid>
  );
}
export function CheckboxField({
  input,
  label,
  errors,
  containerProps,
}: CheckboxFieldProps) {
  const errorBag = cleanErrors(input.name, errors);
  return (
    <Grid {...containerProps}>
      <Flex align="center" gapX="2">
        <Checkbox {...input} id={input.name} />{" "}
        <Label.Root htmlFor={input.name}>{label}</Label.Root>
      </Flex>
      {displayErrors(errorBag)}
    </Grid>
  );
}

export function displayErrors(errors?: string[]) {
  console.debug("bag:", errors);
  //@ts-ignore
  if (errors && errors?.length > 0)
    return (
      <Text color="red" weight="light" size="1" trim="both" className="m-0">
        {
          //@ts-ignore
          errors[0]
        }
      </Text>
    );
}
