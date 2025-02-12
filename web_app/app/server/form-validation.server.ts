import type { ValidateZodErrorsArgs } from "~/types/form-validation";
import { commitSession } from "./session.server";
import { data } from "react-router";

async function validateSessionErrors({ session, key = "errors", fn = "loader" }: ValidateZodErrorsArgs) {
    if (session.has(key)) {
        console.debug(`Se ha encontrado {${key}} en la sesión`)

        if (fn === "loader") return [
            { [key]: session.get(key) },
            { headers: { "Set-Cookie": await commitSession(session) } }
        ] satisfies Parameters<typeof data>

        return undefined
    }
}

export { validateSessionErrors }