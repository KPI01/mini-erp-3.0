import { Grid, Select } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { cleanErrors } from "~/helpers/utils";
import type { SelectInputProps } from "~/types/components";
import { displayErrors } from "./input";
import { useState } from "react";

export default function SelectInput({
  name,
  options,
  state,
  config,
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

  return (
    <Grid
      columns="1"
      gapY="1"
      align="center"
      className={config?.containerClass}
    >
      {config?.label && <Label.Root>{config.label}</Label.Root>}
      <Select.Root
        name={name}
        size="3"
        value={state.value}
        onValueChange={handleChange}
        disabled={keys.length < 1}
      >
        <Select.Trigger
          variant="surface"
          placeholder={keys.length < 1 ? "Nada que mostrar..." : ""}
        >
          {value && options[value]}
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
