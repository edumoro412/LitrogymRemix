import { Ejercicio as PrismaEjercicio } from "@prisma/client";

interface Ejercicio extends PrismaEjercicio {
  userId: string | null;
}
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";

import { todosEjercicios } from "~/models/ejercicio.server";
import { ConLike, SearchIcon, SinLike } from "~/services/icons";
import { getSession } from "~/services/session";
import { toggleEjercicioFavorito } from "~/services/ejercicio.server";
import { EjerciciosFavoritos } from "~/services/user.services";

import { Link } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  // Obtener todos los ejercicios (generales y del usuario)
  const ejercicios = await todosEjercicios(search);

  // Separar ejercicios generales y del usuario
  const ejerciciosGenerales = ejercicios.filter(
    (ejercicio: Ejercicio) => !ejercicio.userId
  );
  const ejerciciosUsuario = userId
    ? ejercicios.filter((ejercicio: Ejercicio) => ejercicio.userId === userId)
    : [];

  // Obtener los IDs de los ejercicios favoritos del usuario (si está logueado)
  let favoritosIds: string[] = [];
  if (userId) {
    const ejerciciosFavoritos = await EjerciciosFavoritos(userId);
    favoritosIds = ejerciciosFavoritos.map((favorito) => favorito.ejercicioId);
  }

  return json({
    ejerciciosGenerales,
    ejerciciosUsuario,
    userId,
    favoritosIds,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const userId = formData.get("userId");
  const ejercicioId = formData.get("ejercicioId");

  if (userId && ejercicioId) {
    await toggleEjercicioFavorito(userId, ejercicioId);
  }

  return json({ success: true });
};

export default function Ejercicios() {
  const { ejerciciosGenerales, ejerciciosUsuario, userId, favoritosIds } =
    useLoaderData<{
      ejerciciosGenerales: Ejercicio[];
      ejerciciosUsuario: Ejercicio[];
      userId: string | undefined;
      favoritosIds: string[];
    }>();
  const [searchParams] = useSearchParams();

  // Estado para manejar los "likes" (favoritos)
  const [liked, setLiked] = useState<Record<string, boolean>>(
    favoritosIds.reduce((acc, ejercicioId) => {
      if (typeof ejercicioId === "string") {
        acc[ejercicioId] = true;
      }
      return acc;
    }, {} as Record<string, boolean>)
  );

  // Función para manejar el clic en el botón de "like"
  const handleClick = async (ejercicioId: string, userId: string) => {
    const response = await fetch("/ejercicios", {
      method: "POST",
      body: new URLSearchParams({
        userId,
        ejercicioId,
      }).toString(),
    });

    if (response.ok) {
      setLiked((prev) => ({
        ...prev,
        [ejercicioId]: !prev[ejercicioId],
      }));
    } else {
      console.error("Error al actualizar el favorito");
    }
  };

  return (
    <div className=" flex flex-col items-center justify-start min-h-screen "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(175, 175, 175, 0.5), rgb(0, 0, 0)), url("/imgs/gymbg.jpg")`
      }}>
      <div className="w-full flex justify-between p-4">
        <Link
          to="/AgregarEjercicio"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar Ejercicio
        </Link>

        <Link
          to="/EliminarEjercicio"
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mx-3"
        >
          Eliminar Ejercicio
        </Link>

        {ejerciciosUsuario.length > 0 && (
          <button
            onClick={() => {
              const misEjerciciosSection =
                document.getElementById("mis-ejercicios");
              if (misEjerciciosSection) {
                misEjerciciosSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ml-auto"
          >
            Ir a Mis Ejercicios
          </button>
        )}
      </div>

      <Form className="flex border-2 my-4 border-gray-300 rounded-md mt-2 focus-within:border-blue-600 md:w-80 mx-auto">
        <button className="px-2">
          <SearchIcon />
        </button>
        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Busca ejercicios..."
          defaultValue={searchParams.get("search") ?? ""}
          className="w-full py-3 px-2 outline-none"
        />
      </Form>

      <h2 className="text-2xl font-bold my-4">Ejercicios Generales</h2>
      <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto mb-4 snap-x snap-mandatory md:snap-none">
        {ejerciciosGenerales.map((ejercicio) => (
          <li
            key={ejercicio.id}
            className="border-2 border-gray-300 rounded-md p-4 w-[calc(100vw-2rem)] flex-none snap-center h-fit md:w-96 mx-auto"
          >
            <h1 className="text-2xl text-center font-extrabold first-letter:uppercase">
              {ejercicio.nombre}
            </h1>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full my-2"
              src={`/vids/${ejercicio.video}`}
            >
              Tu navegador no soporta la reproducción de videos.
            </video>

            {userId && (
              <button
                className="w-full flex justify-center items-center"
                onClick={() => handleClick(ejercicio.id, userId)}
              >
                {liked[ejercicio.id] ? <ConLike /> : <SinLike />}
              </button>
            )}
          </li>
        ))}
      </ul>

      {userId && ejerciciosUsuario.length > 0 && (
        <>
          <h2 className="text-2xl font-bold my-4" id="mis-ejercicios">
            Mis Ejercicios
          </h2>
          <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none mb-4">
            {ejerciciosUsuario.map((ejercicio) => (
              <li
                key={ejercicio.id}
                className="border-2 border-gray-300 rounded-md p-4 w-[calc(100vw-2rem)] flex-none snap-center h-fit md:w-96 mx-auto"
              >
                <h1 className="text-2xl text-center font-extrabold first-letter:uppercase">
                  {ejercicio.nombre}
                </h1>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full my-2"
                  src={`/vids/${ejercicio.video}`}
                >
                  Tu navegador no soporta la reproducción de videos.
                </video>

                <button
                  className="w-full flex justify-center items-center"
                  onClick={() => handleClick(ejercicio.id, userId)}
                >
                  {liked[ejercicio.id] ? <ConLike /> : <SinLike />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
