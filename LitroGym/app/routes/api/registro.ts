import { createUser } from "../../services/user.services"; // Para crear un usuario

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return JSON.stringify({ error: "Todos los campos son obligatorios" });
  }

  try {
    await createUser(name, email, password);
    return JSON.stringify({ success: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    return JSON.stringify({ error: "Error al crear el usuario" });
  }
}
