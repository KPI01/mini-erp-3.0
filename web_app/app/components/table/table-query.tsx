import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex, Grid, IconButton, Text, TextField } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { useState, type ChangeEventHandler } from "react";
import { DebouncedInput } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import type {
  SelectInputOptionsType,
  TableQueryProps,
} from "~/types/components";

export default function TableQuery({
  options,
  placeholder,
  changeColumnCallback,
  changeQueryCallback,
  clearQueryCallback,
  clearAction = false,
}: TableQueryProps) {
  const [query, setQuery] = useState("");
  const optionsIsObj = typeof options === "object";
  const initialValue = optionsIsObj ? Object.keys(options)[0] : options;
  const [key, setKey] = useState(initialValue);

  const handleColumnChange = (value: string) => {
    setQuery("");
    if (optionsIsObj) setKey(value);
    if (changeColumnCallback) changeColumnCallback();
  };

  function handleQueryChange(value: string) {
    setQuery(value);
    if (changeQueryCallback) changeQueryCallback(String(key), value);
  }

  const clearQuery = () => {
    setQuery("");
    if (clearQueryCallback) clearQueryCallback();
  };

  return (
    <Grid columns="1" gapY="2" align="center">
      <Text as="label">
        {placeholder
          ? placeholder
          : "Ingresa un valor para iniciar la búsqueda:"}
      </Text>
      <Flex gapX="3" align="center">
        {options && typeof options === "object" && (
          <SelectInput
            name="tableQuery"
            options={options}
            state={{
              value: String(key),
              changer: (v) => handleColumnChange(String(v)),
            }}
            config={{ rootSize: "3" }}
          />
        )}
        <DebouncedInput
          debounce={250}
          size="3"
          type={key !== "fecha" ? "text" : "date"}
          name="query"
          value={query}
          onChange={(v) => handleQueryChange(String(v))}
        >
          {clearAction && (
            <TextField.Slot side="right">
              <IconButton
                variant="ghost"
                color="red"
                onClick={() => clearQuery()}
              >
                <Cross1Icon />
              </IconButton>
            </TextField.Slot>
          )}
        </DebouncedInput>
      </Flex>
    </Grid>
  );
}
