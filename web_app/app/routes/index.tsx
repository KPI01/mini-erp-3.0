import { Link, redirect, type LoaderFunctionArgs } from "react-router";
import { getSession } from "~/server/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"))

    if (session.has("user")) throw redirect("/app")
}

export default function Index() {
    return <div className="card">
        <ul>
            <li className="link">
                <Link to="/guest/login" >Iniciar sesión</Link>
            </li>
            <li className="link">
                <Link to="/guest/register" >Registro</Link>
            </li>
        </ul>
    </div>
}