import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("/guest", "routes/guest/layout.tsx", [
    index("routes/guest/index.tsx"),
    route("login", "routes/guest/login.tsx"),
    route("register", "routes/guest/register.tsx"),
  ]),
  route("/logout", "routes/app/logout.tsx"),
  route("/app", "routes/app/layout.tsx", [
    index("routes/app/index.tsx"),
    ...prefix("items", [
      route("consulta", "routes/app/inventario/recursos/item/index.tsx"),
      route(":itemId", "routes/app/inventario/recursos/item/detail.tsx"),
      route("recepcion", "routes/app/inventario/recursos/item/recepcion.tsx"),
      route("stock", "routes/app/inventario/recursos/stock/index.tsx"),
    ]),
    ...prefix("unidad-medida", [
      index("routes/app/inventario/recursos/unidadMedida/index.tsx")
    ]),
    ...prefix("ubicacion", [
      index("routes/app/ubicacion/index.tsx"),
      route(":ubicacionId", "routes/app/inventario/recursos/ubicacion/detail.tsx"),
    ]),
    ...prefix("compras", [
      route("proveedor", "routes/app/compras/recursos/proveedor/index.tsx"),
      route("proveedor/:proveedorId", "routes/app/compras/recursos/proveedor/detail.tsx")
    ])
  ]),
] satisfies RouteConfig;
