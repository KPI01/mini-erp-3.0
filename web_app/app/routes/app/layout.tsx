import { Outlet } from "react-router";
import Sidebar from "~/components/ui/sidebar";
import type { Route } from "./+types";
import { getSession } from "~/server/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"))

  if (session.has("user")) {
    const user = session.get("user")
    return user
  }
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  console.debug(loaderData)

  return (
    <div className="flex h-full w-full">
      <Sidebar user={loaderData} />
      <main className="basis-full grid">
        <Outlet />
      </main>
    </div>
  );
}
