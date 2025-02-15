import type { Route } from "../+types";
import DataTable from "~/components/table/data-table";
import { itemColumn, type Item } from "./tables";
import { PrismaClient, type Ubicacion } from "@prisma/client";
import { type MetaFunction, data, Form, useFetcher } from "react-router";
import { Header } from "../components";
import type { Routes } from "~/types/session";
import { validateAuthSession } from "~/server/session.server";
import { Box, Button, Checkbox, Flex, Grid, Text } from "@radix-ui/themes";
import type { SelectInputOptionsType } from "~/types/components";
import SelectInput from "~/components/forms/select";
import { useForm } from '@tanstack/react-form'
import { addItemSchema, addItemOptions, type addItemSchemaType } from "./forms";
import { Label } from "radix-ui";
import { addItem } from "~/server/actions/items.server";
import { validateSessionErrors } from "~/server/form-validation.server";
import { useState } from "react";


const route: Routes = "inventory.items"

export const meta: MetaFunction = () => {
    return [{ title: "Items", description: "Visualización de los items registrados." }];
};

export async function loader({ request }: Route.LoaderArgs) {
    const session = await validateAuthSession({ request })

    const prisma = new PrismaClient()
    const data = {
        items: await prisma.item.findMany({ include: { ubicacion: true, stock: true } }),
        ubicaciones: await prisma.ubicacion.findMany({})
    }

    return { ...data }
}

export async function action({ request }: Route.ActionArgs) {
    const session = await validateAuthSession({ request })

    if (request.method.toLocaleLowerCase() === "post") {
        console.debug("enviando datos para creación...")

        const form = await request.formData()
        const formData: addItemSchemaType = {
            descripcion: String(form.get("descripcion")),
            activo: Boolean(form.get("activo")),
            ubicacionId: String(form.get("ubicacionId")),
            stockMin: Number(form.get("stockMin")),
            stockMax: Number(form.get("stockMax")),
            precio: Number(form.get("precio"))
        }

        const result = await addItem(session, formData)

        const errors = await validateSessionErrors({ session })
        if (errors !== undefined) return data(...errors)
        return data(result)
    }
}

export default function Index({ loaderData }: Route.ComponentProps) {
    const [dialogOpen, setDialogOpen] = useState(false)

    //@ts-ignore
    const opts = loaderData.ubicaciones.map((ub) => {
        return { [String(ub.id)]: ub.descripcion } satisfies SelectInputOptionsType
    })

    const form = useForm({
        ...addItemOptions, onSubmit: () => {
            setDialogOpen(false)
            form.reset()
        }
    })


    return (
        <Box>
            <Header>Consulta de Artículo</Header>
            {/* @ts-ignore */}
            <DataTable data={loaderData?.items} columns={itemColumn} config={{
                dialog: {
                    title: "Nuevo articulo",
                    description: "Formulario para registrar en el sistema un nuevo articulo. Los campos con (*) son obligatorios",
                    state: { open: dialogOpen, changer: setDialogOpen },
                    form: <Form method="post" action="/app/items" className="grid gap-y-4" onSubmit={() => form.handleSubmit()}>
                        <form.Field
                            name="descripcion"
                            validators={{ onBlur: addItemSchema.shape.descripcion }}
                            children={(field) => (
                                <Grid>
                                    <Label.Root htmlFor={field.name}>Descripción *</Label.Root>
                                    <input
                                        type="text"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </Grid>
                            )}
                        />
                        <form.Field
                            name="ubicacionId"
                            validators={{ onChange: addItemSchema.shape.ubicacionId }}
                            children={(field) => (
                                <SelectInput
                                    name={field.name}
                                    options={opts}
                                    state={{
                                        value: field.state.value,
                                        changer: field.handleChange
                                    }}
                                    config={{
                                        label: "Ubicación *"
                                    }}
                                />
                            )}
                        />
                        <form.Field
                            name="activo"
                            validators={{ onChange: addItemSchema.shape.activo }}
                            children={(field) => (
                                <Flex gapX="2" align="center">
                                    <Checkbox
                                        id={field.name}
                                        name={field.name}
                                        defaultChecked={field.state.value}
                                        value={String(field.state.value)}
                                        onClick={() => field.handleChange(!field.state.value)}
                                    />
                                    <Label.Root htmlFor={field.name}>¿Articulo activo?</Label.Root>
                                </Flex>
                            )}
                        />
                        <form.Field
                            name="precio"
                            validators={{ onBlur: addItemSchema.shape.precio }}
                            children={(field) => (
                                <Grid gapY="0">
                                    <Label.Root htmlFor={field.name}>Precio</Label.Root>
                                    <Flex align="center" gapX="2">
                                        <input
                                            type="number"
                                            min={0}
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                        <Text>€</Text>
                                    </Flex>
                                </Grid>
                            )}
                        />
                        <Flex gapX="6">
                            <form.Field
                                name="stockMin"
                                validators={{ onBlur: addItemSchema.shape.stockMin }}
                                children={(field) => (
                                    <Grid gapY="0">
                                        <Label.Root htmlFor={field.name}>Stock Mínimo</Label.Root>
                                        <input
                                            type="number"
                                            min={0}
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                    </Grid>
                                )}
                            />
                            <form.Field
                                name="stockMax"
                                validators={{ onBlur: addItemSchema.shape.stockMax }}
                                children={(field) => (
                                    <Grid gapY="0">
                                        <Label.Root htmlFor={field.name}>Stock Máximo</Label.Root>
                                        <input
                                            type="number"
                                            min={0}
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                    </Grid>
                                )}
                            />
                        </Flex>
                        <form.Subscribe
                            children={() => (<Button type="submit">Enviar</Button>)}
                        />
                    </Form>
                }
            }} />
        </Box>
    )
}