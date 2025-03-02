import { Grid, Select } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { cleanErrors } from "~/helpers/utils";
import type { SelectInputProps } from "~/types/components";
import { displayErrors } from "./input";
import { useState } from "react";

export default function SelectInput({
  name,
  options,
  placeholder,
  state,
  config = {
    rootSize: "2",
  },
  errors,
}: SelectInputProps) {
  const keys = Object.keys(options);
  console.log(`select [${name}]:`, state.value, options);
  const errorBag = cleanErrors(name, errors);
  console.debug("selected:", state.value);

  const [value, setValue] = useState(state.value);

  const handleChange = (value: string | undefined) => {
    state.changer(value);
    setValue(value);
  };

  // Determine placeholder text
  const defaultPlaceholder =
    keys.length < 1 ? "Nada que mostrar..." : "Selecciona una opción...";

  // Use provided placeholder or default
  const placeholderText = placeholder || defaultPlaceholder;

  return (
    <Grid columns="1" gapY="1" align="center" style={config.containerStyle}>
      {config?.label && <Label.Root>{config.label}</Label.Root>}
      <Select.Root
        name={name}
        size={config.rootSize}
        value={state.value}
        onValueChange={handleChange}
        disabled={keys.length < 1}
      >
        <Select.Trigger variant="surface">
          {value && options[value] ? options[value] : placeholderText}
        </Select.Trigger>
        <Select.Content position="popper">
          {keys.map((k, i) => {
            return (
              <Select.Item key={i} value={k}>
                {options[k]}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
      {errorBag && displayErrors(errorBag)}
    </Grid>
  );
}
