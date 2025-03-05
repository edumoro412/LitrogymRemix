// eslint-disable-next-line import/no-unresolved
import db from "~/db.server";

// Función para agregar un ejercicio a favoritos
export const toggleEjercicioFavorito = async (
  userId: string,
  ejercicioId: string
) => {
  const favoritoExistente = await db.userEjercicio.findUnique({
    where: {
      userId_ejercicioId: {
        userId,
        ejercicioId,
      },
    },
  });

  if (favoritoExistente) {
    await db.userEjercicio.delete({
      where: {
        userId_ejercicioId: {
          userId,
          ejercicioId,
        },
      },
    });
  } else {
    await db.userEjercicio.create({
      data: {
        userId,
        ejercicioId,
      },
    });
  }
};
