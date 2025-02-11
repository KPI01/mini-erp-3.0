import { ExitIcon } from "@radix-ui/react-icons";
import { Button, Em, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import { Menubar } from "radix-ui";
import { Link } from "react-router";
import type { SideBarLink, SidebarProps } from "~/types/components";

const links: SideBarLink[] = [
    {
        label: "Inventario",
        nested: [
            {
                label: "Consulta de articulo",
                action: "items"
            },
            {
                label: "Rotación de material"
            },
            {
                label: "Recepción de material"
            }
        ]
    },
    {
        label: "Compras",
        nested: [
            {
                label: "Ingreso de Proveedores"
            },
            {
                label: "Realizar Pedido"
            },
            {
                label: "Historial de Costes"
            }
        ]
    },
    {
        label: "Ventas",
        nested: [
            {
                label: "Facturación"
            },
            {
                label: "Historial de Ventas"
            },
        ]
    },
    {
        label: "Finanzas",
        nested: [
            {
                label: "Ingresos / Egresos"
            },
            {
                label: "Cuentas por cobrar / pagar"
            },
            {
                label: "Pago de Impuestos"
            },
        ]
    }
]

export default function Sidebar({ user, className }: SidebarProps) {
    console.debug(user)
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
