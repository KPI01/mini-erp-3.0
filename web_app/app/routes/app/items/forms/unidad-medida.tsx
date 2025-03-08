import { Box, Button, Grid } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { InputField } from "~/components/forms/input";
import {
  createUnidadMedidaSchema,
  type CreateUnidadMedidaType,
} from "~/lib/zod-schemas/inventarios/unidad-medida";

interface CreateUnidadMedidaFormProps {
  redirectRoute: string;
}
export function CreateUnidadMedidaForm({
  redirectRoute,
}: CreateUnidadMedidaFormProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  // Reset form after successful submission
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle" && fetcher.data.info) {
      form.reset();
    }
  }, [fetcher.data, fetcher.state]);

  const form = useForm({
    defaultValues: {
      descripcion: "",
      corto: "",
    } satisfies CreateUnidadMedidaType,
    validators: {
      onChange: createUnidadMedidaSchema,
      onBlur: createUnidadMedidaSchema,
    },
    onSubmit: ({ value }) => {
      // Create FormData programmatically
      const formData = new FormData();
      formData.append("descripcion", value.descripcion);
      formData.append("corto", value.corto);
      formData.append("redirectRoute", redirectRoute);

      // Submit with the fetcher
      fetcher.submit(formData, {
        method: "post",
        action: "/app/unidad-medida",
      });
    },
  });

  return (
    <Grid gapY="3">
      <form.Field
        name="descripcion"
        children={(field) => (
          <InputField
            label="Descripción *"
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
        name="corto"
        children={(field) => (
          <InputField
            label="Abreviatura *"
            input={{
              name: field.name,
              value: field.state.value,
              onChange: (e) => field.handleChange(e.target.value),
              onBlur: field.handleBlur,
            }}
          />
        )}
      />
      <form.Subscribe
        children={() => (
          <Button
            type="button"
            ml="auto"
            style={{ width: "fit-content" }}
            onClick={() => form.handleSubmit()}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        )}
      />
    </Grid>
  );
}
