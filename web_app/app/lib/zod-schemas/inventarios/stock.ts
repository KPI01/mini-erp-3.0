import { z } from "zod";

export const itemForRecepcion = z.object({
  id: z.number(),
  descripcion: z.string(),
  unidadMedida: z.string(),
  cant: z.number().min(0),
});
export type ItemForRecepcion = z.infer<typeof itemForRecepcion>;
export const createStockSchema = z.object({
  fecha: z.date(),
  items: itemForRecepcion.array(),
  ubicacionId: z.number(),
});
export type CreateStock = z.infer<typeof createStockSchema>;
