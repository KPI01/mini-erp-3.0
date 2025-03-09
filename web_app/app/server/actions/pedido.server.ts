import { PrismaClient } from "@prisma/client";
import { commitSession, validateAuthSession } from "~/server/session.server";
import { redirect } from "react-router";
import { createPedidoSchema, type CreatePedido, type ItemForPedido } from "~/lib/zod-schemas/compras/pedido";

const prisma = new PrismaClient();

const routes = {
    base: "/app/compras/pedido",
    detail: (id: number) => `/app/compras/pedido/${id}`,
};

/**
 * Creates a new purchase order (pedido) with its associated items
 */
async function createPedido(request: Request) {
    const session = await validateAuthSession({ request });

    const form = await request.formData();

    // Parse the items from JSON string
    let items: ItemForPedido[] = [];
    const itemsJSON = form.get("items") || form.get("itemsJSON");

    if (itemsJSON && typeof itemsJSON === "string") {
        try {
            items = JSON.parse(itemsJSON);
        } catch (error) {
            console.error("Error parsing items JSON:", error);
            session.flash("error", "Error al procesar los artículos del pedido");
            throw redirect(routes.base, {
                headers: { "Set-Cookie": await commitSession(session) },
            });
        }
    }

    const formData: CreatePedido = {
        proveedorId: Number(form.get("proveedorId")),
        fechaPrevista: new Date(String(form.get("fechaPrevista"))),
        fechaEntrega: new Date(String(form.get("fechaEntrega"))),
        items: items,
    };

    console.debug("validando datos del pedido con zod...", formData);
    const { success, data, error } = await createPedidoSchema.safeParseAsync(formData);

    if (!success) {
        console.error("Se han encontrado errores en el formulario:", error.format());
        session.flash("zodErrors", error.format());
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }

    try {
        // Start a transaction to ensure all operations succeed or fail together
        const pedidoCreated = await prisma.$transaction(async (tx) => {
            // Create the pedido record
            const pedido = await tx.pedido.create({
                data: {
                    proveedorId: data.proveedorId,
                    creado: new Date(),
                    subTotal: Number(form.get("subTotal")),
                    totalImpuestos: Number(form.get("totalImpuestos")),
                    total: Number(form.get("total")),
                    fechaPrevista: data.fechaPrevista,
                    fechaEntrega: data.fechaEntrega,
                    pagado: false,
                    entregado: false,
                },
            });

            // Create the ItemsOnPedidos records for each item
            const itemsOnPedidos = await Promise.all(
                data.items.map((item) =>
                    tx.itemsOnPedidos.create({
                        data: {
                            pedidoId: pedido.id,
                            itemId: item.id,
                            cant: item.cant,
                            precio: item.precio,
                            asignado: new Date(),
                        },
                    })
                )
            );

            return {
                pedido,
                itemsOnPedidos
            };
        });

        console.info("Pedido creado con éxito:", pedidoCreated);

        session.flash("info", {
            description: "Pedido creado con éxito",
            payload: pedidoCreated.pedido,
        });

        throw redirect(routes.base, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch (error) {
        console.error("Error al crear el pedido:", error);

        if (error instanceof Error) {
            session.flash("error", `Error al crear el pedido: ${error.message}`);
        } else {
            session.flash("error", "Error al crear el pedido. Inténtelo de nuevo.");
        }

        throw redirect(routes.base, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }
}

/**
 * Updates an existing purchase order (pedido)
 */
async function updatePedido(request: Request, id: number) {
    const session = await validateAuthSession({ request });

    if (!id) {
        session.flash("error", "ID de pedido no proporcionado");
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }

    const form = await request.formData();
    const route = String(form.get("redirectRoute") || routes.base);

    try {
        // Check if the pedido exists
        const existingPedido = await prisma.pedido.findUnique({
            where: { id },
            include: { ItemsOnPedidos: true },
        });

        if (!existingPedido) {
            session.flash("error", `No se encontró el pedido con ID: ${id}`);
            throw redirect(route, {
                headers: { "Set-Cookie": await commitSession(session) },
            });
        }

        // Build the update data from form - only includes provided fields
        const updateData: Record<string, any> = {};

        if (form.has("proveedorId")) updateData.proveedorId = Number(form.get("proveedorId"));
        if (form.has("fechaPrevista")) updateData.fechaPrevista = new Date(String(form.get("fechaPrevista")));
        if (form.has("fechaEntrega")) updateData.fechaEntrega = new Date(String(form.get("fechaEntrega")));
        if (form.has("pagado")) updateData.pagado = form.get("pagado") === "true";
        if (form.has("entregado")) updateData.entregado = form.get("entregado") === "true";

        // Only update items if provided
        let updateItems = false;
        let items: ItemForPedido[] = [];

        const itemsJSON = form.get("items") || form.get("itemsJSON");
        if (itemsJSON && typeof itemsJSON === "string") {
            try {
                items = JSON.parse(itemsJSON);
                updateItems = true;
            } catch (error) {
                console.error("Error parsing items JSON:", error);
            }
        }

        // Calculate totals if items are provided
        if (updateItems && items.length > 0) {
            const subTotal = items.reduce((sum, item) => sum + (item.cant * item.precio), 0);
            const totalImpuestos = subTotal * 0.16;
            const total = subTotal + totalImpuestos;

            updateData.subTotal = subTotal;
            updateData.totalImpuestos = totalImpuestos;
            updateData.total = total;
        }

        // Start a transaction to update the pedido and its items
        const updatedPedido = await prisma.$transaction(async (tx) => {
            // Update the pedido record
            const pedido = await tx.pedido.update({
                where: { id },
                data: updateData,
            });

            // If items are provided, update them
            if (updateItems) {
                // Delete existing items
                await tx.itemsOnPedidos.deleteMany({
                    where: { pedidoId: id },
                });

                // Create new items
                const newItems = await Promise.all(
                    items.map((item) =>
                        tx.itemsOnPedidos.create({
                            data: {
                                pedidoId: id,
                                itemId: item.id,
                                cant: item.cant,
                                precio: item.precio,
                                asignado: new Date(),
                            },
                        })
                    )
                );

                return { pedido, items: newItems };
            }

            return { pedido, items: [] };
        });

        session.flash("info", {
            description: "Pedido actualizado con éxito",
            payload: updatedPedido.pedido
        });

        throw redirect(route, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    } catch (error) {
        console.error("Error al actualizar el pedido:", error);

        if (error instanceof Error) {
            session.flash("error", `Error al actualizar el pedido: ${error.message}`);
        } else {
            session.flash("error", "Error al actualizar el pedido");
        }

        throw redirect(route, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }
}

/**
 * Deletes a purchase order (pedido)
 */
async function deletePedido(request: Request, id: number) {
    const session = await validateAuthSession({ request });

    if (!id) {
        session.flash("error", "ID de pedido no proporcionado");
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }

    try {
        // Check if the pedido exists
        const existingPedido = await prisma.pedido.findUnique({
            where: { id },
        });

        if (!existingPedido) {
            session.flash("error", `No se encontró el pedido con ID: ${id}`);
            throw redirect(routes.base, {
                headers: { "Set-Cookie": await commitSession(session) },
            });
        }

        // Delete the pedido and its related items in a transaction
        const deletedPedido = await prisma.$transaction(async (tx) => {
            // First delete associated items
            await tx.itemsOnPedidos.deleteMany({
                where: { pedidoId: id },
            });

            // Then delete the pedido itself
            return await tx.pedido.delete({
                where: { id },
            });
        });

        session.flash("info", {
            description: "Pedido eliminado con éxito",
            payload: deletedPedido
        });

        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    } catch (error) {
        console.error("Error al eliminar el pedido:", error);

        if (error instanceof Error) {
            session.flash("error", `Error al eliminar el pedido: ${error.message}`);
        } else {
            session.flash("error", "Error al eliminar el pedido");
        }

        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }
}

/**
 * Gets details for a specific pedido
 */
async function getPedido(request: Request, id: number) {
    const session = await validateAuthSession({ request });

    if (!id) {
        session.flash("error", "ID de pedido no proporcionado");
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }

    try {
        // Get the pedido with its related items and provider
        const pedido = await prisma.pedido.findUnique({
            where: { id },
            include: {
                proveedor: true,
                ItemsOnPedidos: {
                    include: {
                        items: {
                            include: {
                                unidadMedida: true,
                            },
                        },
                    },
                },
            },
        });

        if (!pedido) {
            session.flash("error", `No se encontró el pedido con ID: ${id}`);
            throw redirect(routes.base, {
                headers: { "Set-Cookie": await commitSession(session) },
            });
        }

        return { pedido };
    } catch (error) {
        console.error("Error al obtener el pedido:", error);

        session.flash("error", "Error al obtener detalles del pedido");
        throw redirect(routes.base, {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    }
}

export { createPedido, updatePedido, deletePedido, getPedido };