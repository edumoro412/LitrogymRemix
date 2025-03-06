import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { getSession } from "~/services/session";
import { EjerciciosFavoritos } from "~/services/user.services";
import { getRutinasByUser, crearRutina, eliminarRutina } from "~/services/rutina.services";

type FavoriteEjercicio = {
  ejercicio: {
    id: string;
    nombre: string;
  };
};

type Routine = {
  id: string;
  nombre: string;
  ejercicios: { id: string; nombre: string }[];
};

type LoaderData = {
  userId: string;
  favoritos: FavoriteEjercicio[];
  rutinas: Routine[];
};

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return redirect("/login");
  }
  const favoritos = await EjerciciosFavoritos(userId);
  const rutinas = await getRutinasByUser(userId);
  return json<LoaderData>({ userId, favoritos, rutinas });
};

type ActionData = {
  error?: string;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  // Si se envía deleteId, se eliminará la rutina
  const deleteId = formData.get("deleteId");
  if (deleteId && typeof deleteId === "string") {
    await eliminarRutina(deleteId);
    return redirect("/rutina");
  }
  // Si no, se crea una nueva rutina
  const nombre = formData.get("nombre");
  const ejercicioIds = formData.getAll("ejercicioIds");
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");
  if (!userId || !nombre || typeof nombre !== "string" || ejercicioIds.length === 0) {
    return json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }
  await crearRutina(userId, nombre, ejercicioIds as string[]);
  return redirect("/rutina");
};

export default function Rutina() {
  const { favoritos, rutinas } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();

  return (
    <div className="rutina-container">
      <div className="rutina">
        <div className="rutina-titulo">
          <p>
            <b>RUTINA SEMANAL DE ENTRENO</b>
          </p>
        </div>
        <div className="rutina-imagen" id="d1"></div>
        <div className="rutina-imagen" id="d2"></div>
        <div className="rutina-imagen" id="d3"></div>
        <div className="rutina-imagen" id="d4"></div>
        <div className="rutina-imagen" id="d5"></div>
      </div>
      <div className="crear-rutina">
        <h2>Crear Nueva Rutina</h2>
        <Form method="post" className="crear-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre de la rutina:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <fieldset className="form-group">
            <legend>Selecciona Ejercicios Favoritos:</legend>
            {favoritos.length === 0 ? (
              <p>No tienes ejercicios favoritos.</p>
            ) : (
              <div className="ejercicios-list">
                {favoritos.map((fav) => (
                  <label key={fav.ejercicio.id} className="checkbox-label">
                    <input type="checkbox" name="ejercicioIds" value={fav.ejercicio.id} />
                    {fav.ejercicio.nombre}
                  </label>
                ))}
              </div>
            )}
          </fieldset>
          <button type="submit" className="btn">Crear Rutina</button>
          {actionData?.error && <p className="error">{actionData.error}</p>}
        </Form>
      </div>
      <div className="lista-rutinas">
        <h3>Rutinas Creadas</h3>
        {rutinas.length === 0 ? (
          <p>No has creado rutinas aún.</p>
        ) : (
          <ul>
            {rutinas.map((r) => (
              <li key={r.id} className="rutina-item">
                <span className="rutina-nombre">{r.nombre}</span>
                {r.ejercicios && r.ejercicios.length > 0 && (
                  <span className="rutina-ejercicios"> - {r.ejercicios.map((e) => e.nombre).join(", ")}</span>
                )}
                <Form method="post" className="delete-form">
                  <input type="hidden" name="deleteId" value={r.id} />
                  <button type="submit" className="btn delete-btn">Eliminar</button>
                </Form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
