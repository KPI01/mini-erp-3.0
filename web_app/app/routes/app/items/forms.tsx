import { PrismaClient } from "@prisma/client";
import { Button, Grid } from "@radix-ui/themes";
import { formOptions, useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import { MAX_LENGTH_MSG, STRING_FIELD } from "~/helpers/forms";
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
    const form = useForm({
        ...addItemOptions,
        onSubmit: ({ value }) => {
            console.debug("enviando formulario...", value)
        }
    })
    console.debug("state:", form.state.values)
    console.debug("errors", form.state.errorMap)

    return <Grid asChild gapY="4">
        <Form onSubmit={() => form.handleSubmit()}>
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
                        />
                    )} />
                <form.Field
                    name="unidadMedidaId"
                    children={(field) => (
                        <Grid gapY="1">
                            <SelectInput
                                name={field.name}
                                options={unidades}
                                state={{
                                    value: field.state.value ?? "",
                                    changer: field.handleChange
                                }}
                                config={{
                                    label: "Unidad de medida *"
                                }}
                            />
                        </Grid>
                    )}
                />
            </Grid>
            <form.Field
                name="ubicacionId"
                children={(field) => (
                    <Grid gapY="1">
                        <SelectInput
                            name={field.name}
                            options={ubicaciones}
                            state={{
                                value: field.state.value ?? "",
                                changer: field.handleChange
                            }}
                            config={{
                                label: "Ubicación *"
                            }}
                        />
                    </Grid>
                )}
            />
            <form.Field
                name="activo"
                children={(field) => (
                    <InputField
                        label="¿Articulo activo?"
                        input={{
                            ...field,
                            type: "checkbox",
                            value: field.state.value,
                            onClick: () => field.handleChange(!field.state.value)
                        }}
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
const addUbicacionSchema = z.object({
    descripcion: STRING_FIELD,
    corto: STRING_FIELD.max(5, MAX_LENGTH_MSG(5)),
    isAlmacen: z.boolean().default(false),
    ubicacionId: STRING_FIELD.optional()
}).superRefine((values, ctx) => {
    if (!values.isAlmacen && !values.ubicacionId) ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debes seleccionar una ubicación.",
        params: ["ubicacionId"]
    })
})
export type addUbicacionSchemaType = z.infer<typeof addUbicacionSchema>
const addUbicacionOptions = formOptions({
    defaultValues: {
        descripcion: "",
        corto: "",
        isAlmacen: true,
        ubicacionId: ""
    } as addUbicacionSchemaType,
    validators: {
        onChange: addUbicacionSchema
    }
}
)
interface AddUbicacionFormProps { ubicaciones: SelectInputOptionsType[] }
export function AddUbicacionForm({ ubicaciones }: AddUbicacionFormProps) {
    const [visible, setVisible] = useState(false)
    const form = useForm(addUbicacionOptions)
    return <Grid asChild gapY="3">
        <Form action="/app/items/ubicacion" method="post" onSubmit={() => form.handleSubmit()}>
            <form.Field
                name="descripcion"
                children={(field) => (
                    <InputField
                        label="Descripción"
                        input={{
                            ...field,
                            type: "text",
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value)
                        }}
                    />
                )} />
            <form.Field
                name="corto"
                children={(field) => (
                    <InputField
                        label="Abreviatura"
                        input={{
                            ...field,
                            type: "text",
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value)
                        }}
                    />
                )} />
            <form.Field
                name="isAlmacen"
                children={(field) => (
                    <InputField
                        label="¿Es un almacén?"
                        input={{
                            ...field,
                            type: "checkbox",
                            value: field.state.value,
                            onClick: () => {
                                setVisible(!visible)
                                field.handleChange(!field.state.value)
                            }
                        }}
                    />
                )} />
            {visible && (
                <form.Field
                    name="ubicacionId"
                    children={(field) => (
                        <Grid gapY="1">
                            <SelectInput
                                name={field.name}
                                options={ubicaciones}
                                state={{
                                    value: field.state.value ?? "",
                                    changer: field.handleChange
                                }}
                                config={{
                                    label: "Ubicación *"
                                }}
                            />
                        </Grid>
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

    return <Form className="grid gap-y-4" action="/app/unidadMedida" method="post">
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
                    errors={{ field: field.name, bag: errors }}
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
                    errors={{ field: field.name, bag: errors }}
                />
            )}
        />
        <form.Subscribe
            children={() => (
                <Button>Enviar</Button>
            )} />
    </Form>
}