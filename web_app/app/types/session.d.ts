import type { Session } from "react-router";
import type { ZodFormattedError } from "zod";

type Routes = "inventory" | "inventory.items" | "inventory.stock" | "inventory.reception"
    | "purchases" | "purchases.suppliers" | "purchases.requests" | "purchases.analysis"
    | "sells" | "sells.billing" | "sells.analysis"
    | "finance" | "finance.transactions" | "finance.accounting" | "finances.taxes"

interface SessionData {
    user: {
        id: number;
        name: string;
        email: string;
        username: string;
    };
    route: Routes
}

interface SessionFlashData {
    error: string | Record<string, string>;
    zodErrors: ZodFormattedError
}

interface RequireAuthCookieProps {
    request: Request
}