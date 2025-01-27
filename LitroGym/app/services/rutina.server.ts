import db from "~/db.server";

export async function crearRutina(
  nombre: string,
  usuarioId: string,
  ejercicios: string[]
) {
  return await db.rutina.create({
    data: {
      userId: usuarioId,
      ejercicios: {
        connect: ejercicios.map((id) => ({ id })),
      },
    },
  });
}

export async function obtenerRutinas(usuarioId: string) {
  return await db.rutina.findMany({
    where: { userId: usuarioId },
    include: {
      ejercicios: true,
    },
  });
}
