import { z } from "zod";
import { REQUIRED_MSG } from "~/helpers/forms";


export const itemForPedidoBaseSchema = z.object({
    id: z.number(),
    descripcion: z.string(),
    unidadMedida: z.string(),
    cant: z.number().min(1),
});

export type ItemForPedidoBase = z.infer<typeof itemForPedidoBaseSchema>;

export const itemForPedidoSchema = itemForPedidoBaseSchema.extend({
    precio: z.number().min(0),
});

export type ItemForPedido = z.infer<typeof itemForPedidoSchema>;

export const createPedidoSchema = z.object({
    proveedorId: z.number().min(1, "Debe seleccionar un proveedor"),
    fechaPrevista: z.date(),
    fechaEntrega: z.date(),
    items: z.array(itemForPedidoSchema).min(1, "Debe agregar al menos un item al pedido"),
});

export type CreatePedido = z.infer<typeof createPedidoSchema>;