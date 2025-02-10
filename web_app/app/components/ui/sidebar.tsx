import { Flex, Grid, Heading, Separator } from "@radix-ui/themes";
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
                label: "Realizar pedido"
            },
            {
                label: "Rotación de material"
            },
            {
                label: "Recepción de material"
            }
        ]
    }
]

export default function Sidebar({ user }: SidebarProps) {
    console.debug(user)
    return (
        <Menubar.Root className="px-4 py-2 shadow-md">
            <Heading size="6">Tu Sistema ERP</Heading>
            <Separator size="4" className="my-3" />
            <Flex direction="column" align="start" className="!h-full !justify-evenly">
                {links.map((l, i) => {
                    return (
                        <Menubar.Menu key={i}>
                            <Menubar.Trigger className="font-semibold cursor-pointer">{l.label}</Menubar.Trigger>
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
                                                    {n.label}
                                                </Link>
                                            </Menubar.Item>
                                        })}
                                    </Grid>
                                </Menubar.Content>
                            </Menubar.Portal>
                        </Menubar.Menu>)
                })}
            </Flex>
        </Menubar.Root>
    );
};
