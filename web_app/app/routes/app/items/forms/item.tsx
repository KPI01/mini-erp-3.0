import type { Item, UnidadMedida } from "@prisma/client";
import {
  Cross2Icon,
  DotsHorizontalIcon,
  MinusIcon,
  Pencil2Icon,
  PlusCircledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  DataList,
  DropdownMenu,
  Em,
  Flex,
  Grid,
  IconButton,
  Separator,
  Table,
  Text,
  TextField,
  AlertDialog as AlertD,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState, type ChangeEvent, type Dispatch } from "react";
import { useFetcher } from "react-router";
import { CheckboxField, InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import Popover from "~/components/ui/popover";
import {
  createItemSchema,
  updateItemSchema,
  type CreateItemType,
  type UpdateItemType,
} from "~/lib/zod-schemas/inventarios/item";
import type { ItemForPedidoType } from "~/lib/zod-schemas/inventarios/stock.ts";
import type { SelectInputOptionsType } from "~/types/components";
import { CreateUnidadMedidaForm } from "./unidad-medida";
import AlertDialog from "~/components/ui/alert-dialog";

interface CreateItemFormProps {
  id: number;
  redirectRoute: string;
}
export function CreateItemForm({ id, redirectRoute }: CreateItemFormProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [unidadesOptions, setUnidadesOptions] =
    useState<SelectInputOptionsType>();

  // Load unidades de medida
  useEffect(() => {
    if (!fetcher.data) {
      fetcher.load("/app/unidad-medida");
    }
  }, [fetcher]);

  useEffect(() => {
    console.debug("Actualizando datos...");
    if (fetcher.data) {
      console.debug("Datos de unidades cargados:", fetcher.data);
      if (fetcher.data.unidadMedida) {
        let helper: SelectInputOptionsType = {};
        fetcher.data.unidadMedida.forEach((und: UnidadMedida) => {
          console.debug(`unidad[${und.id}]: ${und.corto}`);
          helper[String(und.id)] = und.corto;
        });
        console.debug("unidades options:", helper);
        setUnidadesOptions(helper);
      }
    }
  }, [fetcher.data]);

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
    onSubmit: ({ value }) => {
      // Create FormData programmatically
      const formData = new FormData();
      formData.append("id", String(value.id));
      formData.append("descripcion", value.descripcion);
      formData.append("activo", String(value.activo));
      formData.append("stockMin", String(value.stockMin));
      formData.append("stockMax", String(value.stockMax));
      formData.append("unidadMedidaId", String(value.unidadMedidaId));

      // Submit with the fetcher
      fetcher.submit(formData, {
        method: "post",
        action: "/app/items",
      });
    },
  });

  // Reset form after successful submission
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle" && fetcher.data.info) {
      form.reset();
      // You might want to reload the parent form or close the dialog here
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Grid gapY="3" asChild>
      <Box>
        <Flex align="start" gapX="3">
          <form.Field
            name="id"
            children={(field) => (
              <Box flexBasis="10%">
                <InputField
                  label="Código"
                  input={{
                    name: field.name,
                    value: field.state.value,
                    disabled: true,
                  }}
                />
              </Box>
            )}
          />
          <form.Field
            name="descripcion"
            children={(field) => (
              <Grid flexBasis="45%">
                <InputField
                  label="Descripción *"
                  input={{
                    name: field.name,
                    value: field.state.value,
                    onChange: (e) => field.handleChange(e.target.value),
                    onBlur: field.handleBlur,
                  }}
                />
                <Text size="2">{field.state.meta.errors}</Text>
              </Grid>
            )}
          />
          <Flex align="end" gapX="3" justify="between" flexBasis="45%">
            <form.Field
              name="unidadMedidaId"
              children={(field) => (
                <SelectInput
                  name={field.name}
                  options={unidadesOptions ?? {}}
                  placeholder="Unidad..."
                  config={{
                    label: "Medida",
                  }}
                  state={{
                    value: String(field.state.value),
                    changer: (v) => field.handleChange(Number(v)),
                  }}
                />
              )}
            />
            <Popover side="right" maxWidth="200px" trigger={<PlusIcon />}>
              <CreateUnidadMedidaForm redirectRoute={redirectRoute} />
            </Popover>
          </Flex>
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
          <Button
            type="button"
            onClick={() => form.handleSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </Flex>
      </Box>
    </Grid>
  );
}

interface UpdateItemFormProps {
  state: { open: boolean; setOpen: Dispatch<boolean> };
  data: UpdateItemType & { id?: number };
}
export function UpdateItemForm({ data, state }: UpdateItemFormProps) {
  const fetcher = useFetcher();
  const [unidadesOptions, setUnidadesOptions] =
    useState<SelectInputOptionsType>();

  // Load unidades de medida
  useEffect(() => {
    if (!fetcher.data) {
      fetcher.load("/app/unidad-medida");
    }
  }, [fetcher]);

  useEffect(() => {
    console.debug("Actualizando datos...");
    if (fetcher.data) {
      console.debug("Datos de unidades cargados:", fetcher.data);
      if (fetcher.data.unidadMedida) {
        let helper: SelectInputOptionsType = {};
        fetcher.data.unidadMedida.forEach((und: UnidadMedida) => {
          console.debug(`unidad[${und.id}]: ${und.corto}`);
          helper[String(und.id)] = und.corto;
        });
        console.debug("unidades options:", helper);
        setUnidadesOptions(helper);
      }
    }
  }, [fetcher.data]);

  const isSubmitting = fetcher.state === "submitting";
  const form = useForm({
    defaultValues: {
      ...data,
    } satisfies UpdateItemType,
    validators: { onChange: updateItemSchema, onBlur: updateItemSchema },
    onSubmit: ({ value }) => {
      const formData = new FormData();
      formData.append("descripcion", String(value?.descripcion));
      formData.append("activo", String(value?.activo));
      formData.append("stockMin", String(value?.stockMin));
      formData.append("stockMax", String(value?.stockMax));
      formData.append("unidadMedidaid", String(value?.unidadMedidaId));
      formData.append("redirectRoute", "/app/items/reception");

      fetcher.submit(formData, {
        action: `/app/items/${data.id}`,
        method: "put",
      });

      state.setOpen(false);
    },
  });

  return (
    <AlertD.Root
      open={state.open}
      onOpenChange={(isOpen) => state.setOpen(isOpen)}
    >
      <AlertD.Content>
        <Box>
          <AlertD.Title>Editando el artículo...</AlertD.Title>
        </Box>
        <Separator size="4" mb="4" />
        <Box>
          <Flex align="end" gapX="3" mb="5">
            <form.Field
              name="descripcion"
              children={(field) => (
                <Box flexBasis="75%">
                  <InputField
                    label="Descripción del artículo"
                    input={{
                      name: field.name,
                      type: "text",
                      value: field.state.value,
                      onChange: (e) => field.handleChange(e.target.value),
                      onBlur: field.handleBlur,
                    }}
                  />
                </Box>
              )}
            />
            <form.Field
              name="unidadMedidaId"
              children={(field) => (
                <Box flexBasis="25%">
                  <SelectInput
                    name={field.name}
                    options={unidadesOptions ?? {}}
                    state={{
                      value: String(field.state.value),
                      changer: (v) => field.handleChange(Number(v)),
                    }}
                    config={{
                      label: "Und. de Medida",
                    }}
                  />
                </Box>
              )}
            />
          </Flex>
          <form.Field
            name="activo"
            children={(field) => (
              <CheckboxField
                label="¿Artículo activo?"
                containerProps={{ mb: "4" }}
                input={{
                  name: field.name,
                  checked: field.state.value,
                  value: String(field.state.value),
                  onClick: () => field.handleChange(!field.state.value),
                  onBlur: field.handleBlur,
                }}
              />
            )}
          />
          <Flex gapX="3">
            <form.Field
              name="stockMin"
              children={(field) => (
                <Box flexBasis="50%">
                  <InputField
                    label="Stock Mínimo"
                    input={{
                      name: field.name,
                      type: "number",
                      value: field.state.value,
                      onChange: (e) =>
                        field.handleChange(Number(e.target.value)),
                      onBlur: field.handleBlur,
                    }}
                  />
                </Box>
              )}
            />
            <form.Field
              name="stockMax"
              children={(field) => (
                <Box flexBasis="50%">
                  <InputField
                    label="Stock Máximo"
                    input={{
                      name: field.name,
                      type: "number",
                      value: field.state.value,
                      onChange: (e) =>
                        field.handleChange(Number(e.target.value)),
                      onBlur: field.handleBlur,
                    }}
                  />
                </Box>
              )}
            />
          </Flex>
          <Flex width="100%" mt="5" justify="end">
            <Button
              type="button"
              size="2"
              onClick={() => form.handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </Flex>
        </Box>

        <AlertD.Cancel>
          <IconButton
            size="3"
            color="gray"
            radius="full"
            variant="ghost"
            style={{ position: "absolute", top: "10%", right: "5%" }}
          >
            <Cross2Icon height={20} width={20} />
          </IconButton>
        </AlertD.Cancel>
      </AlertD.Content>
    </AlertD.Root>
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
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [query, setQuery] = useState("");
  const [qty, setQty] = useState(0);
  const { Form, submit, data } = useFetcher<FetcherDataType>();

  function handleAddItem() {
    const item = data?.items.filter((i) => i.id === Number(query))[0];
    if (item) {
      addItemFn({
        id: item.id,
        descripcion: item.descripcion,
        unidadMedida: item.unidadMedida.corto,
        cant: qty,
      });
      setQuery("");
      setQty(0);
    }
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

      {query !== "" && (
        <>
          <Separator my="3" size="4" />

          {data && data.items && data.items.length > 0 ? (
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Descripción</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Cantidad</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Unidad</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right">
                    Opciones
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.items.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.descripcion}</Table.Cell>
                    <Table.Cell>
                      <Flex align="center" gap="1">
                        <IconButton
                          size="1"
                          variant="soft"
                          color="gray"
                          onClick={() => qty > 0 && setQty(qty - 1)}
                        >
                          <MinusIcon />
                        </IconButton>

                        <TextField.Root
                          size="1"
                          variant="surface"
                          style={{ width: "4rem", textAlign: "center" }}
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        />

                        <IconButton
                          size="1"
                          variant="soft"
                          color="gray"
                          onClick={() => setQty(qty + 1)}
                        >
                          <PlusIcon />
                        </IconButton>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>{item.unidadMedida.corto}</Table.Cell>
                    <Table.Cell align="right">
                      <Flex gap="2" justify="end">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger>
                            <IconButton variant="ghost" size="1">
                              <DotsHorizontalIcon />
                            </IconButton>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content
                            side="right"
                            sideOffset={5}
                            variant="soft"
                          >
                            <DropdownMenu.Item
                              onSelect={(event) => {
                                event.preventDefault();
                                setSelectedItem(item);
                                setOpen(true);
                              }}
                            >
                              <Pencil2Icon /> Editar artículo
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onClick={handleAddItem}
                              disabled={qty <= 0}
                            >
                              <PlusCircledIcon /> Agregar al pedido
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Flex py="4" gapX="4" width="100%" justify="between" align="center">
              <Text wrap="pretty" size="3">
                No existe ningún artículo con el código ingresado,{" "}
                <Em>¿deseas crearlo?</Em>
              </Text>
              <AlertDialog
                header={{
                  title: "Creación de artículo",
                  description:
                    "Ingresa los datos del artículo para registrarlo en la base de datos.",
                }}
                trigger={
                  <>
                    <PlusCircledIcon /> Crear
                  </>
                }
              >
                <CreateItemForm
                  id={Number(query)}
                  redirectRoute="/app/items/reception"
                />
              </AlertDialog>
            </Flex>
          )}
        </>
      )}
      {selectedItem && (
        <UpdateItemForm
          state={{ open, setOpen }}
          data={selectedItem as UpdateItemType}
        />
      )}
    </Grid>
  );
}
