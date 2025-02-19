import { PrismaClient } from "@prisma/client";
import { Button, Grid, TextField } from "@radix-ui/themes";
import { formOptions, useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { CheckboxField, InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import { INVALID_MSG, MAX_LENGTH_MSG, STRING_FIELD } from "~/helpers/forms";
import type { SelectInputOptionsType } from "~/types/components";

const prisma = new PrismaClient()

// inicio: addItem
export const addItemSchema = z.object({
    descripcion: STRING_FIELD,
    activo: z.boolean().optional().default(true),
    ubicacionId: STRING_FIELD,
    unidadMedidaId: STRING_FIELD
})
export type addItemSchemaType = z.infer<typeof addItemSchema>
const addItemOptions = formOptions({
    defaultValues: {
        descripcion: "",
        activo: true,

    } as addItemSchemaType,
    validators: {
        onChange: addItemSchema
    }
})
interface AddItemFormProps { errors: any, ubicaciones: SelectInputOptionsType[], unidades: SelectInputOptionsType[] }
export function AddItemForm({ errors, ubicaciones, unidades }: AddItemFormProps) {
    const form = useForm(addItemOptions)

    return <Grid asChild gapY="4">
        <Form method="post" action="/app/items" onSubmit={() => form.handleSubmit()}>
            <Grid gapX="3" columns="2" className="!w-full">
                <form.Field
                    name="descripcion"
                    validators={{ onChange: addItemSchema.shape.descripcion }}
                    children={(field) => (
                        <InputField
                            label="Descripción  *"
                            input={{
                                type: "text",
                                name: field.name,
                                id: field.name,
                                value: field.state.value,
                                onChange: (e) => field.handleChange(e.target.value),
                                onBlur: field.handleBlur,
                            }}
                            errors={errors}
                        />
                    )} />
                <form.Field
                    name="unidadMedidaId"
                    children={(field) => (
                        <SelectInput
                            name={field.name}
                            options={unidades}
                            state={{
                                value: field.state.value,
                                changer: field.handleChange
                            }}
                            config={{
                                label: "Unidad de medida *"
                            }}
                            errors={errors}
                        />
                    )}
                />
            </Grid>
            <form.Field
                name="ubicacionId"
                children={(field) => {
                    console.debug(`[${field.name}]:`, field.state.value)
                    return (
                        <SelectInput
                            name={field.name}
                            options={ubicaciones}
                            state={{
                                value: field.state.value,
                                changer: field.handleChange
                            }}
                            config={{
                                label: "Ubicación *"
                            }}
                            errors={errors}
                        />
                    )
                }}
            />
            <form.Field
                name="activo"
                children={({ name, state, handleChange, handleBlur }) => (
                    <CheckboxField
                        label="¿Articulo activo?"
                        input={{
                            name,
                            checked: state.value,
                            value: String(state.value),
                            onClick: () => handleChange(!state.value),
                            onBlur: handleBlur
                        }}
                        errors={errors}
                    />
                )}
            />
            <form.Subscribe
                children={() => (<Button type="submit" className="!w-fit !ms-auto" size="3">Enviar</Button>)}
            />
        </Form>
    </Grid>
}
// fin

// inicio: addUbicacion
export const addUbicacionSchema = z.object({
    descripcion: STRING_FIELD,
    corto: z.string({ invalid_type_error: INVALID_MSG }).max(10, MAX_LENGTH_MSG(10)).optional(),
    isAlmacen: z.boolean().default(false),
    ubicacionId: z.string().nullish().default(null)
})
export type addUbicacionSchemaType = z.infer<typeof addUbicacionSchema>
const addUbicacionOptions = formOptions({
    defaultValues: {
        descripcion: "",
        corto: "",
        isAlmacen: true,
    } as addUbicacionSchemaType,
    validators: { onChange: addUbicacionSchema, onSubmit: addUbicacionSchema }
}
)
interface AddUbicacionFormProps { ubicaciones: SelectInputOptionsType[], errors: Record<string, unknown> }
export function AddUbicacionForm({ ubicaciones, errors }: AddUbicacionFormProps) {
    const [visible, setVisible] = useState(false)
    const form = useForm(addUbicacionOptions)
    return <Grid asChild gapY="3">
        <Form action="/app/ubicacion" method="post" onSubmit={() => form.handleSubmit()}>
            <form.Field
                name="descripcion"
                children={({ name, state, handleBlur, handleChange }) => (
                    <InputField
                        label="Descripción *"
                        input={{
                            type: "text",
                            name,
                            value: state.value,
                            onChange: (e) => handleChange(e.target.value),
                            onBlur: handleBlur
                        }}
                        errors={errors}
                    />
                )} />
            <form.Field
                name="corto"
                children={({ name, state, handleBlur, handleChange }) => (
                    <InputField
                        label="Abreviatura"
                        input={{
                            name,
                            type: "text",
                            value: state.value,
                            onChange: (e) => handleChange(e.target.value),
                            onBlur: handleBlur
                        }}
                        errors={errors}
                    />
                )} />
            <form.Field
                name="isAlmacen"
                children={({ name, state, handleBlur, handleChange }) => (
                    <CheckboxField
                        label="¿Es un almacén?"
                        input={{
                            name,
                            value: String(state.value),
                            checked: state.value,
                            onClick: () => {
                                setVisible(!visible)
                                handleChange(!state.value)
                            },
                            onBlur: handleBlur
                        }}
                    />
                )} />
            {visible && (
                <form.Field
                    name="ubicacionId"
                    children={(field) => (
                        <SelectInput
                            name={field.name}
                            options={ubicaciones}
                            state={{
                                value: field.state.value ?? undefined,
                                changer: field.handleChange
                            }}
                            config={{
                                label: "Ubicación *"
                            }}
                            errors={errors}
                        />
                    )}
                />
            )}
            <form.Subscribe
                children={() => (
                    <Button>Enviar</Button>
                )} />
        </Form>
    </Grid>
}
// fin

//inicio: addUnidadMedida
export const addUnidadMedidaSchema = z.object({
    descripcion: STRING_FIELD,
    corto: STRING_FIELD.max(5, MAX_LENGTH_MSG(5)).refine(async (value) => {
        return await prisma.unidadMedida.findFirst({
            where: {
                corto: value
            }
        }).then(async (db) => db?.corto !== value)
    }, {
        message: "Este valor ya existe."
    })
})
export type addUnidadMedidaType = z.infer<typeof addUnidadMedidaSchema>
const addUnidadMedidaOptions = formOptions({
    defaultValues: {
        descripcion: "",
        corto: ""
    } as addUnidadMedidaType,
    validators: { onChange: addUnidadMedidaSchema, onSubmit: addUnidadMedidaSchema }
})
export function AddUnidadMedidaForm({ errors, submitCallback }: { errors: Record<string, unknown>, submitCallback?: Function }) {
    const form = useForm({
        ...addUnidadMedidaOptions,
        onSubmit: () => {
            form.reset()
            if (submitCallback) submitCallback()
        }
    })

    return <Form className="grid gap-y-4" action="/app/unidad-medida" method="post">
        <form.Field
            name="descripcion"
            validators={{ onChange: addUnidadMedidaSchema.shape.descripcion }}
            children={(field) => (
                <InputField
                    label="Descripción *"
                    input={{
                        type: "text",
                        id: field.name,
                        name: field.name,
                        value: field.state.value,
                        onChange: (e) => field.handleChange(e.target.value)
                    }}
                    errors={errors}
                />
            )}
        />
        <form.Field
            name="corto"
            validators={{ onChange: addUnidadMedidaSchema.shape.corto }}
            children={(field) => (
                <InputField
                    label="Abreviatura *"
                    input={{
                        type: "text",
                        id: field.name,
                        name: field.name,
                        value: field.state.value,
                        onChange: (e) => field.handleChange(e.target.value)
                    }}
                    errors={errors}
                />
            )}
        />
        <form.Subscribe
            children={() => (
                <Button>Enviar</Button>
            )} />
    </Form>
}