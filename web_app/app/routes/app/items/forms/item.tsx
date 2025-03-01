import type { Item, UnidadMedida } from "@prisma/client";
import { MinusIcon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Button,
  DataList,
  Em,
  Flex,
  Grid,
  IconButton,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState, type ChangeEvent } from "react";
import { useFetcher } from "react-router";
import { InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import Popover from "~/components/ui/popover";
import {
  createItemSchema,
  type CreateItemType,
} from "~/lib/zod-schemas/inventarios/item";
import type { ItemForPedidoType } from "~/lib/zod-schemas/inventarios/reception";
import type { SelectInputOptionsType } from "~/types/components";

interface CreateItemFormProps {
  id: number;
}
export function CreateItemForm({ id }: CreateItemFormProps) {
  const fetcher = useFetcher();
  const { Form, submit, data } = fetcher;
  const [unidadesOptions, setUnidadesOptions] =
    useState<SelectInputOptionsType>();

  useEffect(() => {
    if (!fetcher.data) {
      fetcher.load("/app/unidad-medida");
    }
  }, [fetcher]);

  useEffect(() => {
    console.debug("Actualizando datos...");
    if (data) {
      console.debug("Datos de unidades cargados:", data);
      if (data.unidadMedida) {
        let helper: SelectInputOptionsType = {};
        data.unidadMedida.forEach((und: UnidadMedida) => {
          console.debug(`unidad[${und.id}]: ${und.corto}`);
          helper[String(und.id)] = und.corto;
        });
        console.debug("unidades options:", helper);
        setUnidadesOptions(helper);
      }
    }
  }, [data]);

  const form = useForm({
    defaultValues: {
      id,
      descripcion: "",
      activo: true,
      stockMin: 0,
      stockMax: 0,
      unidadMedidaId: 0,
    } satisfies CreateItemType,
    validators: { onChange: createItemSchema, onSubmit: createItemSchema },
  });

  return (
    <Grid gapY="3" asChild>
      <Form
        action={`/app/items`}
        method="post"
        onSubmit={(f) => submit(f.currentTarget)}
      >
        <form.Field
          name="id"
          children={(field) => (
            <InputField
              label="Código"
              input={{
                name: field.name,
                value: field.state.value,
                disabled: true,
              }}
            />
          )}
        />
        <form.Field
          name="descripcion"
          children={(field) => (
            <>
              <InputField
                label="Descripción *"
                input={{
                  name: field.name,
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                  onBlur: field.handleBlur,
                }}
              />
              {field.state.meta.errors}
            </>
          )}
        />
        <Flex gridColumn="1 / -1" width="100%" align="end" gapX="4">
          <form.Field
            name="unidadMedidaId"
            children={(field) => (
              <SelectInput
                config={{
                  label: "Unidad de Medida",
                  containerClass: "!basis-full",
                }}
                name={field.name}
                options={unidadesOptions ?? {}}
                state={{
                  value: String(field.state.value),
                  changer: (v) => field.handleChange(Number(v)),
                }}
              />
            )}
          />
          <Popover side="right" trigger={<PlusIcon />}></Popover>s
        </Flex>
        <Grid columns="2" gapX="3">
          <form.Field
            name="stockMin"
            children={(field) => (
              <InputField
                label="Stock mínimo"
                input={{
                  name: field.name,
                  type: "number",
                  value: field.state.value,
                  onChange: (e) => field.handleChange(Number(e.target.value)),
                }}
              />
            )}
          />
          <form.Field
            name="stockMax"
            children={(field) => (
              <InputField
                label="Stock máximo"
                input={{
                  name: field.name,
                  type: "number",
                  value: field.state.value,
                  onChange: (e) => field.handleChange(Number(e.target.value)),
                }}
              />
            )}
          />
        </Grid>
        <Flex gridColumn="1 / -1" width="100%" justify="end">
          <Button type="submit">Guardar</Button>
        </Flex>
      </Form>
    </Grid>
  );
}

export type ItemPedido = Item & {
  id: string;
  descripcion: string;
  cant: number;
  unidadMedida: UnidadMedida;
};
interface AddItemToFormProps {
  addItemFn(item: ItemForPedidoType): void;
}
type FetcherDataType = {
  items: Array<Item & { unidadMedida: UnidadMedida }>;
};
export function AddItemToForm({ addItemFn }: AddItemToFormProps) {
  const [query, setQuery] = useState("");
  const [qty, setQty] = useState(0);
  const { Form, submit, data } = useFetcher<FetcherDataType>();
  console.debug("fetcher data:", data);

  function handleAddItem() {
    const item = data?.items.filter((i) => i.id === Number(query))[0];

    if (item)
      addItemFn({
        id: item.id,
        descripcion: item.descripcion,
        unidadMedida: item.unidadMedida.corto,
        cant: qty,
      });
    setQuery("");
    setQty(0);
  }
  function handleSubmit(form: HTMLFormElement | null) {
    submit(form);
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    handleSubmit(e.currentTarget.form);
  }

  return (
    <Grid p="4">
      <Form action="/app/items" method="get">
        <input name="relations" value="unidadMedida" hidden />
        <input name="key" value="id" hidden />
        <InputField
          label="Ingresa el código del artículo *"
          input={{
            name: "id",
            type: "number",
            value: query,
            onChange: handleChange,
          }}
        />
      </Form>
      <Separator my="5" size="4" />
      <Grid columns="2">
        {data && query !== "" && data.items.length > 0 ? (
          <DataList.Root orientation="horizontal">
            {data.items.map(
              (i: Item & { unidadMedida: UnidadMedida }, ix: number) => (
                <DataList.Item key={ix}>
                  <DataList.Label>Código</DataList.Label>
                  <DataList.Value>{i.id}</DataList.Value>
                  <DataList.Label>Descripción</DataList.Label>
                  <DataList.Value>{i.descripcion}</DataList.Value>
                  <DataList.Label>Und. Medida</DataList.Label>
                  <DataList.Value>{i.unidadMedida.corto}</DataList.Value>
                </DataList.Item>
              ),
            )}
          </DataList.Root>
        ) : (
          query !== "" && (
            <Flex
              gridColumn="1 / -1"
              gapX="6"
              width="100%"
              justify="between"
              align="center"
            >
              <Text wrap="pretty" size="4">
                No existe ningún artículo con el código ingresado,{" "}
                <Em>¿deseas crearlo?</Em>
              </Text>
              <Popover
                maxWidth="14vw"
                trigger={
                  <>
                    <PlusCircledIcon /> Crear
                  </>
                }
              >
                <CreateItemForm id={Number(query)} />
              </Popover>
            </Flex>
          )
        )}
        {data &&
          query !== "" &&
          data.items &&
          Object.keys(data.items).length > 0 && (
            <Grid align="start">
              <Grid>
                <Flex gapX="4" align="center">
                  <Text align="right" as="label" size="3" color="gray">
                    Cantidad
                  </Text>
                  <TextField.Root
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    type="number"
                    style={{ textAlign: "center" }}
                  >
                    <TextField.Slot side="left">
                      <IconButton
                        color="red"
                        variant="soft"
                        size="1"
                        onClick={() =>
                          qty - 1 > 0 ? setQty(qty - 1) : setQty(0)
                        }
                      >
                        <MinusIcon />
                      </IconButton>
                    </TextField.Slot>
                    <TextField.Slot side="right">
                      <IconButton
                        color="green"
                        variant="soft"
                        size="1"
                        onClick={() => setQty(qty + 1)}
                      >
                        <PlusIcon />
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                </Flex>
              </Grid>
              <Button
                type="button"
                size="2"
                style={{
                  margin: "var(--space-2) 0 0 auto",
                  width: "fit-content",
                }}
                onClick={() => handleAddItem()}
              >
                <PlusCircledIcon /> Agregar al pedido
              </Button>
            </Grid>
          )}
      </Grid>
    </Grid>
  );
}
