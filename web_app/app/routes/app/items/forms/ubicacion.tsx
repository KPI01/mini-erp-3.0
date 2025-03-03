import type { Ubicacion } from "@prisma/client";
import { Box, Button, Grid, Skeleton, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { CheckboxField, InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import {
  createUbicacionSchema,
  updateUbicacionSchema,
  type CreateUbicacionType,
  type UpdateUbicacionType,
} from "~/lib/zod-schemas/inventarios/ubicacion";
import type { SelectInputOptionsType } from "~/types/components";

interface CreateUbicacionFormProps {
  redirectRoute: string;
}
export function CreateUbicacionForm({
  redirectRoute,
}: CreateUbicacionFormProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [isAlmacen, setIsAlmacen] = useState(true);
  const [ubicacionesOptions, setUbicacionesOptions] =
    useState<SelectInputOptionsType>({});

  // Debug fetcher state
  useEffect(() => {
    console.log("Fetcher state:", fetcher.state);
    console.log("Fetcher data:", fetcher.data);
  }, [fetcher.state, fetcher.data]);

  // Load ubicaciones when the component mounts
  useEffect(() => {
    if (!fetcher.data) {
      fetcher.load("/app/ubicacion");
    }
  }, [fetcher]);

  // Process the data when it's loaded
  useEffect(() => {
    if (fetcher.data && fetcher.data.ubicaciones) {
      const options: SelectInputOptionsType = {};

      // Transform the data to match SelectInputOptionsType
      fetcher.data.ubicaciones
        .filter((ub: Ubicacion) => ub.isAlmacen === true)
        .forEach((ubicacion: Ubicacion) => {
          options[String(ubicacion.id)] =
            `${ubicacion.corto} - ${ubicacion.descripcion}`;
        });

      setUbicacionesOptions(options);
    }
  }, [fetcher.data]);

  const form = useForm({
    defaultValues: {
      descripcion: "",
      corto: "",
      isAlmacen: true,
    } satisfies CreateUbicacionType,
    validators: {
      onChange: createUbicacionSchema,
      onBlur: createUbicacionSchema,
    },
    onSubmit: ({ value }) => {
      // Create FormData programmatically
      const formData = new FormData();
      formData.append("descripcion", value.descripcion);
      formData.append("corto", value.corto);
      formData.append("isAlmacen", JSON.stringify(value.isAlmacen));
      formData.append("ubicacionId", String(value.ubicacionId));
      formData.append("redirectRoute", redirectRoute);

      console.log("Submitting form data:", Object.fromEntries(formData));

      // Submit with the fetcher
      fetcher.submit(formData, {
        method: "post",
        action: "/app/ubicacion",
      });
    },
  });

  console.debug("form state:", form.state);
  console.debug("select options:", ubicacionesOptions);
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
      <form.Field
        name="isAlmacen"
        children={(field) => (
          <CheckboxField
            label="¿Es un almacén?"
            input={{
              name: field.name,
              checked: field.state.value,
              onClick: () => {
                const newValue = !field.state.value;
                field.handleChange(newValue);
                setIsAlmacen(newValue); // Update local state directly
              },
              onBlur: field.handleBlur,
            }}
          />
        )}
      />
      {!isAlmacen && (
        <form.Field
          name="ubicacionId"
          children={(field) => {
            console.debug("form state:", form.state);
            console.log("Field rendering, current value:", field.state.value);

            return (
              <Box>
                <SelectInput
                  name="ubicacionId"
                  options={ubicacionesOptions}
                  state={{
                    value:
                      field.state.value === 0 ? "" : String(field.state.value),
                    changer: (value) => {
                      console.log("SelectInput changer called with:", value);
                      // Handle empty string case explicitly
                      const numValue = value === "" ? 0 : Number(value);
                      console.log("Converting to number:", numValue);
                      field.handleChange(numValue);
                    },
                  }}
                  config={{
                    label: "Almacén al que pertenece",
                  }}
                />
                {field.state.meta.errors[0]}
              </Box>
            );
          }}
        />
      )}
      <form.Subscribe
        children={() => (
          <Button
            ml="auto"
            type="button"
            onClick={() => form.handleSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        )}
      />
    </Grid>
  );
}

interface UpdateUbicacionFormProps {
  ubicacion: string;
  redirectRoute: string;
}
export function UpdateUbicacionForm({
  ubicacion,
  redirectRoute = "/app/ubicacion",
}: UpdateUbicacionFormProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [ubicacionData, setUbicacionData] = useState<Ubicacion | null>(null);
  const [ubicacionesOptions, setUbicacionesOptions] =
    useState<SelectInputOptionsType>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Debug fetcher state
  useEffect(() => {
    console.log("Update form - Fetcher state:", fetcher.state);
    console.log("Update form - Fetcher data:", fetcher.data);
  }, [fetcher.state, fetcher.data]);

  // Load ubicacion data and all ubicaciones only once when the component mounts
  useEffect(() => {
    const initializeComponent = async () => {
      if (isInitialized) return;

      try {
        // Load the specific ubicacion data
        const ubicacionId = String(ubicacion);
        console.log("Loading ubicacion with ID:", ubicacionId);
        fetcher.load(`/app/ubicacion/${ubicacionId}`);

        // Also load all ubicaciones for the select input
        const response = await fetch("/app/ubicacion");
        const data = await response.json();

        if (data && data.ubicaciones) {
          const options: SelectInputOptionsType = {};
          data.ubicaciones
            .filter((ub: Ubicacion) => ub.isAlmacen === true)
            .forEach((ub: Ubicacion) => {
              options[String(ub.id)] = `${ub.corto} - ${ub.descripcion}`;
            });
          setUbicacionesOptions(options);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing component:", error);
      }
    };

    initializeComponent();
  }, [ubicacion, isInitialized, fetcher]);

  // Process the fetched data when it's loaded
  useEffect(() => {
    if (fetcher.data && fetcher.data.ubicacion) {
      const data = fetcher.data.ubicacion;
      setUbicacionData(data);
    }
  }, [fetcher.data]);

  // Form setup - this needs to be outside any conditional
  const form = useForm({
    defaultValues: {
      id: ubicacionData?.id || 0,
      descripcion: ubicacionData?.descripcion || "",
      corto: ubicacionData?.corto || "",
      isAlmacen: ubicacionData?.isAlmacen || false,
      ubicacionId: ubicacionData?.ubicacionId || 0,
    } satisfies UpdateUbicacionType,
    validators: {
      onChange: updateUbicacionSchema,
      onBlur: updateUbicacionSchema,
    },
    onSubmit: ({ value }) => {
      // Create FormData programmatically
      const formData = new FormData();
      formData.append("id", String(value.id));
      formData.append("descripcion", value.descripcion);
      formData.append("corto", value.corto);
      formData.append("isAlmacen", String(value.isAlmacen)); // Keep isAlmacen value

      if (value.ubicacionId) {
        formData.append("ubicacionId", String(value.ubicacionId));
      }

      if (redirectRoute) {
        formData.append("redirectRoute", redirectRoute);
      }

      console.log("Submitting update form:", Object.fromEntries(formData));

      // Submit with the fetcher
      fetcher.submit(formData, {
        method: "put",
        action: `/app/ubicacion/${value.id}`,
      });
    },
  });

  // Loading state
  if (!ubicacionData) {
    return (
      <Grid gapY="3">
        <Box>
          <Text size="2" weight="bold" mb="1">
            Descripción *
          </Text>
          <Skeleton height="36px" width="100%" />
        </Box>

        <Box>
          <Text size="2" weight="bold" mb="1">
            Abreviatura *
          </Text>
          <Skeleton height="36px" width="100%" />
        </Box>

        <Box>
          <Skeleton height="24px" width="150px" />
        </Box>

        <Box mt="4">
          <Skeleton
            height="36px"
            width="120px"
            style={{ marginLeft: "auto" }}
          />
        </Box>
      </Grid>
    );
  }

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
            errors={field.state.meta.errors}
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
            errors={field.state.meta.errors}
          />
        )}
      />
      {!form.getFieldValue("isAlmacen") && (
        <form.Field
          name="ubicacionId"
          children={(field) => (
            <Box>
              <SelectInput
                name={field.name}
                options={ubicacionesOptions}
                state={{
                  value: field.state.value ? String(field.state.value) : "",
                  changer: (value) => {
                    const numValue = value === "" ? 0 : Number(value);
                    field.handleChange(numValue);
                  },
                }}
                config={{
                  label: "Almacén al que pertenece",
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <Text color="red" size="1">
                  {field.state.meta.errors[0]}
                </Text>
              )}
            </Box>
          )}
        />
      )}

      <form.Subscribe
        children={() => (
          <Button
            ml="auto"
            type="button"
            onClick={() => form.handleSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Actualizando..." : "Actualizar"}
          </Button>
        )}
      />

      {fetcher.data && fetcher.data.error && (
        <Text color="red" size="2">
          {fetcher.data.error}
        </Text>
      )}

      {fetcher.data && fetcher.data.success && (
        <Text color="green" size="2">
          Ubicación actualizada correctamente
        </Text>
      )}
    </Grid>
  );
}
