import {
  json,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { crearRutina } from "~/services/rutina.server";
import { todosEjercicios } from "~/services/ejercicio.server";
import { getSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }

  const ejercicios = await todosEjercicios();
  return json({ ejercicios, userId });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const nombre = formData.get("nombre") as string;
  const ejercicios = formData.getAll("ejercicios") as string[];
  const userId = formData.get("userId") as string;

  if (!nombre || !ejercicios.length) {
    return json({
      error: "El nombre y al menos un ejercicio son obligatorios.",
    });
  }

  await crearRutina(nombre, userId, ejercicios);
  return redirect("/rutinas");
};

export default function NuevaRutina() {
  const { ejercicios, userId } = useLoaderData<{
    ejercicios: { id: string; nombre: string }[];
    userId: string;
  }>();

  const actionData = useActionData<{ error?: string }>();

  return (
    <div>
      <h1>Crea una nueva rutina</h1>
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
      <Form method="post">
        <input type="hidden" name="userId" value={userId} />
        <label>
          Nombre de la rutina:
          <input type="text" name="nombre" required />
        </label>
        <fieldset>
          <legend>Selecciona ejercicios:</legend>
          {ejercicios.map((ejercicio) => (
            <label key={ejercicio.id}>
              <input type="checkbox" name="ejercicios" value={ejercicio.id} />{" "}
              {ejercicio.nombre}
            </label>
          ))}
        </fieldset>
        <button type="submit">Crear rutina</button>
      </Form>
    </div>
  );
}
