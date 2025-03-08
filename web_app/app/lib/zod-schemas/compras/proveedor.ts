import { z } from "zod";

export const createProveedorSchema = z.object({
  idFiscal: z.string(),
  razonSocial: z.string(),
  direccion: z.string(),
  correo: z.string().email(),
  telefono: z.string().optional(),
  url: z.string().optional(),
  activo: z.boolean().default(true).optional(),
  observaciones: z.string().optional(),
});
export type CreateProveedor = z.infer<typeof createProveedorSchema>;
