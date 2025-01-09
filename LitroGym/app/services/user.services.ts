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

export async function AuthenticateUser(
  email: string,
  password: string
): Promise<boolean> {
  const user = await getUser(email);

  if (!user) {
    return false;
  }

  const isPasswordValid = await argon2.verify(user.password, password); //Aqui comparamos la contraseña que ha insertado con la del usuario en la base de datos

  return isPasswordValid;
}
