import type { Ubicacion } from "@prisma/client";
import { Box, Button, Grid } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { CheckboxField, InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import {
    createUbicacionSchema,
    type CreateUbicacion,
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
        } satisfies CreateUbicacion,
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