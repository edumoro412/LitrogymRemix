import argon2 from "argon2";

import db from "../db.server";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await argon2.hash(password);

  // Crear el usuario en la base de datos
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export function BorrarUsuario(id_user: string) {
  return db.user.delete({
    where: {
      id: id_user,
    },
  });
}

export function CambiarNombre(nombre: string | undefined, id_user: string) {
  return db.user.update({
    where: {
      id: id_user,
    },
    data: {
      name: nombre,
    },
  });
}
export function getUser(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function getUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export function ChangeName(name: string, id: string) {
  return db.user.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function AuthenticateUser(
  email: string,
  password: string
): Promise<{ id: string; name: string } | null> {
  const user = await getUser(email);

  if (!user || !(await argon2.verify(user.password, password))) {
    return null;
  }

  return { id: user.id, name: user.name };
}

export async function EjerciciosFavoritos(userId: string) {
  return db.userEjercicio.findMany({
    where: {
      userId,
    },
    include: {
      ejercicio: true,
    },
  });
}

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

