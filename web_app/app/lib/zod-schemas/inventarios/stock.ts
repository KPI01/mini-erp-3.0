import { z } from "zod";

export const itemForPedido = z.object({
  id: z.number(),
  descripcion: z.string(),
  unidadMedida: z.string(),
  cant: z.number().min(0),
});
export type ItemForPedido = z.infer<typeof itemForPedido>;
export const createStockSchema = z.object({
  fecha: z.date(),
  items: itemForPedido.array(),
  ubicacionId: z.number(),
});
export type CreateStock = z.infer<typeof createStockSchema>;
