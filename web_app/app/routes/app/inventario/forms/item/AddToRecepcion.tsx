import type { Item, UnidadMedida } from "@prisma/client";
import { DotsHorizontalIcon, MinusIcon, Pencil2Icon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Em, Flex, Grid, IconButton, Separator, Table, Text, TextField } from "@radix-ui/themes";
import { DropdownMenu } from "@radix-ui/themes";
import { useState, type ChangeEvent } from "react";
import { useFetcher } from "react-router";
import { InputField } from "~/components/forms/input";
import AlertDialog from "~/components/ui/alert-dialog";
import type { ItemForRecepcion } from "~/lib/zod-schemas/inventarios/stock";
import { CreateItemForm } from "./Create";
import { UpdateItemForm } from "./Update";
import type { UpdateItem } from "~/lib/zod-schemas/inventarios/item";

export type ItemRecepcion = Item & {
    id: string;
    descripcion: string;
    cant: number;
    unidadMedida: UnidadMedida;
};
interface AddItemToRecepcionFormProps {
    addItemFn(item: ItemForRecepcion): void;
}
type FetcherDataType = {
    items: Array<Item & { unidadMedida: UnidadMedida }>;
};
export function AddItemToRecepcionForm({ addItemFn }: AddItemToRecepcionFormProps) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [query, setQuery] = useState("");
    const [qty, setQty] = useState(0);
    const { Form, submit, data } = useFetcher<FetcherDataType>();

    function handleAddItem() {
        const item = data?.items.filter((i) => i.id === Number(query))[0];
        if (item) {
            addItemFn({
                id: item.id,
                descripcion: item.descripcion,
                unidadMedida: item.unidadMedida.corto,
                cant: qty,
            });
            setQuery("");
            setQty(0);
        }
    }

    function handleSubmit(form: HTMLFormElement | null) {
        submit(form);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
        handleSubmit(e.currentTarget.form);
    }

    return (
        <Grid p="4">
            <Form action="/app/inventario/consulta" method="get">
                <input name="relations" value="unidadMedida" hidden />
                <input name="key" value="id" hidden />
                <InputField
                    label="Ingresa el código del artículo *"
                    input={{
                        name: "id",
                        type: "number",
                        value: query,
                        onChange: handleChange,
                    }}
                />
            </Form>

            {query !== "" && (
                <>
                    <Separator my="3" size="4" />

                    {data && data.items && data.items.length > 0 ? (
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
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
                                        <Table.Cell>{item.descripcion}</Table.Cell>
                                        <Table.Cell>
                                            <Flex align="center" gap="1">
                                                <IconButton
                                                    size="1"
                                                    variant="soft"
                                                    color="gray"
                                                    onClick={() => qty > 0 && setQty(qty - 1)}
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
                                                        variant="soft"
                                                        side="right"
                                                        sideOffset={5}
                                                    >
                                                        <DropdownMenu.Item
                                                            onSelect={(event) => {
                                                                event.preventDefault();
                                                                setSelectedItem(item);
                                                                setOpen(true);
                                                            }}
                                                        >
                                                            <Pencil2Icon /> Editar artículo
                                                        </DropdownMenu.Item>
                                                        <DropdownMenu.Item
                                                            onClick={handleAddItem}
                                                            disabled={qty <= 0}
                                                        >
                                                            <PlusCircledIcon /> Agregar al RItemForRecepcion
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
                                No existe ningún artículo con el código ingresado,{" "}
                                <Em>¿deseas crearlo?</Em>
                            </Text>
                            <AlertDialog
                                header={{
                                    title: "Creación de artículo",
                                    description:
                                        "Ingresa los datos del artículo para registrarlo en la base de datos.",
                                }}
                                trigger={
                                    <Button>
                                        <PlusCircledIcon /> Crear
                                    </Button>
                                }
                            >
                                <CreateItemForm
                                    id={Number(query)}
                                    redirectRoute="/app/inventario/recepcion"
                                />
                            </AlertDialog>
                        </Flex>
                    )}
                </>
            )}
            {selectedItem && (
                <UpdateItemForm
                    state={{ open, setOpen }}
                    data={selectedItem as UpdateItem}
                />
            )}
        </Grid>
    );
}