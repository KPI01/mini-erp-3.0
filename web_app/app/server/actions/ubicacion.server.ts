import { redirect } from "react-router";
import { commitSession, validateAuthSession } from "../session.server";
import {
  addUbicacionSchema,
  type AddUbicacionType,
} from "~/routes/app/items/forms";
import { PrismaClient } from "@prisma/client";
import {
  createUbicacionSchema,
  type CreateUbicacionType,
} from "~/lib/zod-schemas/inventarios/ubicacion";

const prisma = new PrismaClient();

async function addUbicacion(request: Request) {
  const session = await validateAuthSession({ request });

  const form = await request.formData();
  console.debug("ubicacionId:", form.get("ubicacionId"));
  const formData: CreateUbicacionType = {
    descripcion: String(form.get("descripcion")),
    corto: String(form.get("corto")),
    isAlmacen: Boolean(form.get("isAlmacen")) ?? false,
    ubicacionId: Number(form.get("ubicacionId")),
  };
  const route = form.get("redirectRoute")?.toString() ?? "/app";

  console.debug("validando con zod...", formData);
  const { success, data, error } = await createUbicacionSchema
    .transform(async (values) => {
      console.debug("transforming...");
      let count = (await prisma.ubicacion.count()) + 1;
      let almacen =
        !values.isAlmacen && values.ubicacionId
          ? await prisma.ubicacion.findFirst({
              where: { id: Number(values.ubicacionId) },
            })
          : null;

      console.debug("almacen:", almacen);
      if (
        typeof values.corto === "undefined" ||
        (values.corto === "" && typeof almacen !== "undefined")
      ) {
        console.debug("Existe el {almacen}, el {corto} no se ha definido");
        values.corto = `${almacen?.corto.slice(0, 3).toUpperCase()}${String(almacen?.id)}${values.descripcion.slice(0, 3).toUpperCase()}${count}`;
      }

      values.corto = `${values.descripcion.slice(0, 3).toUpperCase()}${count}`;
      return values;
    })
    .safeParseAsync(formData);

  if (!success) {
    console.debug("se han encontrado errores en el formulario", error.format());
    session.flash("zodErrors", error.format());
    throw redirect(route, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  console.debug("creando Ubicacion...");
  let ubicacion = await prisma.ubicacion
    .create({
      data: {
        descripcion: data.descripcion,
        corto: String(data.corto),
        isAlmacen: data.isAlmacen,
        ubicacionId: data.ubicacionId ? Number(data.ubicacionId) : null,
      },
    })
    .catch(async (e) => {
      console.error("ha ocurrido un error al intentar crear la Ubicacion");
      throw e;
    });
  console.debug("Ubicacion creada");

  session.flash("info", {
    description: "Creado registro de: Ubicación",
    payload: ubicacion,
  });
  throw redirect(route, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export { addUbicacion };
