import { Ejercicio as PrismaEjercicio } from "@prisma/client";

interface Ejercicio extends PrismaEjercicio {
  userId: string | null;
}
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { todosEjercicios } from "~/models/ejercicio.server";
// eslint-disable-next-line import/no-unresolved
import { ConLike, SearchIcon, SinLike } from "~/services/icons";
// eslint-disable-next-line import/no-unresolved
import { getSession } from "~/services/session";
// eslint-disable-next-line import/no-unresolved
import { toggleEjercicioFavorito } from "~/services/ejercicio.server";
// eslint-disable-next-line import/no-unresolved
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
    <div className="bg-custom-color flex flex-col items-center justify-start min-h-screen">
      {/* Botón para agregar ejercicio */}
      <div className="w-full flex justify-start p-4">
        <Link
          to="/AgregarEjercicio" // Ruta a la página de agregar ejercicio
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar Ejercicio
        </Link>
      </div>

      {/* Barra de búsqueda */}
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

      {/* Ejercicios generales */}
      <h2 className="text-2xl font-bold my-4">Ejercicios Generales</h2>
      <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none">
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

      {/* Ejercicios del usuario */}
      {userId && (
        <>
          <h2 className="text-2xl font-bold my-4">Mis Ejercicios</h2>
          <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none">
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
