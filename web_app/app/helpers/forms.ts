import { z } from "zod"

export const REQUIRED_MSG = "Este campo es requerido."
export const INVALID_MSG = "El valor ingresado es inválido."
export const MIN_LENGTH_MSG = (number: number) => `El valor debe tener como mínimo ${number} caracteres.`
export const MAX_LENGTH_MSG = (number: number) => `El valor debe tener como máximo ${number} caracteres.`

export const STRING_FIELD = z.string({
    required_error: REQUIRED_MSG,
    invalid_type_error: INVALID_MSG
})
    .min(1, REQUIRED_MSG)