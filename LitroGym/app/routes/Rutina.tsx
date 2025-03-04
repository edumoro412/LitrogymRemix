import { useState, useEffect } from "react";
import { Form, useActionData } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { crearRutina } from "../services/user.services";
import { getUserId } from "../services/session";

type Ejercicio = {
  id: string;
  nombre: string;
};

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = await getUserId(request);
  const ejerciciosIds = formData.getAll("ejercicios");

  if (!userId) {
    return json({ error: "No estás autenticado" }, { status: 401 });
  }

  try {
    await crearRutina(userId, ejerciciosIds as string[]);
    return redirect("/rutinas");
  } catch (error) {
    return json({ error: "Error al crear la rutina" }, { status: 500 });
  }
};

export default function Rutina() {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const actionData = useActionData<ActionData>();

  useEffect(() => {
    async function cargarEjercicios() {
      const response = await fetch("/api/ejercicios");
      const data: Ejercicio[] = await response.json();
      setEjercicios(data);
    }
    cargarEjercicios();
  }, []);

  return (
    <>
      <div className="rutina">
        <div className="rutina-titulo">
          <p>
            <b>RUTINA SEMANAL DE ENTRENO</b>
          </p>
        </div>
        <Form method="post">
          <label htmlFor="ejercicios">Selecciona Ejercicios:</label>
          <ul>
            {ejercicios.map((ejercicio) => (
              <li key={ejercicio.id}>
                <input type="checkbox" name="ejercicios" value={ejercicio.id} id={ejercicio.id} />
                <label htmlFor={ejercicio.id}>{ejercicio.nombre}</label>
              </li>
            ))}
          </ul>
          {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
          <button type="submit">Crear Rutina</button>
        </Form>
      </div>
    </>
  );
}
