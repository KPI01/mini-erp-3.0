import { PrismaClient } from "@prisma/client";
import { commitSession, validateAuthSession } from "../session.server";
import { redirect } from "react-router";
import {
  createStockSchema,
  type CreateStock
  type ItemForPedido,
} from "~/lib/zod-schemas/inventarios/stock";

const prisma = new PrismaClient();

async function addStock(request: Request) {
  const session = await validateAuthSession({ request });

  const form = await request.formData();

  // Parse the form data - handling both approaches (JSON or indexed fields)
  let items: ItemForPedido[] = [];

  // First, try to get items from JSON string
  const itemsJSON = form.get("items");
  if (itemsJSON && typeof itemsJSON === "string") {
    try {
      items = JSON.parse(itemsJSON);
    } catch (error) {
      console.error("Error parsing items JSON:", error);
    }
  }

  // If itemsJSON approach didn't work, try the indexed fields approach
  if (items.length === 0) {
    // Get all form entries and find ones that match the pattern items[index][property]
    console.debug("items:", items);
    const itemEntries = Array.from(form.entries()).filter(
      ([key]) => key.startsWith("items[") && key.includes("]["),
    );

    // Group entries by index
    const itemsByIndex: Record<string, Record<string, string>> = {};

    itemEntries.forEach(([key, value]) => {
      // Extract index and property name from the key (e.g., "items[0][id]" -> index="0", prop="id")
      const matches = key.match(/items\[(\d+)\]\[([^\]]+)\]/);
      if (matches && matches.length === 3) {
        const [, index, prop] = matches;

        if (!itemsByIndex[index]) {
          itemsByIndex[index] = {};
        }

        itemsByIndex[index][prop] = String(value);
      }
    });
    console.debug("itemEntries", itemEntries);

    // Convert the grouped entries to an array of items
    // @ts-ignore
    items = Object.values(itemsByIndex).map((item) => ({
      id: parseInt(item.id),
      descripcion: item.descripcion,
      cant: parseInt(item.cant),
      seccionId: parseInt(item.seccionId),
      seccion: item.seccion,
    }));
    console.debug("items:", items);
  }

  // Construct the form data object
  const formData: CreateStock = {
    fecha: new Date(String(form.get("fecha"))),
    ubicacionId: parseInt(String(form.get("ubicacionId"))),
    items: items,
  };

  const { success, data, error } =
    await createStockSchema.safeParseAsync(formData);

  if (!success) {
    console.error(
      "Se han encontrado errores en el formulario:",
      error.format(),
    );

    session.flash("zodErrors", error.format());

    return redirect("/app/items/reception", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  try {
    // Start a transaction to ensure all operations succeed or fail together
    const stockMovements = await prisma.$transaction(async (tx) => {
      // Create separate stock records for each item
      const stockRecords = await Promise.all(
        data.items.map((item) =>
          tx.stock.create({
            data: {
              fecha: data.fecha,
              descripcion: `Recepción de ${item.descripcion}`,
              cant: item.cant,
              itemId: item.id,
              ubicacionId: data.ubicacionId,
            },
          }),
        ),
      );

      return { stockRecords };
    });

    console.info("Movimientos de stock creados:", stockMovements);

    session.flash("info", {
      description: "Recepción de material registrada con éxito",
      payload: stockMovements,
    });

    return redirect("/app/items/stock", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error("Error al crear los movimientos:", error);

    session.flash("zodErrors", {
      _errors: [
        "Error al registrar la recepción de material. Inténtelo de nuevo.",
      ],
    });

    return redirect("/app/items/reception", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export { addStock };
