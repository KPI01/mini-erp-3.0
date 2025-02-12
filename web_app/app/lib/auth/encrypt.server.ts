import { hash, compare } from "bcrypt"

async function hashPassword(password: string, salt: number = 10) {
    try {
        const hashed = await hash(password, salt)
        console.info("Clave encriptada")
        return hashed
    } catch (err) {
        console.error("Ha ocurrido un error al encriptar la clave")
        throw err
    }
}

async function validatePassword(notHashed: string, hashed: string) {
    try {
        const match = await compare(notHashed, hashed)
        console.debug("Las claves son iguales?:", match)
        return match

    } catch (err) {
        console.error("Ha ocurrido un error al validar las contraseñas.")
        throw err
    }
}

export { hashPassword, validatePassword }