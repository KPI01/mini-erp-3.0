import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function Layout() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="grid h-screen place-content-center font-sans text-(--darkBlue) bg-radial from-(--darkBlue)/15 from-5% to-white">
        <Outlet />
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}
