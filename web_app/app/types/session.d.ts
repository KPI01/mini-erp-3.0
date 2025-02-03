import type { ZodFormattedError } from "zod";

interface SessionData {
    user: {
        id: number;
        name: string;
        email: string;
        username: string;
    };
}

interface SessionFlashData {
    error: string;
    zodErrors: ZodFormattedError
}