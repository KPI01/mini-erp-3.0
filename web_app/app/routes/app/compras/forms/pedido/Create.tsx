import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { format, addDays } from "date-fns";
import { Form, useSubmit } from "react-router";
import { InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import AlertDialog from "~/components/ui/alert-dialog";
import type { SelectInputOptionsType } from "~/types/components";
import { PlusIcon } from "@radix-ui/react-icons";
import DataTable from "~/components/table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import Popover from "~/components/ui/popover";
import { useState, useRef } from "react";
import { itemPedidoColumns } from "~/lib/column-definitions/pedido";
import { type ItemForPedido } from "~/lib/zod-schemas/compras/pedido";
import { AddItemToFormWithPrice } from "../pedido/AddItemWithPrice";
import CreateProveedorForm from "../proveedor/Create";

interface CreatePedidoFormProps {
    aux: {
        proveedores: SelectInputOptionsType;
    };
}

export default function CreatePedidoForm({ aux }: CreatePedidoFormProps) {
    const submit = useSubmit();
    const [proveedorSelected, setProveedorSelected] = useState(false);
    const [items, setItems] = useState<ItemForPedido[]>([]);
    const [totals, setTotals] = useState({
        subTotal: 0,
        impuestos: 0,
        total: 0,
    });

    // Create a ref to track if we're in the middle of updating
    const isUpdating = useRef(false);

    // Calculate totals based on current items
    const calculateTotals = (currentItems: ItemForPedido[]) => {
        const subTotal = currentItems.reduce((sum, item) => sum + (item.cant * item.precio), 0);
        const impuestos = subTotal * 0.16; // Assuming 16% tax
        const total = subTotal + impuestos;

        return { subTotal, impuestos, total };
    };

    // Create the form
    const form = useForm({
        defaultValues: {
            proveedorId: 0,
            fechaPrevista: addDays(new Date(), 7), // Default to 7 days from now
            fechaEntrega: addDays(new Date(), 14), // Default to 14 days from now
        },
        onSubmit: ({ value }) => {
            handleFormSubmit(value);
        }
    });

    // Handler for adding an item to the pedido
    const itemToPedido = (item: ItemForPedido) => {
        // Prevent multiple updates
        if (isUpdating.current) return;
        isUpdating.current = true;

        try {
            let exists = false;
            let updatedItems: ItemForPedido[] = [];

            // Check if item already exists and update quantity if so
            updatedItems = items.map((i) => {
                if (i.id === item.id) {
                    exists = true;
                    return {
                        ...i,
                        cant: i.cant + (item.cant || 1),
                    };
                }
                return i;
            });

            // If item doesn't exist, add it
            if (!exists) {
                updatedItems = [...items, item];
            }

            // Update items state
            setItems(updatedItems);

            // Calculate and update totals
            const newTotals = calculateTotals(updatedItems);
            setTotals(newTotals);
        } finally {
            isUpdating.current = false;
        }
    };

    // Handle form submission
    const handleFormSubmit = (formValue: any) => {
        // Create FormData object to handle form submission
        const formData = new FormData();

        // Add proveedor
        formData.append("proveedorId", String(formValue.proveedorId));

        // Add dates in ISO format
        formData.append("fechaPrevista", formValue.fechaPrevista.toISOString());
        formData.append("fechaEntrega", formValue.fechaEntrega.toISOString());

        // Add calculated values
        formData.append("subTotal", String(totals.subTotal));
        formData.append("totalImpuestos", String(totals.impuestos));
        formData.append("total", String(totals.total));

        // Default values for new pedido
        formData.append("creado", new Date().toISOString());
        formData.append("pagado", "false");
        formData.append("entregado", "false");

        // Handle items array - convert to JSON string
        formData.append("items", JSON.stringify(items));

        // Submit the form
        submit(formData, {
            method: "post",
            action: "/app/compras/pedido",
        });
        form.reset()
        setItems([])
        setTotals({ impuestos: 0, subTotal: 0, total: 0 })
    };

    return (
        <Grid asChild gapY="5">
            <Form method="post" action="/app/compras/pedido" onSubmit={() => form.handleSubmit()}>
                <Flex align="end" gapX="5">
                    <form.Field
                        name="proveedorId"
                        children={(field) => (
                            <SelectInput
                                name={field.name}
                                options={aux.proveedores}
                                state={{
                                    value: String(field.state.value),
                                    changer: (value) => {
                                        field.handleChange(Number(value));
                                        setProveedorSelected(value !== "0" && value !== "");
                                    },
                                }}
                                config={{
                                    label: "Proveedor *",
                                    containerStyle: { width: "100%" },
                                    rootSize: "3"
                                }}
                            />
                        )}
                    />
                </Flex>

                <Grid columns="2" gapX="4">
                    <form.Field
                        name="fechaPrevista"
                        children={(field) => (
                            <InputField
                                label="Fecha prevista de entrega *"
                                input={{
                                    name: field.name,
                                    type: "date",
                                    min: format(new Date(), "yyyy-MM-dd"),
                                    value: format(field.state.value, "yyyy-MM-dd"),
                                    onChange: (e) => field.handleChange(new Date(e.target.value)),
                                }}
                            />
                        )}
                    />
                    <form.Field
                        name="fechaEntrega"
                        children={(field) => (
                            <InputField
                                label="Fecha límite de entrega *"
                                input={{
                                    name: field.name,
                                    type: "date",
                                    min: format(form.getFieldValue("fechaPrevista"), "yyyy-MM-dd"),
                                    value: format(field.state.value, "yyyy-MM-dd"),
                                    onChange: (e) => field.handleChange(new Date(e.target.value)),
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid columns="2" gapY="3" justify="end">
                    <Box gridColumnEnd="3" width="fit-content" ml="auto">
                        <AlertDialog
                            trigger={
                                <Button>
                                    <PlusIcon /> Agregar artículo
                                </Button>
                            }
                        >
                            <AddItemToFormWithPrice
                                addItemFn={itemToPedido}
                            />
                        </AlertDialog>
                    </Box>
                    <Box gridColumn="1 / -1">
                        <DataTable
                            data={items}
                            columns={itemPedidoColumns as ColumnDef<any>[]}
                            state={{
                                pageSize: 5,
                                showPagination: true,
                            }}
                        />
                    </Box>
                </Grid>

                <Grid columns="3" gapX="4" mt="4">
                    <Box gridColumn="2 / -1">
                        <Flex direction="column" gap="2">
                            <Flex justify="between">
                                <Text size="2" weight="medium">Subtotal:</Text>
                                <Text size="2">€{totals.subTotal.toFixed(2)}</Text>
                            </Flex>
                            <Flex justify="between">
                                <Text size="2" weight="medium">Impuestos (16%):</Text>
                                <Text size="2">€{totals.impuestos.toFixed(2)}</Text>
                            </Flex>
                            <Flex justify="between">
                                <Text size="3" weight="bold">Total:</Text>
                                <Text size="3" weight="bold">€{totals.total.toFixed(2)}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Grid>

                <input
                    type="hidden"
                    name="itemsJSON"
                    value={JSON.stringify(items)}
                />

                <form.Subscribe
                    children={({ isSubmitting, canSubmit, isValid }) => (
                        <Button
                            ml="auto"
                            size="4"
                            type="submit"
                            disabled={isSubmitting || !canSubmit || !isValid || items.length === 0}
                        >
                            Crear Pedido
                        </Button>
                    )}
                />
            </Form>
        </Grid>
    );
}