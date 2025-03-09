import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { useState } from "react";
import { Form, useSubmit } from "react-router";
import { InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import AlertDialog from "~/components/ui/alert-dialog";
import Popover from "~/components/ui/popover";
import { addStockSchema, type AddStock, type ItemForPedido } from "~/lib/zod-schemas/inventarios/stock";
import type { SelectInputOptionsType } from "~/types/components";
import { AddItemToPedidoForm } from "../item/AddToPedido";
import DataTable from "~/components/table/data-table";
import { itemInPedidoCol } from "~/lib/column-definitions/item";
import type { ColumnDef } from "@tanstack/react-table";
import { CreateUbicacionForm } from "../ubicacion/Create";
import { UpdateUbicacionForm } from "../ubicacion/Update";

interface AddStockFormProps {
    aux: {
        ubicaciones: SelectInputOptionsType;
    };
}

export function CreateStockForm({ aux }: AddStockFormProps) {
    const submit = useSubmit();
    const form = useForm({
        defaultValues: {
            fecha: new Date(),
            ubicacionId: 0,
            items: [],
        } satisfies AddStock,
        validators: {
            onChange: addStockSchema,
            onBlur: addStockSchema,
        },
    });
    const [ubicacionSelected, setUbicacionSelected] = useState(false);

    const itemToPedido = (item: ItemForPedido) => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create FormData object to handle form submission
        const formData = new FormData();

        // Add fecha in ISO format
        formData.append("fecha", form.getFieldValue("fecha").toISOString());

        // Add ubicacionId
        formData.append("ubicacionId", String(form.getFieldValue("ubicacionId")));

        // Handle items array - convert to JSON string
        formData.append("items", JSON.stringify(form.getFieldValue("items")));

        // Submit the form
        submit(formData, {
            method: "post",
            action: "/app/items/reception",
        });
    };

    return (
        <Grid asChild gapY="5">
            <Form method="post" action="/app/items/reception" onSubmit={handleSubmit}>
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
                        <Popover trigger={<><PlusIcon /> Nueva ubicación</>}>
                            <CreateUbicacionForm redirectRoute="/app/items/reception" />
                        </Popover>
                    ) : (
                        <Popover trigger={<Pencil1Icon />}>
                            <UpdateUbicacionForm
                                ubicacion={String(form.getFieldValue("ubicacionId"))}
                                redirectRoute="/app/items/reception"
                            />
                        </Popover>
                    )}
                </Flex>
                <Grid columns="2" gapY="3" justify="end">
                    <Box gridColumnEnd="3" width="fit-content" ml="auto">
                        <AlertDialog
                            trigger={
                                <Button>
                                    <PlusIcon /> Agregar artículo
                                </Button>
                            }
                        >
                            <AddItemToPedidoForm addItemFn={(value) => itemToPedido(value)} />
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

                {/* Hidden input fields to store serialized items data */}
                <form.Field
                    name="items"
                    children={(field) => (
                        <input
                            type="hidden"
                            name="itemsJSON"
                            value={JSON.stringify(field.state.value)}
                        />
                    )}
                />

                <form.Subscribe
                    children={({ isSubmitting, canSubmit, isValid }) => (
                        <Button
                            ml="auto"
                            size="4"
                            type="submit"
                            disabled={isSubmitting || !canSubmit || !isValid}
                        >
                            Enviar
                        </Button>
                    )}
                />
            </Form>
        </Grid>
    );
}