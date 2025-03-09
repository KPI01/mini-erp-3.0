import { z } from "zod";

const baseProveedorSchema = z.object({
  idFiscal: z.string(),
  razonSocial: z.string(),
  direccion: z.string(),
  correo: z.string().email(),
  telefono: z.string(),
  url: z.string(),
  activo: z.boolean(),
  observaciones: z.string(),
})

export const createProveedorSchema = baseProveedorSchema.partial({
  activo: true,
  telefono: true,
  url: true,
  observaciones: true
});
export type CreateProveedor = z.infer<typeof createProveedorSchema>;

export const updateProveedorSchema = baseProveedorSchema.partial()
export type UpdateProveedor = z.infer<typeof updateProveedorSchema>
