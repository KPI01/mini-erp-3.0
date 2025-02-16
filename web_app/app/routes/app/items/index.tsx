import type { Route } from "../+types";
import DataTable from "~/components/table/data-table";
import { itemColumn, type Item } from "./tables";
import { PrismaClient } from "@prisma/client";
import { type MetaFunction, data, Form } from "react-router";
import { Header } from "../components";
import type { Routes } from "~/types/session";
import { validateAuthSession } from "~/server/session.server";
import { Box, Button, Checkbox, Flex, Grid, Text } from "@radix-ui/themes";
import type { SelectInputOptionsType } from "~/types/components";
import SelectInput from "~/components/forms/select";
import { useForm } from '@tanstack/react-form'
import { addItemSchema, addItemOptions } from "./forms";
import { Label } from "radix-ui";
import { addItem } from "~/server/actions/items.server";
import { validateSessionErrors } from "~/server/form-validation.server";
import { useState } from "react";
import { displayErrors, InputField } from "~/components/forms/input";
import { cleanErrors } from "~/helpers/utils";


const route: Routes = "inventory.items"

export const meta: MetaFunction = () => {
    return [{ title: "Items", description: "Visualización de los items registrados." }];
};

export async function loader({ request }: Route.LoaderArgs) {
    const session = await validateAuthSession({ request })

    const prisma = new PrismaClient()
    const aux = {
        items: await prisma.item.findMany({ include: { ubicacion: true, stock: true } }),
        ubicaciones: await prisma.ubicacion.findMany({})
    }

    const sessionData = await validateSessionErrors({ session, key: "zodErrors", extraData: aux })
    if (sessionData) {
        return data(...sessionData)
    }

    return data(aux)
}

export async function action({ request }: Route.ActionArgs) {
    return await addItem(request)
}

export default function Index({ loaderData }: Route.ComponentProps) {
    console.debug("loaderData:", loaderData)
    //@ts-ignore
    const errors = loaderData?.zodErrors
    console.error(errors)
    const [dialogOpen, setDialogOpen] = useState(false)

    //@ts-ignore
    const opts = loaderData?.ubicaciones.map((ub) => {
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
                                <InputField
                                    label="Descripción"
                                    input={{ ...field, type: "text" }}
                                    errors={{ field: field.name, bag: errors }}
                                />
                            )}
                        />
                        <form.Field
                            name="ubicacionId"
                            validators={{ onChange: addItemSchema.shape.ubicacionId }}
                            children={(field) => (
                                <Grid gapY="1">
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
                                    {displayErrors(cleanErrors(field.name, errors))}
                                </Grid>
                            )}
                        />
                        <form.Field
                            name="activo"
                            validators={{ onChange: addItemSchema.shape.activo }}
                            children={(field) => (
                                <InputField
                                    label="¿Articulo activo?"
                                    input={{
                                        ...field,
                                        type: "checkbox",
                                        onClick: field.handleChange
                                    }}
                                    errors={{ field: field.name, bag: errors }}
                                />
                            )}
                        />
                        <form.Field
                            name="precio"
                            validators={{ onBlur: addItemSchema.shape.precio }}
                            children={(field) => (
                                <InputField
                                    label={{ main: "Precio", suffix: "€" }}
                                    input={{ ...field, type: "number" }}
                                    errors={{ field: field.name, bag: errors }}
                                />
                            )}
                        />
                        <Flex gapX="6">
                            <form.Field
                                name="stockMin"
                                validators={{ onBlur: addItemSchema.shape.stockMin }}
                                children={(field) => (
                                    <InputField
                                        label="Stock Mínimo"
                                        input={{ ...field, type: "number" }}
                                        errors={{ field: field.name, bag: errors }}
                                    />
                                )}
                            />
                            <form.Field
                                name="stockMax"
                                validators={{ onBlur: addItemSchema.shape.stockMax }}
                                children={(field) => (
                                    <InputField
                                        label="Stock Máximo"
                                        input={{ ...field, type: "number" }}
                                        errors={{ field: field.name, bag: errors }}
                                    />
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