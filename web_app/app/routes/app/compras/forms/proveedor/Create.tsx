import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { Form } from "react-router";
import { InputField } from "~/components/forms/input";
import { TextAreaField } from "~/components/forms/textArea";
import { createProveedorSchema, type CreateProveedor } from "~/lib/zod-schemas/compras/proveedor";

interface CreateProveedorFormProps {
  submitFn: () => void
}
export default function CreateProveedorForm({ submitFn }: CreateProveedorFormProps) {
  const form = useForm({
    defaultValues: {
      razonSocial: "",
      idFiscal: "",
      correo: "",
      direccion: "",
      telefono: "",
      url: "",
      observaciones: "",
    } satisfies CreateProveedor,
    validators: { onChange: createProveedorSchema, onBlur: createProveedorSchema }
  });

  return (
    <Grid asChild gapY="4" columns="2" gapX="2">
      <Form action="/app/compras/proveedor" method="post" onSubmit={() => submitFn()}>
        <form.Field
          name="razonSocial"
          children={(field) => (
            <InputField
              label="Razón Social *"
              input={{
                name: field.name,
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                onBlur: field.handleBlur,
              }}
            />
          )}
        />
        <form.Field
          name="idFiscal"
          children={(field) => (
            <InputField
              label="ID Fiscal *"
              input={{
                name: field.name,
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                onBlur: field.handleBlur,
              }}
            />
          )}
        />
        <form.Field
          name="correo"
          children={(field) => (
            <InputField
              label="Correo *"
              input={{
                name: field.name,
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                onBlur: field.handleBlur,
              }}
            />
          )}
        />
        <form.Field
          name="direccion"
          children={(field) => (
            <InputField
              label="Dirección *"
              input={{
                name: field.name,
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                onBlur: field.handleBlur,
              }}
            />
          )}
        />
        <form.Field
          name="telefono"
          children={(field) => (
            <InputField
              label="Nro. de Teléfono"
              input={{
                name: field.name,
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                onBlur: field.handleBlur
              }}
            />
          )}
        />
        <form.Field
          name="url"
          children={(field) => (
            <InputField
              label="Sitio Web"
              input={{
                name: field.name,
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                onBlur: field.handleBlur
              }} />
          )} />
        <form.Field
          name="observaciones"
          children={(field) => (
            <TextAreaField
              label="Observaciones"
              textarea={{
                name: field.name,
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                onBlur: field.handleBlur
              }}
              config={{
                container: { gridColumn: "1 / -1" }
              }}
            />
          )}
        />
        <form.Subscribe
          children={() => (
            <Flex gridColumn="1 / -1" justify="end">
              <Button type="submit" size="3">Guardar</Button>
            </Flex>
          )}
        />
      </Form>
    </Grid>
  );
}
