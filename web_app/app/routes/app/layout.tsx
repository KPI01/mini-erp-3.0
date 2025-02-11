import { Outlet } from "react-router";
<<<<<<< Updated upstream
=======
import Sidebar from "~/components/ui/sidebar";
import type { Route } from "./+types";
import { getSession } from "~/server/session.server";
import { Flex } from "@radix-ui/themes";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"))

  if (session.has("user")) {
    const user = session.get("user")
    return { user }
  }
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  console.debug(loaderData)
>>>>>>> Stashed changes

export default function Layout() {
  return (
<<<<<<< Updated upstream
    <main>
      <Outlet />
    </main>
=======
    <div className="flex h-full w-full">
      <Sidebar user={loaderData} className="basis-1/7" />
      <main className="basis-full grid">
        <Flex direction="column" className="px-24">
          <Outlet />
        </Flex>
      </main>
    </div >
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  );
}
