import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { Form } from "react-router";
import { InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import AlertDialog from "~/components/ui/alert-dialog";
import type { SelectInputOptionsType } from "~/types/components";
import { AddItemToForm } from "./item";
import {
  addStockSchema,
  type addStockType,
  type ItemForPedidoType,
} from "~/lib/zod-schemas/inventarios/reception";
import DataTable from "~/components/table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import {
  itemInPedidoCol,
  itemInPedidoColHelper,
} from "~/lib/column-definitions/item";
import Popover from "~/components/ui/popover";
import { CreateUbicacionForm } from "./ubicacion";
import { useState } from "react";

interface AddStockFormProps {
  aux: {
    ubicaciones: SelectInputOptionsType;
  };
}
export function AddStockForm({ aux }: AddStockFormProps) {
  const form = useForm({
    defaultValues: {
      fecha: new Date(),
      ubicacionId: 0,
      items: [],
    } satisfies addStockType,
    validators: {
      onChange: addStockSchema,
      onBlur: addStockSchema,
    },
  });
  const [ubicacionSelected, setUbicacionSelected] = useState(false);

  const itemToPedido = (item: ItemForPedidoType) => {
    let exists = false;
    const currentItems = form.getFieldValue("items");

    const updatedItems = currentItems.map((i) => {
      if (i.id === item.id) {
        console.info(
          `El artículo {${item.id}} ya está agregado, incrementando cantidad`,
        );
        exists = true;
        return {
          ...i,
          cant: i.cant + (item.cant || 1),
        };
      }
      return i;
    });

    if (exists) {
      form.setFieldValue("items", updatedItems);
    } else {
      form.pushFieldValue("items", item);
    }
  };

  return (
    <Grid gapY="5" asChild>
      <Form method="post" action="/app/items/reception">
        <form.Field
          name="fecha"
          children={(field) => (
            <InputField
              label="Fecha de movimiento *"
              input={{
                name: field.name,
                type: "datetime-local",
                max: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
                value: format(field.state.value, "yyyy-MM-dd'T'HH:mm"),
                onChange: (e) => field.handleChange(new Date(e.target.value)),
              }}
            />
          )}
        />
        <Flex align="end" gapX="5">
          <form.Field
            name="ubicacionId"
            children={(field) => (
              <SelectInput
                name={field.name}
                options={aux.ubicaciones}
                state={{
                  value: String(field.state.value),
                  changer: (value) => {
                    field.handleChange(Number(value));
                    if (value !== "0") setUbicacionSelected(true);
                  },
                }}
                config={{
                  label: "Ubicación en la que se recibe el material",
                  containerStyle: { width: "100%" },
                }}
              />
            )}
          />
          {!ubicacionSelected ? (
            <Popover trigger={<PlusIcon />}>
              <CreateUbicacionForm redirectRoute="/app/items/reception" />
            </Popover>
          ) : (
            <Popover trigger={<Pencil1Icon />}>
              Formulario para editar la ubicación
            </Popover>
          )}
        </Flex>
        <Grid columns="2" gapY="3" justify="end">
          <Box gridColumnEnd="3" width="fit-conte nt" ml="auto">
            <AlertDialog
              trigger={
                <>
                  <PlusIcon /> Agregar artículo
                </>
              }
            >
              <AddItemToForm addItemFn={(value) => itemToPedido(value)} />
            </AlertDialog>
          </Box>
          <Box gridColumn="1 / -1">
            <DataTable
              data={form.getFieldValue("items")}
              columns={itemInPedidoCol as ColumnDef<any>[]}
              state={{
                pageSize: 5,
                showPagination: true,
              }}
            />
          </Box>
        </Grid>
        <form.Subscribe
          children={() => (
            <Button ml="auto" size="4">
              Enviar
            </Button>
          )}
        />
      </Form>
    </Grid>
  );
}
