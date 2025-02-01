import { createSecretKey, randomBytes } from "node:crypto";
import dotenv from "dotenv";

dotenv.config();

const getSecretToken = (): string => {
    if (process.env.SESSION_COOKIE_SECRET) {
        return process.env.SESSION_COOKIE_SECRET;
    }

    const fallbackToken = randomBytes(32).toString("hex"); // 64 caracteres hexadecimales.
    console.warn("SESSION_COOKIE_SECRET no está definido en .env. Usando un token generado.");
    return fallbackToken;
};

const handleToken = (name?: string): string[] => {
    const secret = getSecretToken();
    const token = createSecretKey(Buffer.from(`${name || "default"}${secret}`)).export().toString("hex");
    return [ token ];
};

export { handleToken };
