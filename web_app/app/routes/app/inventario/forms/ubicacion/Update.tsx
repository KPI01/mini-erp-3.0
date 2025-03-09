import type { Ubicacion } from "@prisma/client";
import { Box, Button, Grid, Skeleton, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import { updateUbicacionSchema, type UpdateUbicacion } from "~/lib/zod-schemas/inventarios/ubicacion";
import type { SelectInputOptionsType } from "~/types/components";

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
        } satisfies UpdateUbicacion,
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