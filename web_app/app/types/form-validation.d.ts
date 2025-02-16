import type { Session } from "react-router";
import type { ZodFormattedError } from "zod";
import type { SessionFlashData } from "./session";

type SessionErrors = Partial<SessionFlashData>
interface ValidateZodErrorsArgs {
    session?: Session,
    key?: string,
    fn?: "loader",
    extraData?: Record<string, unknown>
}