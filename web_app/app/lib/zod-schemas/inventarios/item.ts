import { z } from "zod";
import { REQUIRED_MSG } from "~/helpers/forms";

export const createItemSchema = z.object({
  id: z.number().readonly(),
  descripcion: z.string({ required_error: REQUIRED_MSG }).min(1, REQUIRED_MSG),
  activo: z.boolean().default(true),
  stockMin: z.number().optional().default(0),
  stockMax: z.number().optional().default(0),
  unidadMedidaId: z.number().nullish(),
});
export type CreateItemType = z.infer<typeof createItemSchema>;
