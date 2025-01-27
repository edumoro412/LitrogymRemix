import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { obtenerRutinas } from "~/services/rutina.server";
import { getSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }

  const rutinas = await obtenerRutinas(userId);
  return json({ rutinas });
};

export default function ListarRutinas() {
  const { rutinas } = useLoaderData<{
    rutinas: {
      id: string;
      userId: string;
      ejercicios: { id: string; nombre: string }[];
    }[];
  }>();

  return (
    <div>
      <h1>Mis Rutinas</h1>
      <ul>
        {rutinas.map((rutina) => (
          <li key={rutina.id}>
            <h2>{rutina.id}</h2>
            <ul>
              {rutina.ejercicios.map((ejercicio) => (
                <li key={ejercicio.id}>{ejercicio.nombre}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
