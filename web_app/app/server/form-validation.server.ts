import type { ValidateZodErrorsArgs } from "~/types/form-validation";
import { commitSession } from "./session.server";
import { data } from "react-router";

async function validateSessionErrors({ session, key = "errors", fn = "loader", extraData }: ValidateZodErrorsArgs) {
    if (session?.has(key)) {
        console.debug(`Se ha encontrado {${key}} en la sesión`)

        if (fn === "loader") {
            if (extraData) {
                console.debug("Agregando {extraData}...")
                return [
                    { [key]: session.get(key), ...extraData },
                    { headers: { "Set-Cookie": await commitSession(session) } }
                ] satisfies Parameters<typeof data>
            }

            return [
                { [key]: session.get(key) },
                { headers: { "Set-Cookie": await commitSession(session) } }
            ] satisfies Parameters<typeof data>
        }
    }
}

export { validateSessionErrors }