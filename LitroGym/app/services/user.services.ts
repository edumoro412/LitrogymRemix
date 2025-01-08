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
