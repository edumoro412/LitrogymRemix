import db from "../db.server";

// Obtengotodas las rutinas de un usuario
export async function getRutinasByUser(userId: string) {
  return db.rutina.findMany({
    where: { userId },
    include: {
      ejercicios: true, // Incluyo los ejercicios asociados a la rutina
    },
  });
}

// Crear una nueva rutina
export async function crearRutina(userId: string, nombre: string, ejercicioIds: string[]) {
  return db.rutina.create({
    data: {
      nombre,
      user: { connect: { id: userId } },
      ejercicios: {
        connect: ejercicioIds.map((id) => ({ id })), // Conecto los ejercicios seleccionados
      },
    },
  });
}

// Elimino una rutina por su ID
export async function eliminarRutina(rutinaId: string) {
  return db.rutina.delete({
    where: { id: rutinaId },
  });
}