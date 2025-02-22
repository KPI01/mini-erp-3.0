import { PrismaClient, type Stock } from "@prisma/client";
import { addStockSchema } from "~/routes/app/items/forms";
import { commitSession, validateAuthSession } from "../session.server";
import { redirect } from "react-router";

const prisma = new PrismaClient();

async function addStock(request: Request) {
  const session = await validateAuthSession({ request });

  const form = await request.formData();
  const formData: Partial<Stock> = {
    fecha: new Date(String(form.get("fecha"))),
    itemId: Number(form.get("itemId")),
    cant: Number(form.get("cant")),
    descripcion: String(form.get("descripcion")),
  };

  const { success, data, error } =
    await addStockSchema.safeParseAsync(formData);

  if (!success) {
    console.debug("se han encontrado errores en el formulario", error.format());
    session.flash("zodErrors", error.format());
    throw redirect("/app/items/reception", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  console.debug("agregando Stock...");
  const stock = await prisma.stock.create({
    data: {
      fecha: data.fecha,
      itemId: data.itemId,
      cant: data.cant,
      descripcion: data.descripcion,
    },
  });

  session.flash("info", {
    description: "Se ha creado el stock",
    payload: stock,
  });
  throw redirect("/app/items/stock", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export { addStock };
