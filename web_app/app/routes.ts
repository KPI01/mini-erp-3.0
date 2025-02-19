import { type RouteConfig, index, prefix, route, } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    route("/guest", "routes/guest/layout.tsx", [
        index("routes/guest/index.tsx"),
        route("login", "routes/guest/login.tsx"),
        route("register", "routes/guest/register.tsx")
    ]),
    route("/logout", "routes/app/logout.tsx"),
    route("/app", "routes/app/layout.tsx", [
        index("routes/app/index.tsx"),
        ...prefix("items", [
            index("routes/app/items/index.tsx"),
            route(":id", "routes/app/items/detail.tsx"),
            route("stock", "routes/app/items/stock.tsx"),
            route("reception", "routes/app/items/reception.tsx")
        ]),
        ...prefix("unidad-medida", [
            index("routes/app/unidad-medida/index.tsx")
        ]),
        ...prefix("ubicacion", [
            index("routes/app/ubicacion/index.tsx")
        ])
    ])
] satisfies RouteConfig;
