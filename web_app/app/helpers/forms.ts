import { z } from "zod"

const REQUIRED_MSG = "Este campo es requerido."
const INVALID_MSG = "El valor ingresado es inválido."
const MIN_LENGTH_MSG = (number: number) => `El valor debe tener como mínimo ${number} caracteres.`
const MAX_LENGTH_MSG = (number: number) => `El valor debe tener como máximo ${number} caracteres.`

const STRING_FIELD = z.string({
    required_error: REQUIRED_MSG,
    invalid_type_error: INVALID_MSG
})
    .min(1, REQUIRED_MSG)

export { REQUIRED_MSG, INVALID_MSG, MIN_LENGTH_MSG, MAX_LENGTH_MSG, STRING_FIELD }