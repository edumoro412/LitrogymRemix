import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import db from "../db.server";
import { getSession } from "~/services/session";
import { getRutinasByUser } from "~/services/user.services";
import { useState } from "react";
import ModalCrearRutina from "../Componentes/ModalCrearRutina";

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

// Obtener todas las rutinas del usuario
export async function loader({ request }: { request: Request }) {
  const ejerciciosDisponibles = await db.ejercicio.findMany();
  //Obtenemos el usuarioId
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return redirect("/login");
  }
  const rutinas: Routine[] = await getRutinasByUser(userId);

  return json({ rutinas, ejerciciosDisponibles });
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");

  if (actionType === "create") {
    const nombre = formData.get("nombre");
    const ejercicios = JSON.parse(formData.get("ejercicios") as string || "[]");

    try {
      const nuevaRutina = await db.rutina.create({
        data: {
          nombre,
          userId: userId,
          ejercicios: {
            connect: ejercicios.map((id: string) => ({ id })),
          },
        },
      });

      return json({ success: true, rutina: nuevaRutina });
    } catch (error) {
      console.error("Error creando rutina:", error);
      return json({ error: "Error al crear rutina" }, { status: 500 });
    }
  }
  if (actionType === "delete") {
    const rutinaId = formData.get("rutinaId");
    if (typeof rutinaId === "string") {
      await db.rutina.delete({ where: { id: rutinaId } });
    }
    return json({ success: true });
  }
  return null;
}


export default function Rutina() {
  const { rutinas, ejerciciosDisponibles } = useLoaderData<{ rutinas: Routine[]; ejerciciosDisponibles: { id: string; nombre: string }[] }>();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState<Routine | null>(null);

  return (
    <>
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
      <div className="p-6">

        <h1 className="text-2xl font-bold text-white">Tus Rutinas</h1>
        <div className="p-5 justify-between items-center bg-blue-500">
          <ul className=" flex flex-row  mt-4">
            {rutinas.map((rutina) => (
              <li key={rutina.id} className="basis-auto m-4 p-4 border rounded">
                <h2 className="text-xl">{rutina.nombre}</h2>
                <p>{rutina.ejercicios.length} ejercicios</p>
                <div>
                  <ul>
                    {rutina.ejercicios.map((ejercicio) => (
                      <li key={ejercicio.id}>{ejercicio.nombre}</li>
                    ))}
                  </ul>
                </div>

                <Form method="post">
                  <input type="hidden" name="rutinaId" value={rutina.id} />
                  <button type="submit" name="_action" value="delete" className="text-white bg-slate-600 rounded-md p-3 hover:bg-red-500">
                    Eliminar
                  </button>
                </Form>
                <Form method="post">
                  <input type="hidden" name="rutinaId" value={rutina.id} />
                  <button type="submit" name="_action" value="verRutina" className="text-white bg-slate-600 rounded-md p-3 hover:bg-green-500">
                    Ver Rutina
                  </button>
                </Form>
                <button className="text-white bg-slate-600 rounded-md p-3 hover:bg-orange-500" onClick={() => {
                  setRutinaSeleccionada(rutina);
                  setModalAbierto(true);
                }}>
                  Editar Rutina
                </button>
              </li>
            ))}
          </ul>


        </div>


        <button onClick={() => setModalAbierto(true)} className="my-4 p-2 bg-blue-500 text-white rounded">
          Crear Rutina
        </button>


        {modalAbierto && <ModalCrearRutina isOpen={modalAbierto} onClose={() => {
          setModalAbierto(false);
          setRutinaSeleccionada(null); // Limpia los datos al cerrar
        }} ejerciciosDisponibles={ejerciciosDisponibles} />}


      </div>
    </>
  );
}
