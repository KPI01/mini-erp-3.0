import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex, Grid, IconButton, Text, TextField } from "@radix-ui/themes";
import { useState, useEffect, type ChangeEventHandler } from "react";
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
  const firstKey = Object.keys(options)[0] || "";
  const [key, setKey] = useState<string>(firstKey);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // After first render, mark initialization complete
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    }
  }, []);

  const handleColumnChange = (value: string) => {
    setQuery("");
    setKey(value);

    if (changeColumnCallback) {
      changeColumnCallback();
    }
  };

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Don't apply empty filters automatically
    if (changeQueryCallback && value.trim() !== "") {
      changeQueryCallback(String(key), value);
    } else if (changeQueryCallback && value.trim() === "" && query.trim() !== "") {
      // If we're clearing the input, also clear the filter
      changeQueryCallback("", "");
    }
  };

  const clearQuery = () => {
    setQuery("");

    if (clearQueryCallback) {
      clearQueryCallback();
    }
  };

  return (
    <Grid columns="1" gapY="2" align="center" width="100%">
      <Text as="label">Ingresa un valor para iniciar la búsqueda:</Text>
      <Flex gapX="3" align="center" width="100%">
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
          type={key.includes("fecha") || key.includes("creado") ? "date" : "text"}
          name="query"
          value={query}
          onChange={handleQueryChange}
          style={{ flexGrow: "initial" }}
        >
          {clearAction && query && (
            <TextField.Slot side="right">
              <IconButton
                variant="ghost"
                color="red"
                onClick={clearQuery}
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