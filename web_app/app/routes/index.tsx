import { Box, Card, Heading, Link } from "@radix-ui/themes";
import { Link as LinkRR, redirect, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { getSession } from "~/server/session.server";

const meta: MetaFunction = () => {return [{
    title: "App"
}]}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"))

    if (session.has("user")) throw redirect("/app")
}

export default function Index() {
    return <Box style={{ display: "grid", placeContent: "center" }} className="h-full">
        <Card size="3" variant="classic">
            <Heading as="h1" size="8">Links de la aplicación</Heading>
            <ul>
                <li>
                    <Link size="6" asChild>
                        <LinkRR to="/guest/login" >Iniciar sesión</LinkRR>
                    </Link>
                </li>
                <li>
                    <Link size="6" asChild>
                        <LinkRR to="/guest/register" >Registro</LinkRR>
                    </Link>
                </li>
            </ul>
        </Card>
    </Box >
}