import { Outlet } from "react-router";
import { Flex } from "@radix-ui/themes";
import Sidebar from "~/components/ui/sidebar";
import type { Route } from "./+types";

export default function Layout({ loaderData }: Route.ComponentProps) {
  console.debug(loaderData)
  return (
    <div className="flex h-full w-full">
      <Sidebar user={loaderData} className="basis-1/7" />
      <main className="basis-full grid">
        <Flex direction="column" className="px-24">
          <Outlet />
        </Flex>
      </main>
    </div >

  )

}
