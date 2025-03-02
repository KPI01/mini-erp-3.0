import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex, Grid, IconButton, Text, TextField } from "@radix-ui/themes";
import { useState, type ChangeEventHandler } from "react";
import SelectInput from "~/components/forms/select";
import type { SelectInputOptionsType } from "~/types/components";

interface TableQueryProps {
  options: SelectInputOptionsType;
  changeColumnCallback?: () => void;
  changeQueryCallback?: (column: string, qValue?: string) => void;
  clearQueryCallback?: () => void;

  clearAction?: boolean;
}
export default function TableQuery({
  options,
  changeColumnCallback,
  changeQueryCallback,
  clearQueryCallback,
  clearAction = false,
}: TableQueryProps) {
  const [query, setQuery] = useState("");
  console.debug(Object.keys(options)[0]);
  const [key, setKey] = useState<keyof typeof options>(Object.keys(options)[0]);

  const handleColumnChange = (value: keyof typeof options) => {
    setQuery("");
    setKey(value);
    if (changeColumnCallback) changeColumnCallback();
  };

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (changeQueryCallback) changeQueryCallback(String(key), value);
  };

  const clearQuery = () => {
    setQuery("");
    if (clearQueryCallback) clearQueryCallback();
  };

  return (
    <Grid columns="1" gapY="2" align="center">
      <Text as="label">Ingresa un valor para iniciar la búsqueda:</Text>
      <Flex gapX="3" align="center">
        <SelectInput
          name="tableQuery"
          options={options}
          state={{
            value: String(key),
            changer: (v) => handleColumnChange(String(v)),
          }}
          config={{ rootSize: "3" }}
        />
        <TextField.Root
          size="3"
          type={key !== "fecha" ? "text" : "date"}
          name="query"
          value={query}
          onChange={handleQueryChange}
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
        </TextField.Root>
      </Flex>
    </Grid>
  );
}
