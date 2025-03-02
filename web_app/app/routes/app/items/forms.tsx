import { PrismaClient, type Item, type UnidadMedida } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button, Em, Flex, Grid, TextArea } from "@radix-ui/themes";
import { formOptions, useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { CheckboxField, InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import { INVALID_MSG, MAX_LENGTH_MSG, STRING_FIELD } from "~/helpers/forms";
import type { SelectInputOptionsType } from "~/types/components";
import { format } from "date-fns";
import { Label } from "radix-ui";

const prisma = new PrismaClient();

// inicio: addItem
export const addItemSchema = z.object({
  descripcion: STRING_FIELD,
  activo: z.boolean().optional().default(true),
  unidadMedidaId: STRING_FIELD,
});
export type AddItemType = z.infer<typeof addItemSchema>;
interface AddItemFormProps {
  errors: any;
  ubicaciones: SelectInputOptionsType;
  unidades: SelectInputOptionsType;
}
export function AddItemForm({
  errors,
  ubicaciones,
  unidades,
}: AddItemFormProps) {
  const form = useForm({
    defaultValues: {
      descripcion: "",
      activo: true,
    } as AddItemType,
    validators: { onChange: addItemSchema, onBlur: addItemSchema },
  });

  return (
    <Grid asChild gapY="4">
      <Form
        method="post"
        action="/app/items"
        onSubmit={() => form.handleSubmit()}
      >
        <Grid gapX="3" columns="2" className="!w-full">
          <form.Field
            name="descripcion"
            validators={{
              onChange: addItemSchema.shape.descripcion,
              onBlur: addItemSchema.shape.descripcion,
            }}
            children={(field) => (
              <InputField
                label="Descripción  *"
                input={{
                  type: "text",
                  name: field.name,
                  id: field.name,
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                  onBlur: field.handleBlur,
                }}
                errors={errors}
              />
            )}
          />
          <form.Field
            name="unidadMedidaId"
            validators={{ onChange: addItemSchema.shape.unidadMedidaId }}
            children={(field) => (
              <SelectInput
                name={field.name}
                options={unidades}
                state={{
                  value: field.state.value,
                  changer: field.handleChange,
                }}
                config={{
                  label: "Unidad de medida *",
                }}
                errors={errors}
              />
            )}
          />
        </Grid>
        <form.Field
          name="activo"
          validators={{
            onChange: addItemSchema.shape.activo,
            onSubmit: addItemSchema.shape.activo,
          }}
          children={({ name, state, handleChange, handleBlur }) => (
            <CheckboxField
              label="¿Articulo activo?"
              input={{
                name,
                checked: state.value,
                value: String(state.value),
                onClick: () => handleChange(!state.value),
                onBlur: handleBlur,
              }}
              errors={errors}
            />
          )}
        />
        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isPristine,
          ]}
        >
          <Button ml="auto" size="3" type="submit">
            {"Enviar"}
          </Button>
        </form.Subscribe>
      </Form>
    </Grid>
  );
}

export const editItemSchema = z.object({
  descripcion: z.string({ invalid_type_error: INVALID_MSG }),
  activo: z.boolean().optional(),
  stockMin: z.number({ invalid_type_error: INVALID_MSG }).optional(),
  stockMax: z.number({ invalid_type_error: INVALID_MSG }).optional(),
});
export type EditItemType = z.infer<typeof editItemSchema>;
interface EditItemFormProps {
  defaults: EditItemType;
  id: number | string;
  aux: SelectInputOptionsType;
  errors: Record<string, unknown>;
}
export function EditItemForm({ defaults, id, aux, errors }: EditItemFormProps) {
  console.debug("EditItemForm:", defaults, id, aux);
  const form = useForm({
    defaultValues: defaults,
    validators: { onChange: editItemSchema, onBlur: editItemSchema },
  });

  return (
    <Grid asChild gapY="2">
      <Form method="put" action={`/app/items/${id}`}>
        <form.Field
          name="descripcion"
          validators={{
            onChange: editItemSchema.shape.descripcion,
            onBlur: editItemSchema.shape.descripcion,
          }}
          children={(field) => (
            <InputField
              label="Descripción  *"
              input={{
                type: "text",
                name: field.name,
                id: field.name,
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                onBlur: field.handleBlur,
              }}
              errors={errors}
            />
          )}
        />
        <form.Field
          name="activo"
          children={({ name, state, handleChange, handleBlur }) => (
            <CheckboxField
              label="¿Esta activo?"
              input={{
                name,
                checked: state.value,
                value: String(state.value),
                onClick: () => handleChange(!state.value),
                onBlur: handleBlur,
              }}
            />
          )}
        />
        <Grid columns="2" gapX="3">
          <form.Field
            name="stockMin"
            validators={{
              onChange: editItemSchema.shape.stockMin,
              onBlur: editItemSchema.shape.stockMin,
            }}
            children={({ name, state, handleBlur, handleChange }) => (
              <InputField
                label="Stock Mínimo"
                input={{
                  min: 0,
                  type: "number",
                  name,
                  value: state.value,
                  onChange: (e) => handleChange(Number(e.target.value)),
                  onBlur: handleBlur,
                }}
              />
            )}
          />
          <form.Field
            name="stockMax"
            validators={{
              onChange: editItemSchema.shape.stockMax,
              onBlur: editItemSchema.shape.stockMax,
            }}
            children={({ name, state, handleBlur, handleChange }) => (
              <InputField
                label="Stock Máximo"
                input={{
                  min: 0,
                  type: "number",
                  name,
                  value: state.value,
                  onChange: (e) => handleChange(Number(e.target.value)),
                  onBlur: handleBlur,
                }}
              />
            )}
          />
        </Grid>
        <form.Subscribe
          selector={({ isPristine, isDirty }) => [isPristine, isDirty]}
          children={([isPristine, isDirty]) => (
            <Button type="submit">
              {isDirty && (
                <>
                  <CheckIcon /> Guardar cambios
                </>
              )}
              {isPristine && <Em>No se han detectado cambios</Em>}
            </Button>
          )}
        />
      </Form>
    </Grid>
  );
}
// fin

// inicio: addUbicacion
export const addUbicacionSchema = z.object({
  descripcion: STRING_FIELD,
  corto: z
    .string({ invalid_type_error: INVALID_MSG })
    .max(10, MAX_LENGTH_MSG(10))
    .optional(),
  isAlmacen: z.boolean().default(false),
  ubicacionId: z.string().optional(),
});
export type AddUbicacionType = z.infer<typeof addUbicacionSchema>;
interface AddUbicacionFormProps {
  ubicaciones: SelectInputOptionsType;
  errors: Record<string, unknown>;
}
export function AddUbicacionForm({
  ubicaciones,
  errors,
}: AddUbicacionFormProps) {
  const [visible, setVisible] = useState(false);
  const form = useForm({
    defaultValues: {
      descripcion: "",
      corto: "",
      isAlmacen: true,
    } as AddUbicacionType,
    validators: { onChange: addUbicacionSchema, onSubmit: addUbicacionSchema },
  });
  return (
    <Grid asChild gapY="3">
      <Form
        action="/app/ubicacion"
        method="post"
        onSubmit={() => form.handleSubmit()}
      >
        <form.Field
          name="descripcion"
          children={({ name, state, handleBlur, handleChange }) => (
            <InputField
              label="Descripción *"
              input={{
                type: "text",
                name,
                value: state.value,
                onChange: (e) => handleChange(e.target.value),
                onBlur: handleBlur,
              }}
              errors={errors}
            />
          )}
        />
        <form.Field
          name="corto"
          children={({ name, state, handleBlur, handleChange }) => (
            <InputField
              label="Abreviatura"
              input={{
                name,
                type: "text",
                value: state.value,
                onChange: (e) => handleChange(e.target.value),
                onBlur: handleBlur,
              }}
              errors={errors}
            />
          )}
        />
        <form.Field
          name="isAlmacen"
          children={({ name, state, handleBlur, handleChange }) => (
            <CheckboxField
              label="¿Es un almacén?"
              input={{
                name,
                value: String(state.value),
                checked: state.value,
                onClick: () => {
                  setVisible(!visible);
                  handleChange(!state.value);
                },
                onBlur: handleBlur,
              }}
            />
          )}
        />
        {visible && (
          <form.Field
            name="ubicacionId"
            children={(field) => (
              <SelectInput
                name={field.name}
                options={ubicaciones}
                state={{
                  value: field.state.value ?? undefined,
                  changer: field.handleChange,
                }}
                config={{
                  label: "Ubicación *",
                }}
                errors={errors}
              />
            )}
          />
        )}
        <form.Subscribe children={() => <Button>Enviar</Button>} />
      </Form>
    </Grid>
  );
}
// fin

//inicio: unidadMedida
export const addUnidadMedidaSchema = z.object({
  descripcion: STRING_FIELD,
  corto: STRING_FIELD.max(5, MAX_LENGTH_MSG(5)).refine(
    async (value) => {
      return await prisma.unidadMedida
        .findFirst({
          where: {
            corto: value,
          },
        })
        .then(async (record) => record?.corto !== value);
    },
    {
      message: "Este valor ya existe.",
    },
  ),
});
export type AddUnidadMedidaType = z.infer<typeof addUnidadMedidaSchema>;
export function AddUnidadMedidaForm({
  errors,
}: {
  errors: Record<string, unknown>;
}) {
  const form = useForm({
    defaultValues: {
      descripcion: "",
      corto: "",
    } as AddUnidadMedidaType,
    validators: {
      onChange: addUnidadMedidaSchema,
      onSubmit: addUnidadMedidaSchema,
    },
  });

  return (
    <Form className="grid gap-y-4" action="/app/unidad-medida" method="post">
      <form.Field
        name="descripcion"
        validators={{ onChange: addUnidadMedidaSchema.shape.descripcion }}
        children={(field) => (
          <InputField
            label="Descripción *"
            input={{
              type: "text",
              id: field.name,
              name: field.name,
              value: field.state.value,
              onChange: (e) => field.handleChange(e.target.value),
            }}
            errors={errors}
          />
        )}
      />
      <form.Field
        name="corto"
        validators={{ onChange: addUnidadMedidaSchema.shape.corto }}
        children={(field) => (
          <InputField
            label="Abreviatura *"
            input={{
              type: "text",
              id: field.name,
              name: field.name,
              value: field.state.value,
              onChange: (e) => field.handleChange(e.target.value),
            }}
            errors={errors}
          />
        )}
      />
      <form.Subscribe children={() => <Button>Enviar</Button>} />
    </Form>
  );
}
// fin
