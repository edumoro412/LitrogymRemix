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
