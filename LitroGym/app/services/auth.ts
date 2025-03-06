import { getSession } from "./session";

export async function getUserFromSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) return null;

  return { id: userId }; // Devuelve un objeto con el ID del usuario autenticado
}
