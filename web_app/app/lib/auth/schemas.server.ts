import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { MIN_LENGTH_MSG, STRING_FIELD } from "~/helpers/forms";

let prisma = new PrismaClient()

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[,.<>?';":`~!@#$%^&*+-\/\\]).*$/gm

export const registerSchema = z.object({
    name: STRING_FIELD.min(3, MIN_LENGTH_MSG(3)),
    username: STRING_FIELD
        .min(3, MIN_LENGTH_MSG(3))
        .refine(async (val) => {
            let exists = await prisma.user.findUnique({
                where: {
                    username: val
                },
            }).then((data) => {
                if (data) return false
                return true
            })

            console.info("user exists?:", !exists)
            return exists
        }, "El usuario ya existe."),
    email: STRING_FIELD.email().refine(async (val) => {
        let exists = await prisma.user.findUnique({
            where: {
                email: val
            },
        }).then((data) => {
            if (data) return false
            return true
        })

        console.info("email exists?:", !exists)
        return exists
    }, "El correo ya existe."),
    password: STRING_FIELD.min(8, MIN_LENGTH_MSG(8))
        .regex(
            PASSWORD_REGEX,
            "La clave debe contener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (,.<>?';\":`~!@#$%^&*+-/\\\\)"
        ),
    confirmation: STRING_FIELD
})
    .refine((value) => value.password === value.confirmation, {
        message: "Las claves no son iguales.",
        path: [ "confirmation" ]
    })