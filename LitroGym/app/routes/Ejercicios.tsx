import { Ejercicio } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { todosEjercicios } from "~/models/ejercicio.server";
// eslint-disable-next-line import/no-unresolved
import { ConLike, SearchIcon, SinLike } from "~/services/icons";
// eslint-disable-next-line import/no-unresolved
import { getSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const ejercicios = await todosEjercicios(search);

  return json({ data: ejercicios, userId });
};

export default function Ejercicios() {
  const { data, userId } = useLoaderData<{
    data: Ejercicio[];
    userId: string | undefined;
  }>();
  const [searchParams] = useSearchParams();
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-custom-color flex flex-col items-center justify-start min-h-screen">
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
                onClick={handleClick}
              >
                {liked ? <ConLike /> : <SinLike />}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
