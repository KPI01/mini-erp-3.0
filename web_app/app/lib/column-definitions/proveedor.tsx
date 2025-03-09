import type { Proveedor } from "@prisma/client";
import { Link } from "@radix-ui/themes";
import { createColumnHelper } from "@tanstack/react-table";

export const proveedorColHelper = createColumnHelper<Proveedor>();

export const proveedorColumn = [
  proveedorColHelper.accessor("razonSocial", {
    header: "Razón Social",
    filterFn: "includesString"
  }),
  proveedorColHelper.accessor("idFiscal", {
    header: "ID Fiscal",
    filterFn: "includesString"
  }),
  proveedorColHelper.accessor("correo", {
    header: "Correo",
    filterFn: "includesString",
    cell: ({ getValue }) => (
      <Link href={`mailto:${getValue()}`}>{getValue()}</Link>
    ),
  }),
  proveedorColHelper.accessor("telefono", {
    header: "Teléfono",
    cell: ({ getValue }) => (
      <Link href={`tel:${getValue()}`}>{getValue()}</Link>
    ),
  }),
];
