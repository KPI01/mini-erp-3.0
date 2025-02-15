import { validateAuthSession } from "~/server/session.server";
import type { Route } from "./+types";
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [{ title: "App", description: "Esta es la aplicación." }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await validateAuthSession({ request })
}

export default function Index() {

  return (
    <div className="grid p-6">
      <h1>Esto es la app</h1>
    </div>
  )
}
