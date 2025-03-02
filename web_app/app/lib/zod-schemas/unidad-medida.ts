import { z } from "zod";
import { INVALID_MSG, REQUIRED_MSG } from "~/helpers/forms";

export const createUnidadMedidaSchema = z.object({
  descripcion: z
    .string({
      required_error: REQUIRED_MSG,
      invalid_type_error: INVALID_MSG,
    })
    .min(1, REQUIRED_MSG),
  corto: z
    .string({
      invalid_type_error: INVALID_MSG,
      required_error: REQUIRED_MSG,
    })
    .min(1, REQUIRED_MSG)
    .max(6, "Debe tener máximo 6 caracteres."),
});
export type CreateUnidadMedidaType = z.infer<typeof createUnidadMedidaSchema>;
