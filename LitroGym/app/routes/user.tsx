import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { getSession } from "~/services/session";
// eslint-disable-next-line import/no-unresolved
import { EjerciciosFavoritos } from "~/services/user.services";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const userName = session.get("userName");
  const userId = session.get("userId");

  if (!userName) {
    return redirect("/LogIn", 302);
  }

  const ejerciciosFavoritos = await EjerciciosFavoritos(userId);
  return { userName, ejerciciosFavoritos };
};

export default function UserDashboard() {
  const data = useLoaderData<{
    userName: string;
    ejerciciosFavoritos: Awaited<ReturnType<typeof EjerciciosFavoritos>>;
  }>();

  const { userName, ejerciciosFavoritos = [] } = data || {};

  return (
    <div
      className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center relative text-white"
      style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
    >
      <div className="bg-gradient-to-b from-black/30 to-black w-full h-full absolute top-0 left-0"></div>

      <div className="bg-black bg-opacity-70 w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[60vw] h-[80%] flex flex-col justify-evenly items-center p-6 rounded-3xl shadow-2xl relative z-10">
        <h2 className="text-center text-4xl font-bold text-gray-100 m-4">
          {userName ? `¡Hola, ${userName.toUpperCase()}!` : ""}
        </h2>

        <button
          className="bg-red-600 py-3 px-6 rounded-3xl w-[50%] text-white font-semibold text-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105"
          onClick={() => (window.location.href = "Logout")}
        >
          Cerrar sesión
        </button>

        <h2 className="m-4">Tus ejercicios favoritos</h2>
        <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none">
          {ejerciciosFavoritos.length > 0 ? (
            ejerciciosFavoritos.map((ejercicio) => (
              <li
                key={ejercicio.ejercicioId}
                className="border-2 border-gray-300 rounded-md p-4 w-[calc(100vw-2rem)] flex-none snap-center h-fit md:w-96 mx-auto"
              >
                <h1 className="text-2xl text-center font-extrabold first-letter:uppercase">
                  {ejercicio.ejercicio.nombre}
                </h1>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full my-2"
                  src={`/vids/${ejercicio.ejercicio.video}`}
                >
                  Tu navegador no soporta la reproducción de videos.
                </video>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-300">
              No tienes ejercicios favoritos aún.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
