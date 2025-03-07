import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import db from "../db.server";
import { getSession } from "~/services/session";
import { getRutinasByUser } from "~/services/user.services";
import { useState } from "react";
import ModalCrearRutina from "../Componentes/ModalCrearRutina";
import { Ojo } from "../services/icons";

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

  if (actionType === "edit") {
    const rutinaId = formData.get("rutinaId");
    const nombre = formData.get("nombre");
    const ejercicios = JSON.parse(
      (formData.get("ejercicios") as string) || "[]"
    );

    try {
      await db.rutina.update({
        where: { id: rutinaId as string },
        data: {
          nombre: nombre as string,
          ejercicios: {
            set: ejercicios.map((id: string) => ({ id })),
          },
        },
      });

      return json({ success: true });
    } catch (error) {
      console.error("Error editando rutina:", error);
      return json({ error: "Error al editar rutina" }, { status: 500 });
    }
  }
  if (actionType === "create") {
    const nombre = formData.get("nombre");
    const ejercicios = JSON.parse(
      (formData.get("ejercicios") as string) || "[]"
    );

    try {
      const nuevaRutina = await db.rutina.create({
        data: {
          nombre: nombre as string,
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
  const { rutinas, ejerciciosDisponibles } = useLoaderData<{
    rutinas: Routine[];
    ejerciciosDisponibles: { id: string; nombre: string }[];
  }>();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState<Routine | null>(
    null
  );

  return (
    <>
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-start text-white py-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(175, 175, 175, 0.5), rgb(0, 0, 0)), url("/imgs/fotoFondo.jpg")`,
        }}
      >
        <div className="w-full mb-6">
          <p className="text-[250%] font-bold text-center">
            RUTINA SEMANAL DE ENTRENO
          </p>
        </div>

        <div className="w-full max-w-7xl px-4 sm:px-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rutinas.map((rutina) => (
              <li
                key={rutina.id}
                className="relative basis-auto m-4 bg-gray-900/90 border border-gray-800 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out min-h-[220px] w-full max-w-xs overflow-hidden"
              >
                {/* Header con nombre y botón de ver */}
                <div className="flex justify-between items-center p-3 bg-gray-900 border-b border-gray-800">
                  <h2 className="text-lg text-white font-semibold truncate pr-2">
                    {rutina.nombre}
                  </h2>
                  <Link to={`/VerRutina/${encodeURIComponent(rutina.nombre)}`}>
                    <button className="text-white bg-gray-700 rounded-full p-2 hover:bg-blue-600 transition-colors duration-300">
                      <Ojo className="w-5 h-5" />
                    </button>
                  </Link>
                </div>

                {/* Contenido de la rutina - ejercicios */}
                <div className="p-3 pb-16 text-white">
                  <p className="text-gray-400 mb-2">
                    {rutina.ejercicios.length} ejercicios
                  </p>
                  <ul className="space-y-1">
                    {rutina.ejercicios.map((ejercicio) => (
                      <li key={ejercicio.id} className="text-gray-300">
                        {ejercicio.nombre}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer con botones */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 bg-gray-900 border-t border-gray-800">
                  <Form method="post" className="w-1/2 pr-1">
                    <input type="hidden" name="rutinaId" value={rutina.id} />
                    <button
                      type="submit"
                      name="_action"
                      value="delete"
                      className="w-full text-white bg-gray-700 rounded-md py-2 px-3 hover:bg-red-600 transition-colors duration-300 text-sm"
                    >
                      Eliminar
                    </button>
                  </Form>
                  <button
                    className="w-1/2 pl-1 text-white bg-gray-700 rounded-md py-2 px-3 hover:bg-blue-600 transition-colors duration-300 text-sm"
                    onClick={() => {
                      setRutinaSeleccionada(rutina);
                      setModalAbierto(true);
                    }}
                  >
                    Editar Rutina
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => {
            setRutinaSeleccionada(null); // Para asegurarnos de que no hay datos cargados
            setModalAbierto(true);
          }}
          className="my-4 p-2  text-white rounded"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
          }}
        >
          Crear Rutina
        </button>

        {modalAbierto && (
          <ModalCrearRutina
            isOpen={modalAbierto}
            onClose={() => {
              setModalAbierto(false);
              setRutinaSeleccionada(null); // Limpia los datos al cerrar
            }}
            ejerciciosDisponibles={ejerciciosDisponibles}
            rutina={rutinaSeleccionada ?? undefined}
          />
        )}
      </div>
    </>
  );
}
