import { Ejercicio } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { todosEjercicios } from "~/models/ejercicio.server";
// eslint-disable-next-line import/no-unresolved
import { SearchIcon } from "~/services/icons";

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const ejercicios = await todosEjercicios(search);
  return json(ejercicios);
};

export default function Ejercicios() {
  const data = useLoaderData<Ejercicio[]>();
  const [searchParams] = useSearchParams();

  return (
    <div className="bg-custom-color flex flex-col items-center justify-start min-h-screen">
      <form className="flex border-2 my-4 border-gray-300 rounded-md mt-2 focus-within:border-green-600 md:w-80 mx-auto">
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

      {/* Lista de ejercicios centrada */}
      <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none">
        {data.map((ejercicio: Ejercicio) => (
          <li
            key={ejercicio.id}
            className="border-2 border-gray-300 rounded-md p-4 w-[calc(100vw-2rem)] flex-none snap-center h-fit md:w-96 mx-auto"
          >
            <h1 className="text-2xl text-center font-extrabold first-letter:uppercase">
              {ejercicio.nombre}
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );
}
