import type { UnidadMedida } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog as AlertD, Box, Button, Flex, IconButton, Separator } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState, type Dispatch } from "react";
import { useFetcher } from "react-router";
import { CheckboxField, InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import { updateItemSchema, type UpdateItem } from "~/lib/zod-schemas/inventarios/item";
import type { SelectInputOptionsType } from "~/types/components";

interface UpdateItemFormProps {
    state: { open: boolean; setOpen: Dispatch<boolean> };
    data: UpdateItem & { id?: number };
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
        } satisfies UpdateItem,
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