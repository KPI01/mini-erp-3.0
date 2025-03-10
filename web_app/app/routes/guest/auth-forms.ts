import { z } from "zod";
import { INVALID_MSG, MIN_LENGTH_MSG, STRING_FIELD } from "~/helpers/forms";
import { PrismaClient } from "@prisma/client";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[,.<>?';":`~!@#$%^&*+-\/\\]).*$/gm

const USERNAME_FIELD = STRING_FIELD
    .min(3, MIN_LENGTH_MSG(3))
const EMAIL_FIELD = STRING_FIELD
    .endsWith("@gmail.com", INVALID_MSG)
    .or(
        STRING_FIELD
            .endsWith("@outlook.com", INVALID_MSG)
            .or(
                STRING_FIELD
                    .endsWith("@hotmail.com", INVALID_MSG)
                    .or(
                        STRING_FIELD
                            .endsWith("@yahoo.com", INVALID_MSG)

                    )

            )

    )

const PASSWORD_FIELD = STRING_FIELD.min(8, MIN_LENGTH_MSG(8))

export const registerSchema = z.object({
    name: STRING_FIELD.min(3, MIN_LENGTH_MSG(3)),
    username: USERNAME_FIELD,
    email: EMAIL_FIELD,
    password: PASSWORD_FIELD.regex(
        PASSWORD_REGEX,
        "La clave debe contener al menos: 1 mayúscula; 1 minúscula; 1 número y 1 carácter especial (,.<>?';\":`~!@#$%^&*+-/\\\\)"
    ),
    confirmation: STRING_FIELD
}).superRefine(({ password, confirmation }, { addIssue }) => {
    if (confirmation !== password) addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmation"],
        message: "Las claves deben ser iguales."
    })

    return
})

export const loginSchema = z.object({
    username: USERNAME_FIELD,
    password: PASSWORD_FIELD,
})

export type loginSchemaType = z.infer<typeof loginSchema>