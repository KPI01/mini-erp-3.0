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
    errors: Record<string, string | string[]>
}