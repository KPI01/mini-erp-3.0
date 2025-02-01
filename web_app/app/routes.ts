import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("guest", "routes/guest/layout.tsx", [
        route("login", "routes/guest/login.tsx"),
        route("register", "routes/guest/register.tsx")
    ]),
    route("app", "routes/app/layout.tsx", [
        index("routes/app/index.tsx"),
    ])
] satisfies RouteConfig;
