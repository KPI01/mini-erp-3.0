import { z } from "zod";
import { INVALID_MSG, REQUIRED_MSG } from "~/helpers/forms";

export const createItemSchema = z.object({
  id: z.number().readonly(),
  descripcion: z.string({ required_error: REQUIRED_MSG }).min(1, REQUIRED_MSG),
  activo: z.boolean({ required_error: REQUIRED_MSG }).default(true),
  stockMin: z.number().optional().default(0),
  stockMax: z.number().optional().default(0),
  unidadMedidaId: z.number({ required_error: REQUIRED_MSG }).nullish(),
});
export type CreateItem = z.infer<typeof createItemSchema>;

export const updateItemSchema = z
  .object({
    descripcion: z.string({ invalid_type_error: INVALID_MSG }),
    activo: z.boolean({ invalid_type_error: INVALID_MSG }),
    stockMin: z.number({ invalid_type_error: INVALID_MSG }),
    stockMax: z.number({ invalid_type_error: INVALID_MSG }),
    unidadMedidaId: z.number({ invalid_type_error: INVALID_MSG }),
  })
  .partial();
export type UpdateItem = z.infer<typeof updateItemSchema>;
