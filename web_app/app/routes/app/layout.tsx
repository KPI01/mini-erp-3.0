import { Outlet } from "react-router";
import { Flex, Grid } from "@radix-ui/themes";
import Sidebar from "~/components/ui/sidebar";
import type { Route } from "./+types";
import { validateAuthSession } from "~/server/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await validateAuthSession({ request });

  return { user: session.get("user") };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  return (
    <Grid
      columns="2"
      height="100%"
      style={{ gridTemplateColumns: "0.18fr 1fr" }}
    >
      <Sidebar user={loaderData} className="basis-1/7" />
      <main className="px-10 py-6">
        <Outlet />
      </main>
    </Grid>
  );
}
