import { PrismaClient } from "@prisma/client";
import { redirect } from "react-router";
import { commitSession, validateAuthSession } from "../session.server";
import {
  createItemSchema,
  updateItemSchema,
  type CreateItem,
  type UpdateItem,
} from "~/lib/zod-schemas/inventarios/item";
import { route } from "@react-router/dev/routes";

const routes = {
  consulta: "/app/inventario/consulta",
  stock: "/app/inventario/stock",
  recepcion: "/app/inventario/recepcion"
};

const prisma = new PrismaClient();

async function addItem(request: Request) {
  const session = await validateAuthSession({ request });

  const form = await request.formData();
  const formData: CreateItem = {
    id: Number(form.get("id")),
    descripcion: String(form.get("descripcion")),
    activo: Boolean(form.get("activo")),
    stockMin: Number(form.get("stockMin")),
    stockMax: Number(form.get("stockMax")),
    unidadMedidaId: form.get("unidadMedidaId")
      ? Number(form.get("unidadMedidaId"))
      : null,
  };

  console.debug("validando con zod...", formData);
  const { success, data, error } =
    await createItemSchema.safeParseAsync(formData);

  if (!success) {
    console.debug("se han encontrado errores en el formulario", error.format());
    session.flash("zodErrors", error.format());
    throw redirect(routes.consulta, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  console.debug("creando Item...");
  const item = await prisma.item
    .create({
      data: {
        descripcion: data.descripcion,
        activo: data.activo,
        unidadMedidaId: Number(data.unidadMedidaId),
      },
    })
    .catch(async (e) => {
      console.error("ha ocurrido un error creando el Item...");
      throw e;
    });

  return item;
}

async function updateItem(request: Request, id: number) {
  console.debug("validando sesion...");
  const session = await validateAuthSession({ request });

  const form = await request.formData();
  const formData: UpdateItem = {
    descripcion: String(form.get("descripcion")),
    activo: Boolean(form.get("activo")),
    stockMax: form.get("stockMax")
      ? Number(form.get("stockMax")?.toString())
      : undefined,
    stockMin: form.get("stockMin")
      ? Number(form.get("stockMax")?.toString())
      : undefined,
  };
  const route = form.get("redirectRoute")?.toString() ?? routes.consulta;

  console.debug("validando con zod...", formData);
  const { success, data, error } = updateItemSchema
    .refine(({ descripcion }) => descripcion !== "", {
      message: "La descripción no puede estar vacía.",
      path: ["descripcion"],
    })
    .safeParse(formData);

  if (!success) {
    console.debug("se han encontrado errores en el formulario", error.format());
    session.flash("zodErrors", error.format());
    throw redirect(route, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  console.debug(`actualizando Item [${id}]...`, data);
  const item = await prisma.item
    .update({
      where: { id: Number(id) },
      data: {
        descripcion: data.descripcion,
        activo: data.activo,
        stockMax: data.stockMax,
        stockMin: data.stockMin,
      },
    })
    .catch(async (e) => {
      console.error(e);
      throw e;
    });

  session.flash("info", {
    description: "Se ha actualizado el Item",
    payload: item,
  });
  throw redirect(route, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

async function clearItem(id: number) {
  await prisma.item.update({
    where: { id },
    data: { unidadMedidaId: null },
  });
  console.debug("El item ya no tiene relaciones...");
  await prisma.stock.deleteMany({ where: { itemId: id } });
  console.debug("El item ya no tiene movimientos...");
}
async function deleteItem(request: Request, id: number) {
  console.debug("validando sesión...");
  const session = await validateAuthSession({ request });

  if (id) {
    console.debug("eliminando Item...");
    await clearItem(id);
    const item = await prisma.item
      .delete({
        where: { id },
      })
      .catch(async (e) => {
        console.error("ha ocurrido un error eliminando el Item...");
        throw e;
      });

    session.flash("info", { description: "Item eliminado", payload: item });
    throw redirect(routes.consulta, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  session.flash("error", "No se ha enviado ningún {id} de Item");
  throw redirect(routes.consulta, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export { addItem, updateItem, deleteItem };
