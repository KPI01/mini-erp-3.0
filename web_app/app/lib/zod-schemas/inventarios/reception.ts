import { z } from "zod";

export const itemForPedido = z.object({
  id: z.number(),
  descripcion: z.string(),
  unidadMedida: z.string(),
  cant: z.number().min(0),
});
export type ItemForPedidoType = z.infer<typeof itemForPedido>;
export const addStockSchema = z.object({
  fecha: z.date(),
  items: itemForPedido.array(),
  ubicacion: z.number(),
});
export type addStockType = z.infer<typeof addStockSchema>;
