import { Box, Button, Flex, Grid, Strong, Text } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { InputField } from "~/components/forms/input";
import type { ItemForPedido } from "~/lib/zod-schemas/compras/pedido";
import AddItemToForm from "./AddItem";

interface AddItemToFormWithPriceProps {
    addItemFn: (item: ItemForPedido) => void;
}

export function AddItemToFormWithPrice({ addItemFn }: AddItemToFormWithPriceProps) {
    const [price, setPrice] = useState<number>(0);
    const [selectedItem, setSelectedItem] = useState<ItemForPedido | null>(null);
    const [step, setStep] = useState<"select" | "price">("select");

    // When an item is selected, move to the price step
    useEffect(() => {
        if (selectedItem) {
            setStep("price");
        }
    }, [selectedItem]);

    // Reset the component state
    const resetState = () => {
        setSelectedItem(null);
        setPrice(0);
        setStep("select");
    };

    // Handle adding the item with price to the order
    const handleAddItemWithPrice = () => {
        if (selectedItem && price > 0) {
            addItemFn({
                ...selectedItem,
                precio: price
            });
            resetState();
        }
    };

    return (
        <Box>
            {step === "select" && (
                //@ts-ignore
                <AddItemToForm addItemFn={(item) => setSelectedItem(item)} />
            )}

            {step === "price" && selectedItem && (
                <Grid p="4" gapY="4">
                    <Box>
                        <Text size="4" weight="medium">Artículo seleccionado: <Strong>{selectedItem.descripcion}</Strong>
                        </Text>
                        <Flex gap="2" mt="1">
                            <Text size="3">Cantidad: {selectedItem.cant}</Text>
                            <Text size="3">Unidad: {selectedItem.unidadMedida}</Text>
                        </Flex>
                    </Box>

                    <InputField
                        label={{
                            main: "Precio unitario *",
                            suffix: "€"
                        }}
                        input={{
                            type: "number",
                            min: "0",
                            step: "0.01",
                            value: price,
                            onChange: (e) => setPrice(Number(e.target.value)),
                            autoFocus: true,
                        }}
                        description="Ingrese el precio por unidad (sin impuestos)"
                    />

                    <Flex justify="between" mt="2">
                        <Button
                            variant="soft"
                            color="gray"
                            onClick={() => setStep("select")}
                        >
                            Volver
                        </Button>

                        <Button
                            onClick={handleAddItemWithPrice}
                            disabled={price <= 0}
                        >
                            Agregar al pedido
                        </Button>
                    </Flex>
                </Grid>
            )}
        </Box>
    );
}
