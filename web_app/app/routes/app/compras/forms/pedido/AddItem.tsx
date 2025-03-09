import { PlusCircledIcon, DotsHorizontalIcon, Pencil2Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex, Grid, IconButton, Text, TextField } from "@radix-ui/themes";
import { useState, type ChangeEvent } from "react";
import { useFetcher } from "react-router";
import AlertDialog from "~/components/ui/alert-dialog";
import { InputField } from "~/components/forms/input";
import { Table } from "@radix-ui/themes";
import type { Item, UnidadMedida } from "@prisma/client";
import type { ItemForPedidoBase } from "~/lib/zod-schemas/compras/pedido";

interface AddItemToFormProps {
    addItemFn: (item: ItemForPedidoBase) => void;
}

export function AddItemToForm({ addItemFn }: AddItemToFormProps) {
    const [query, setQuery] = useState("");
    const [qty, setQty] = useState(1);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { Form, submit, data, load } = useFetcher<{
        items: Array<Item & { unidadMedida: UnidadMedida }>;
    }>();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
        handleSubmit(e.currentTarget.form);
    }

    function handleSubmit(form: HTMLFormElement | null) {
        submit(form);
    }

    function handleAddItem(item: Item & { unidadMedida: UnidadMedida }) {
        if (qty <= 0) return;

        addItemFn({
            id: item.id,
            descripcion: item.descripcion,
            unidadMedida: item.unidadMedida.corto,
            cant: qty
        });

        // Reset form state
        setQuery("");
        setQty(1);
    }

    return (
        <Grid p="4" gapY="4">
            <Form action="/app/inventario/consulta" method="get">
                <input name="relations" value="unidadMedida" hidden />
                <input name="key" value="id" hidden />
                <InputField
                    label="Ingresa el código o descripción del artículo *"
                    input={{
                        name: "id",
                        type: "text",
                        value: query,
                        onChange: handleChange,
                        placeholder: "Ingrese código o parte de la descripción",
                    }}
                />
            </Form>

            {query !== "" && (
                <>
                    {data && data.items && data.items.length > 0 ? (
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Código</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Descripción</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Cantidad</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Unidad</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell align="right">
                                        Opciones
                                    </Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {data.items.map((item) => (
                                    <Table.Row key={item.id}>
                                        <Table.Cell>{item.id}</Table.Cell>
                                        <Table.Cell>{item.descripcion}</Table.Cell>
                                        <Table.Cell>
                                            <Flex align="center" gap="1">
                                                <IconButton
                                                    size="1"
                                                    variant="soft"
                                                    color="gray"
                                                    onClick={() => qty > 1 && setQty(qty - 1)}
                                                >
                                                    <MinusIcon />
                                                </IconButton>

                                                <TextField.Root
                                                    size="1"
                                                    variant="surface"
                                                    style={{ width: "4rem", textAlign: "center" }}
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}
                                                />

                                                <IconButton
                                                    size="1"
                                                    variant="soft"
                                                    color="gray"
                                                    onClick={() => setQty(qty + 1)}
                                                >
                                                    <PlusIcon />
                                                </IconButton>
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell>{item.unidadMedida.corto}</Table.Cell>
                                        <Table.Cell align="right">
                                            <Flex gap="2" justify="end">
                                                <DropdownMenu.Root>
                                                    <DropdownMenu.Trigger>
                                                        <IconButton variant="ghost" size="1">
                                                            <DotsHorizontalIcon />
                                                        </IconButton>
                                                    </DropdownMenu.Trigger>
                                                    <DropdownMenu.Content
                                                        side="right"
                                                        sideOffset={5}
                                                        variant="soft"
                                                    >
                                                        <DropdownMenu.Item
                                                            onSelect={() => {
                                                                setSelectedItem(item);
                                                                setDialogOpen(true);
                                                            }}
                                                        >
                                                            <Pencil2Icon /> Ver detalles
                                                        </DropdownMenu.Item>
                                                        <DropdownMenu.Item
                                                            onClick={() => handleAddItem(item)}
                                                            disabled={qty <= 0}
                                                        >
                                                            <PlusCircledIcon /> Seleccionar
                                                        </DropdownMenu.Item>
                                                    </DropdownMenu.Content>
                                                </DropdownMenu.Root>
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    ) : (
                        <Flex py="4" gapX="4" width="100%" justify="between" align="center">
                            <Text wrap="pretty" size="3">
                                No existe ningún artículo con el código o descripción ingresada.
                            </Text>
                        </Flex>
                    )}
                </>
            )}

            {selectedItem && (
                <AlertDialog
                    trigger={<>Detalles</>}
                >
                    <Grid gapY="2">
                        <Text size="2" weight="bold">Código:</Text>
                        <Text>{selectedItem.id}</Text>

                        <Text size="2" weight="bold">Descripción:</Text>
                        <Text>{selectedItem.descripcion}</Text>

                        {selectedItem.stockMin !== null && (
                            <>
                                <Text size="2" weight="bold">Stock mínimo:</Text>
                                <Text>{selectedItem.stockMin}</Text>
                            </>
                        )}

                        {selectedItem.stockMax !== null && (
                            <>
                                <Text size="2" weight="bold">Stock máximo:</Text>
                                <Text>{selectedItem.stockMax}</Text>
                            </>
                        )}

                        <Flex justify="end" mt="4">
                            <Button onClick={() => setDialogOpen(false)}>
                                Cerrar
                            </Button>
                        </Flex>
                    </Grid>
                </AlertDialog>
            )}
        </Grid>
    );
}

export default AddItemToForm;