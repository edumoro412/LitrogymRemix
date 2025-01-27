import { Ejercicio } from "@prisma/client";
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
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

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const ejercicios = await todosEjercicios(search);

  if (!userId) {
    // Si no hay userId (es decir, el usuario no está logueado), solo devolvemos los ejercicios
    return json({ data: ejercicios, userId, favoritosIds: [] });
  }

  const ejerciciosFavoritos = await EjerciciosFavoritos(userId);

  // favoritosIds lo que hace es recorrer todos los ejercicios que tiene el usuario guardados como favoritos y se queda solo con el id de esos ejercicios. Guardándolo en el array favoritosIds
  const favoritosIds = ejerciciosFavoritos.map(
    (favorito) => favorito.ejercicioId
  );

  return json({ data: ejercicios, userId, favoritosIds });
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
  const { data, userId, favoritosIds } = useLoaderData<{
    data: Ejercicio[];
    userId: string | undefined;
    favoritosIds: string[];
  }>();
  const [searchParams] = useSearchParams();

  // Utilizamos el método reduce para transformar el array favoritosIds en un objeto.
  // En cada iteración, tomamos el ejercicioId y lo agregamos como una clave en el objeto 'acc',
  // y le asignamos el valor 'true', indicando que el ejercicio es un favorito.

  // Primera iteración: 'acc' es un objeto vacío {}. 'ejercicioId' es "123". Se agrega '123' como clave en 'acc' y su valor es 'true', resultando en: acc = { "123": true }

  // Segunda iteración:'acc' es { "123": true }. 'ejercicioId' es "456". Se agrega '456' como clave en 'acc' y su valor es 'true', resultando en: acc = { "123": true, "456": true }

  const [liked, setLiked] = useState<Record<string, boolean>>(
    favoritosIds.reduce((acc, ejercicioId) => {
      if (typeof ejercicioId === "string") {
        acc[ejercicioId] = true;
      }
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleClick = async (ejercicioId: string, userId: string) => {
    //Esto lo que hace es hacer una solicitud al servidor. Enviamos los datos de userId y ejecicioId con el metodo post. Si todo va bien que lo sabemos mediane la propiedad ok, que lo que nos devielve es el codigo d estado, se llama a setLiked
    const response = await fetch("/ejercicios", {
      method: "POST",

      body: new URLSearchParams({
        userId,
        ejercicioId,
      }).toString(),
    });

    if (response.ok) {
      //Prev es la lista de todos los liked, entonces con el ...prev, le decimos que guarde todos y despues el que tenga el ejercicioId que se le pasa, lo que hace es cambiar el valor de true a false o al reves.

      setLiked((prev) => ({
        ...prev,
        [ejercicioId]: !prev[ejercicioId],
      }));
    } else {
      console.error("Error al actualizar el favorito");
    }
  };

  return (
    <div className="bg-custom-color flex flex-col items-center justify-start min-h-screen ">
      <form className="flex border-2 my-4 border-gray-300 rounded-md mt-2 focus-within:border-blue-600 md:w-80 mx-auto">
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
      </form>

      <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none">
        {data.map((ejercicio: Ejercicio) => (
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
    </div>
  );
}
