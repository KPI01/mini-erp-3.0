import { z } from 'zod'
import { MAX_LENGTH_MSG, MIN_LENGTH_MSG, PASSWORD_REGEX, STRING_FIELD } from '~/helpers/forms'

const usernameField = STRING_FIELD
    .min(3, MIN_LENGTH_MSG(3))
    .max(20, MAX_LENGTH_MSG(20))
const passwordField = STRING_FIELD
    .min(8, MIN_LENGTH_MSG(8))
    .regex(PASSWORD_REGEX)

export const loginSchema = z.object({
    username: usernameField,
    password: passwordField
})