import { ExitIcon } from "@radix-ui/react-icons";
import { Button, Em, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import { Menubar } from "radix-ui";
import { Link } from "react-router";
import type { SideBarLink, SidebarProps } from "~/types/components";

const links: SideBarLink[] = [
    {
        label: "Inventario",
        route: "inventory",
        nested: [
            {
                label: "Consulta de articulo",
                route: "inventory.items",
                action: "items"
            },
            {
                label: "Rotación de material",
                route: "inventory.stock",
                action: "items/stock"
            },
            {
                label: "Recepción de material",
                route: "inventory.reception",
                action: "items/reception"
            }
        ]
    },
    {
        label: "Compras",
        route: "purchases",
        nested: [
            {
                label: "Ingreso de Proveedores",
                route: "purchases.suppliers"
            },
            {
                label: "Realizar Pedido",
                route: "purchases.requests"
            },
            {
                label: "Historial de Costes",
                route: "purchases.analysis"
            }
        ]
    },
    {
        label: "Ventas",
        route: "sells",
        nested: [
            {
                label: "Facturación",
                route: "sells.billing"
            },
            {
                label: "Historial de Ventas",
                route: "sells.analysis"
            },
        ]
    },
    {
        label: "Finanzas",
        route: "finance",
        nested: [
            {
                label: "Ingresos / Egresos",
                route: "finance.transactions"
            },
            {
                label: "Cuentas por cobrar / pagar",
                route: "finance.accounting"
            },
            {
                label: "Pago de Impuestos",
                route: "finances.taxes"
            },
        ]
    }
]

export default function Sidebar({ user, className }: SidebarProps) {
    return (
        <Menubar.Root className={["px-4 py-2 shadow-md", className].join(" ")}>
            <Heading size="8">Tu Sistema ERP</Heading>
            <Separator size="4" className="my-3" />
            <Flex direction="column" height="auto" align="start" justify="between">
                {links.map((l, i) => {
                    return (
                        <Menubar.Menu key={i}>
                            <Menubar.Trigger className="my-12 cursor-pointer">
                                <Text size="5" weight="medium">
                                    {l.label}
                                </Text>
                            </Menubar.Trigger>
                            <Menubar.Portal>
                                <Menubar.Content
                                    asChild
                                    side="right"
                                    align="center"
                                    className="bg-(--blue-2) rounded shadow-sm px-4 py-3 ms-2"
                                >
                                    <Grid columns="1" gapY="4" className="h-full">
                                        {l.nested && l.nested.map((n, ii) => {
                                            return <Menubar.Item key={ii} asChild>
                                                <Link to={n.action ?? "#"}>
                                                    <Text size="4">
                                                        {n.label}
                                                    </Text>
                                                </Link>
                                            </Menubar.Item>
                                        })}
                                    </Grid>
                                </Menubar.Content>
                            </Menubar.Portal>
                        </Menubar.Menu>)
                })}
            </Flex>
            <Button variant="ghost">
                <Text weight="medium">Cerrar sesión</Text>
                <Text weight="light">
                    <Em>{user?.username}</Em>
                </Text>
                <ExitIcon />
            </Button>
        </Menubar.Root>
    );
};
