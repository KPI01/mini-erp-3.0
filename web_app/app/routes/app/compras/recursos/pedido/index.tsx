import type { MetaFunction } from "react-router";
import type { Route } from "./+types";
import { Box, Grid } from "@radix-ui/themes";
import { PageHeader } from "~/components/ui/header";
import { PrismaClient } from "@prisma/client";
import { validateAuthSession } from "~/server/session.server";
import CardContructor from "~/components/ui/card";
import CreatePedidoForm from "../../forms/pedido/Create";
import type { SelectInputOptionsType } from "~/types/components";
import { createPedido } from "~/server/actions/pedido.server";

const prisma = new PrismaClient()

export const meta: MetaFunction = () => [
    { title: "Realizar Pedido" }
]

export async function loader({ request }: Route.ClientLoaderArgs) {
    await validateAuthSession({ request })

    const proveedores = await prisma.proveedor.findMany()

    return { aux: { proveedores } }
}

export async function action({ request }: Route.ActionArgs) {
    await validateAuthSession({ request })

    if (request.method.toLowerCase() === "post") {
        return await createPedido(request)
    }
}

export default function Index({ loaderData }: Route.ComponentProps) {
    let aux: { proveedores: SelectInputOptionsType } = {
        proveedores: {}
    }
    loaderData.aux.proveedores.map((prov) => {
        if (aux.proveedores) {
            aux.proveedores[String(prov.id)] = prov.razonSocial
        }
    })

    return <Box>
        <PageHeader title="Realizar Pedido" />
        <Box maxWidth="50vw" mx="auto" mt="9">
            <CardContructor>
                <CreatePedidoForm aux={aux} />
            </CardContructor>
        </Box>
    </Box>
}