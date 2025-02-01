import { sessionExists } from "~/server/auth/session";
import type { Route } from "./+types";
import { redirect, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [{ title: "App", description: "Esta es la aplicación." }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionExists(request);

  console.debug(session);
  if (!session) throw redirect("/guest/login");
}

export default function Index() {
  return <h1>Esto es la app</h1>;
}
