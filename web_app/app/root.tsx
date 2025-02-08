import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Theme } from "@radix-ui/themes"

import "./app.css";

export default function Layout() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className="font-sans"
      >
        <Theme
          accentColor="blue"
          panelBackground="translucent"
          scaling="100%"
          radius="large"
          className="h-screen"
        >
          <Outlet />
          <Scripts />
          <ScrollRestoration />
        </Theme>
      </body>
    </html>
  );
}
