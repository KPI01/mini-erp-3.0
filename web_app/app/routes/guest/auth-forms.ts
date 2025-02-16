import { z } from "zod";
import { validatePassword } from "~/lib/auth/encrypt";
import { INVALID_MSG, MIN_LENGTH_MSG, STRING_FIELD } from "~/helpers/forms";
import { PrismaClient } from "@prisma/client";
import { formOptions } from "@tanstack/react-form";

let prisma = new PrismaClient()

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
    username: USERNAME_FIELD
        .refine(async (val) => {
            let exists = await prisma.user.findUnique({
                where: {
                    username: val
                },
            }).then((data) => {
                if (data) return false
                return true
            })

            console.info("el usuario?:", !exists)
            return exists
        }, "El usuario ya existe."),
    email: EMAIL_FIELD.refine(async (val) => {
        let exists = await prisma.user.findUnique({
            where: {
                email: val
            },
        }).then((data) => {
            if (data) return false
            return true
        })

        console.info("el correo existe?:", !exists)
        return exists
    }, "El correo ya existe."),
    password: PASSWORD_FIELD.regex(
        PASSWORD_REGEX,
        "La clave debe contener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (,.<>?';\":`~!@#$%^&*+-/\\\\)"
    ),
    confirmation: STRING_FIELD
})
    .refine((value) => value.password === value.confirmation, {
        message: "Las claves no son iguales.",
        path: ["confirmation"]
    })

export const loginSchema = z.object({
    username: USERNAME_FIELD,
    password: PASSWORD_FIELD,
})
    .refine(async (value) => {
        const savedUserName = await prisma.user.findFirst({
            where: {
                username: value.username
            }
        }).then((data) => {
            if (data) return data.username
        })

        if (!savedUserName) return false
        return true
    }, {
        message: "El usuario no existe",
        path: ["username"]
    })
    .refine(async (value) => {
        const savedPassword = await prisma.user.findFirst({
            where: {
                username: value.username
            }
        })
            .then((data) => {
                if (data) return data.password
            })

        if (!savedPassword) return false

        return await validatePassword(value.password, savedPassword)
    }, {
        message: "La clave es incorrecta.",
        path: ["password"]
    })
export type loginSchemaType = z.infer<typeof loginSchema>