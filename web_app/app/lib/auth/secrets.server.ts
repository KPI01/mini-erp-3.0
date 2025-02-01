import { randomBytes } from "node:crypto"

const SECRET_SIZE = 64
const SECRET_TYPE = "base64"

function createSecret(): string[] {
    let secrets: string[] = []

    randomBytes(SECRET_SIZE, (err, buf) => {
        if (err) {
            console.error(err)
        }

        secrets.push(buf.toString(SECRET_TYPE))
    })

    return secrets
}

export { createSecret }