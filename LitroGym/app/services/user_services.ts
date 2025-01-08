import db from "../db.server";
import argon2 from "argon2";

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const hashedPassword = await argon2.hash(password);
  return db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
}
