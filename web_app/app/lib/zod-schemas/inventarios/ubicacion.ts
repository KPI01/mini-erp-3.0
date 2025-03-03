import { z } from "zod";
import { INVALID_MSG, MAX_LENGTH_MSG, REQUIRED_MSG } from "~/helpers/forms";

export const createUbicacionSchema = z
  .object({
    descripcion: z
      .string({
        required_error: REQUIRED_MSG,
        invalid_type_error: INVALID_MSG,
      })
      .min(1, REQUIRED_MSG),
    corto: z
      .string({
        required_error: REQUIRED_MSG,
        invalid_type_error: INVALID_MSG,
      })
      .min(1, REQUIRED_MSG)
      .max(8, MAX_LENGTH_MSG(8)),
    isAlmacen: z.boolean({
      invalid_type_error: INVALID_MSG,
      required_error: REQUIRED_MSG,
    }),
    ubicacionId: z.number().optional(),
  })
  .superRefine((value, ctx) => {
    // Only require ubicacionId when isAlmacen is false
    if (!value.isAlmacen) {
      console.debug("Validating non-almacen, ubicacionId:", value.ubicacionId);
      if (value.ubicacionId === 0) {
        console.debug(
          "ubicacionId validation failed, value:",
          value.ubicacionId,
        );
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["ubicacionId"],
          message: REQUIRED_MSG,
        });
        return;
      }
    }
    return value;
  });
export type CreateUbicacionType = z.infer<typeof createUbicacionSchema>;

export const updateUbicacionSchema = z.object({
  id: z.number(),
  descripcion: z
    .string({
      required_error: REQUIRED_MSG,
      invalid_type_error: INVALID_MSG,
    })
    .min(1, REQUIRED_MSG),
  corto: z
    .string({
      required_error: REQUIRED_MSG,
      invalid_type_error: INVALID_MSG,
    })
    .min(1, REQUIRED_MSG)
    .max(8, MAX_LENGTH_MSG(8)),
  isAlmacen: z.boolean({
    invalid_type_error: INVALID_MSG,
    required_error: REQUIRED_MSG,
  }),
  ubicacionId: z.number().optional(),
});
export type UpdateUbicacionType = z.infer<typeof updateUbicacionSchema>;
