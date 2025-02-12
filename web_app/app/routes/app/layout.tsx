import { Outlet } from "react-router";
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import Sidebar from "~/components/ui/sidebar";
import type { Route } from "./+types";
import { getSession } from "~/server/session.server";
import { Flex } from "@radix-ui/themes";
=======
import Sidebar from "~/components/ui/sidebar";
import type { Route } from "./+types";
import { getSession } from "~/server/session.server";
import { Container, Heading } from "@radix-ui/themes";
>>>>>>> ui/components

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"))

  if (session.has("user")) {
    const user = session.get("user")
<<<<<<< HEAD
    return { user }
=======
    return user
>>>>>>> ui/components
  }
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  console.debug(loaderData)
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> ui/components

  return (
<<<<<<< HEAD
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
=======
    <div className="flex h-full w-full">
      <Sidebar user={loaderData} />
      <main className="basis-full grid">
        <Container width="95vw" height="100%" p="1">
          <Outlet />
        </Container>
      </main>
    </div>
>>>>>>> ui/components
  );
}
