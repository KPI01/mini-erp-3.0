import { redirect } from "react-router";
import { commitSession, validateAuthSession } from "../session.server";
import { PrismaClient } from "@prisma/client";
import {
  createUbicacionSchema,
  updateUbicacionSchema,
  type CreateUbicacionType,
  type UpdateUbicacionType,
} from "~/lib/zod-schemas/inventarios/ubicacion";

const prisma = new PrismaClient();

async function createUbicacion(request: Request) {
  const session = await validateAuthSession({ request });

  const form = await request.formData();
  const formData: CreateUbicacionType = {
    descripcion: String(form.get("descripcion")),
    corto: String(form.get("corto")),
    isAlmacen: Boolean(form.get("isAlmacen")),
    ubicacionId: Number(form.get("ubicacionId")),
  };
  const route = form.get("redirectRoute")?.toString() ?? "/app";

  console.debug("validando con zod...", formData);
  const { success, data, error } =
    await createUbicacionSchema.safeParseAsync(formData);

  if (!success) {
    console.debug("se han encontrado errores en el formulario", error.format());
    session.flash("zodErrors", error.format());
    throw redirect(route, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  console.debug("creando Ubicacion...");
  let ubicacion = await prisma.ubicacion.create({ data }).catch(async (e) => {
    console.error("ha ocurrido un error al intentar crear la Ubicacion");
    throw e;
  });
  console.debug("Ubicacion creada");

  session.flash("info", {
    description: "Creado registro de: Ubicación",
    payload: ubicacion,
  });
  console.info("rediriendo a...", route);
  throw redirect(route, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

async function getUbicacion(request: Request, id: number) {
  const session = await validateAuthSession({ request });

  if (!id) {
    session.flash(
      "error",
      "No se ha ingresado ningún {id} para recuperar de la base de datos.",
    );
    throw redirect("/app/items/reception", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  try {
    console.debug(`Buscando ubicación con id: ${id}`);
    const ubicacion = await prisma.ubicacion.findUnique({
      where: { id },
      include: {
        almacen: true,
        seccion: true,
      },
    });

    if (!ubicacion) {
      console.error(`No se encontró ninguna ubicación con id: ${id}`);
      session.flash("error", `No se encontró ninguna ubicación con id: ${id}`);
      throw redirect("/app/items/reception", {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }

    console.debug("Ubicación encontrada:", ubicacion);
    return { ubicacion };
  } catch (error) {
    console.error("Error al buscar la ubicación:", error);
    session.flash("error", "Ha ocurrido un error al buscar la ubicación.");
    throw redirect("/app/items/reception", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } finally {
    await prisma.$disconnect();
  }
}

async function updateUbicacion(request: Request, id: number) {
  const session = await validateAuthSession({ request });

  if (!id) {
    session.flash(
      "error",
      "No se ha ingresado ningún {id} para actualizar en la base de datos.",
    );
    throw redirect("/app/items/reception", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  try {
    // Verify the ubicacion exists
    const existingUbicacion = await prisma.ubicacion.findUnique({
      where: { id },
    });

    if (!existingUbicacion) {
      session.flash("error", `No se encontró ninguna ubicación con id: ${id}`);
      throw redirect("/app/items/reception", {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }

    // Parse form data
    const form = await request.formData();
    const formData = {
      id,
      descripcion: String(form.get("descripcion")),
      corto: String(form.get("corto")),
      isAlmacen: Boolean(form.get("isAlmacen")),
      ubicacionId: form.get("ubicacionId")
        ? Number(form.get("ubicacionId"))
        : undefined,
    } satisfies UpdateUbicacionType;
    const route =
      form.get("redirectRoute")?.toString() ?? "/app/items/reception";

    console.debug("Validando datos para actualización...", formData);
    const { success, data, error } =
      await updateUbicacionSchema.safeParseAsync(formData);

    if (!success) {
      console.debug(
        "Se han encontrado errores en el formulario",
        error.format(),
      );
      session.flash("zodErrors", error.format());
      throw redirect(route, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }

    // Check for circular references if updating parent location
    if (data.ubicacionId && data.ubicacionId !== 0) {
      if (id === data.ubicacionId) {
        session.flash("error", "Una ubicación no puede ser su propio padre");
        throw redirect(route, {
          headers: { "Set-Cookie": await commitSession(session) },
        });
      }

      // Check if the new parent would create a circular reference
      const wouldCreateCircular = await checkForCircularReference(
        id,
        data.ubicacionId,
      );
      if (wouldCreateCircular) {
        session.flash(
          "error",
          "No se permite la referencia circular entre ubicaciones",
        );
        throw redirect(route, {
          headers: { "Set-Cookie": await commitSession(session) },
        });
      }
    }

    console.debug("Actualizando ubicación...");
    const updateData = {
      descripcion: data.descripcion,
      corto: data.corto,
      isAlmacen: data.isAlmacen,
      // If it's an almacen, it can't have a parent
      ubicacionId: data.isAlmacen ? null : data.ubicacionId || null,
    };

    const ubicacion = await prisma.ubicacion.update({
      where: { id },
      data: updateData,
    });

    console.debug("Ubicación actualizada:", ubicacion);

    session.flash("info", {
      description: "Actualizado registro de: Ubicación",
      payload: ubicacion,
    });

    throw redirect(route, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Ha ocurrido un error al actualizar la ubicación:",
        error.message,
      );
      session.flash(
        "error",
        `Ha ocurrido un error al actualizar la ubicación: ${error.message}`,
      );
    } else {
      // If it's already a redirect throw, just rethrow it
      throw error;
    }

    throw redirect("/app/items/reception", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to check for circular references
async function checkForCircularReference(
  sourceId: number,
  targetId: number,
): Promise<boolean> {
  try {
    // Get all ancestors of the target location
    const ancestors = await getAncestors(targetId);

    // If the source ID is in the ancestors, we have a circular reference
    return ancestors.includes(sourceId);
  } catch (error) {
    console.error("Error checking for circular references:", error);
    return true; // Assume it's circular if we can't check
  }
}

async function getAncestors(
  locationId: number,
  ancestors: number[] = [],
): Promise<number[]> {
  const location = await prisma.ubicacion.findUnique({
    where: { id: locationId },
    select: { ubicacionId: true },
  });

  if (!location || location.ubicacionId === null) {
    return ancestors;
  }

  ancestors.push(location.ubicacionId);

  return getAncestors(location.ubicacionId, ancestors);
}

export { createUbicacion, getUbicacion, updateUbicacion };
