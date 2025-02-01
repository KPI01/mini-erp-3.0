import { getSession } from "~/server/session.server";
import type { Route } from "./+types";
import { redirect, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [ { title: "App", description: "Esta es la aplicación." } ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  console.debug(session);
  if (!session.has("user")) throw redirect("/guest/login");
}

export default function Index() {
  return <div className="grid">
    <h1>Esto es la app</h1>;
  </div>
}
