import type { UnidadMedida } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import Popover from "~/components/ui/popover";
import { createItemSchema, type CreateItem } from "~/lib/zod-schemas/inventarios/item";
import type { SelectInputOptionsType } from "~/types/components";
import { CreateUnidadMedidaForm } from "../unidadMedida/Create";

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
        } satisfies CreateItem,
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
                            <Box flexBasis="45%">
                                <InputField
                                    label="Descripción *"
                                    input={{
                                        name: field.name,
                                        value: field.state.value,
                                        onChange: (e) => field.handleChange(e.target.value),
                                        onBlur: field.handleBlur,
                                    }}
                                />
                            </Box>
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