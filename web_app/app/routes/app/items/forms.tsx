import { formOptions } from "@tanstack/react-form";
import { z } from "zod";
import { MIN_LENGTH_MSG, STRING_FIELD } from "~/helpers/forms";

export const addItemSchema = z.object({
    descripcion: STRING_FIELD.min(3, MIN_LENGTH_MSG(3)),
    activo: z.boolean().optional().default(true),
    stockMin: z.number().optional(),
    stockMax: z.number().optional(),
    precio: z.number().optional(),
    ubicacionId: STRING_FIELD
})
export type addItemSchemaType = z.infer<typeof addItemSchema>
export const addItemOptions = formOptions({
    defaultValues: {
        descripcion: "",
        activo: true,
        precio: 0,
        stockMax: 0,
        stockMin: 0
    } as addItemSchemaType,
    validators: {
        onChange: addItemSchema
    }
})