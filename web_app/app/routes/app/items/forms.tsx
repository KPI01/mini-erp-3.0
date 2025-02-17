import type { Ubicacion } from "@prisma/client";
import { Button, Grid } from "@radix-ui/themes";
import { formOptions, useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { displayErrors, InputField } from "~/components/forms/input";
import SelectInput from "~/components/forms/select";
import { MAX_LENGTH_MSG, STRING_FIELD } from "~/helpers/forms";
import { cleanErrors } from "~/helpers/utils";
import type { SelectInputOptionsType } from "~/types/components";

// inicio: addItem
export const addItemSchema = z.object({
    descripcion: STRING_FIELD,
    activo: z.boolean().optional().default(true),
    ubicacionId: STRING_FIELD
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
interface AddItemFormProps { errors: any, ubicaciones: SelectInputOptionsType[] }
export function AddItemForm({ errors, ubicaciones }: AddItemFormProps) {
    const form = useForm({
        ...addItemOptions,
        onSubmit: ({ value }) => {
            console.debug("enviando formulario...", value)
        }
    })
    console.debug("state:", form.state.values)
    console.debug("errors", form.state.errorMap)

    return <Form className="grid gap-y-4" onSubmit={() => form.handleSubmit()}>
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
                        onBlur: field.handleBlur
                    }}
                />
            )} />
        <form.Field
            name="ubicacionId"
            validators={{ onBlur: addItemSchema.shape.ubicacionId }}
            children={(field) => (
                <SelectInput
                    name={field.name}
                    options={ubicaciones}
                    state={{
                        value: field.state.value,
                        changer: field.handleChange
                    }}
                    config={{
                        label: "Almacén donde se encuentra *"
                    }} />
            )} />
        <form.Subscribe
            children={() => (<Button type="submit" className="!w-fit !ms-auto" size="3">Enviar</Button>)}
        />
    </Form>
}
// fin

// inicio: addUbicacion
const addUbicacionSchema = z.object({
    descripcion: STRING_FIELD,
    corto: STRING_FIELD.max(5, MAX_LENGTH_MSG(5)),
    isAlmacen: z.boolean().default(false),
    ubicacionId: STRING_FIELD.optional()
})
type addUbicacionSchemaType = z.infer<typeof addUbicacionSchema>
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
                        label="Corto"
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
        </Form>
    </Grid>
}
// fin

//inicio: addUnidadMedida
const addUnidadMedidaSchema = z.object({
    descripcion: STRING_FIELD,
    corto: STRING_FIELD.max(5, MAX_LENGTH_MSG(5))
})
type addUnidadMedidaType = z.infer<typeof addUnidadMedidaSchema>
const addUnidadMedidaOptions = formOptions({
    defaultValues: {
        descripcion: "",
        corto: ""
    } as addUnidadMedidaType,
    validators: { onChange: addUnidadMedidaSchema }
})
export function AddUnidadMedidaForm() {
    const form = useForm(addUnidadMedidaOptions)

    return <Form className="grid gap-y-4">
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
                />
            )}
        />
        <form.Subscribe
            children={() => (
                <Button>Enviar</Button>
            )} />
    </Form>
}