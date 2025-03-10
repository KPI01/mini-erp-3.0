import type {
  CheckboxFieldProps,
  DebouncedInputProps,
  fieldErrors,
  fieldMeta,
  InputFieldProps,
} from "~/types/components/input";
import {
  Flex,
  Grid,
  Text,
  TextField,
  Checkbox,
  Badge,
  Box,
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
    return (
      <TextField.Root
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {slots}
      </TextField.Root>
    );
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
  description,
  fieldMeta,
}: InputFieldProps) {
  const errorBag = Array.isArray(fieldMeta?.errors) ? fieldMeta.errors : undefined
  console.error(input.name, errorBag)

  if (typeof label === "string") {
    console.debug(
      `InputField[${input.name}] no tiene prefijo y es ${input.type}`,
    );

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
  else if (typeof label === "object") {
    console.debug(`InputField[${input.name}] tiene label y es ${input.type}`);

    return (
      <Grid gapY="1">
        <Label.Root htmlFor={String(input.name)}>{label.main}</Label.Root>
        <TextField.Root {...input} id={String(input.name)}>
          {label.prefix && (
            <TextField.Slot>
              {label.prefix}
            </TextField.Slot>
          )}
          {label.suffix && (
            <TextField.Slot side="right">
              {label.suffix}
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
  fieldErrors,
}: CheckboxFieldProps) {
  const errorBag = fieldErrors?.toString().split(", ")

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

export function displayErrors(errors?: fieldErrors[]) {
  let err = Array(...new Set(errors))[0]?.toString().split(", ")
  console.debug("displayErrors:", err)

  if (!err || err.length === 0) return null;

  if (err && err.length < 2) {
    return (
      <Badge style={{ textWrap: "pretty" }} color="red" size="1">
        {err[0]}
      </Badge>
    )
  } else {
    return <Box>
      {err.map((e, ix) => (
        <Badge
          key={ix}
          color="red"
          style={{
            flexBasis: "fit-content",
            textWrap: "pretty"
          }}
        >
          {e}
        </Badge>
      ))}
    </Box>
  }
}