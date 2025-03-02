import {
  addUnidadMedidaSchema,
  type AddUnidadMedidaType,
} from "~/routes/app/items/forms";
import { commitSession, validateAuthSession } from "../session.server";
import { redirect } from "react-router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addUnidadMedida(request: Request) {
  const url = new URL(request.url);
  console.debug("url:", url);
  const session = await validateAuthSession({ request });

  const form = await request.formData();
  const formData: Partial<AddUnidadMedidaType> = {
    descripcion: form.get("descripcion")?.toString(),
    corto: form.get("corto")?.toString(),
  };
  const route = form.get("redirectRoute")?.toString() ?? "/app";

  console.debug("validando con zod...", formData);
  const { success, data, error } =
    await addUnidadMedidaSchema.safeParseAsync(formData);

  if (!success) {
    console.debug("se han encontrado errores en el formulario", error.format());
    session.flash("zodErrors", error.format());
    throw redirect(route, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  console.debug("creando UnidadMedida...");
  const unidadMedida = await prisma.unidadMedida
    .create({ data })
    .then(async (und) => {
      console.debug("UnidadMedida:", und);
      if (!und) return undefined;
      return und;
    })
    .catch(async (e) => {
      console.error(e);
      throw e;
    });

  session.flash("info", {
    description: "Creada Unidad Medida",
    payload: unidadMedida,
  });
  console.info("redirigiendo a...", route);
  throw redirect(route, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export { addUnidadMedida };
