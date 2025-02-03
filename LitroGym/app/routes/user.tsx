import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Link, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { Ojo, OjoCerrado } from "~/services/icons";
// eslint-disable-next-line import/no-unresolved
import { commitSession, getSession } from "~/services/session";
import {
  AuthenticateUser,
  EjerciciosFavoritos,
  // eslint-disable-next-line import/no-unresolved
} from "~/services/user.services";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const userName = session.get("userName");
  const userId = session.get("userId");
  const ejerciciosFavoritos = await EjerciciosFavoritos(userId);
  return { userName, ejerciciosFavoritos };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("contrasena") as string;

  try {
    const userId = await AuthenticateUser(email, password);

    if (userId == null) {
      return json(
        { success: false, error: "La contraseña o el email son incorrectos" },
        { status: 400 }
      );
    }

    const cookieHeader = request.headers.get("cookie");
    const session = await getSession(cookieHeader);
    session.set("userId", userId.id);
    session.set("userName", userId.name);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return json(
      { success: false, error: "Hubo un error durante la autenticación" },
      { status: 500 }
    );
  }
};

export default function LogIn() {
  const fetcher = useFetcher<{ success: boolean; error?: string }>();
  const { userName, ejerciciosFavoritos } = useLoaderData<{
    userName: string | undefined;
    ejerciciosFavoritos: Awaited<ReturnType<typeof EjerciciosFavoritos>>;
  }>();
  const [type, setType] = useState("password");

  function setInputType(type: string) {
    setType(type);
  }

  if (userName == undefined) {
    return (
      <div
        className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-evenly relative text-white"
        style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
      >
        <div className="bg-gradient-to-b from-gray-500/50 to-black w-full h-full absolute top-0 left-0"></div>

        <div className="bg-black bg-opacity-65 w-[90vw] sm:w-[70vw] md:w-[40vw] lg:w-[30vw] h-[60%] flex flex-col justify-around items-center p-4 rounded-2xl shadow-xl relative">
          <b className="text-center text-3xl my-2">INICIAR SESIÓN</b>

          <fetcher.Form method="post" className="flex flex-col w-full">
            <div className="mb-4">
              <label htmlFor="email" className="text-xl">
                Correo electrónico:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full mt-2 p-2 rounded-lg text-black text-lg"
              />
            </div>

            <label htmlFor="contrasena" className="text-xl">
              Contraseña:
            </label>
            <div className="flex w-full ">
              <input
                type={type}
                name="contrasena"
                id="contrasena"
                required
                className=" absolute w-[90%] mt-2 p-2 rounded-lg text-black text-lg pr-12"
              />
              <button
                type="button"
                className=" relative p-2 "
                onMouseDown={() => setInputType("text")}
                onMouseUp={() => setInputType("password")}
                onMouseLeave={() => setInputType("password")}
              >
                {type === "text" ? <Ojo /> : <OjoCerrado />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-6 p-3 text-white text-xl rounded-lg bg-blue-500 hover:bg-blue-700"
            >
              Enviar
            </button>

            <p className="text-center mt-4">
              ¿No tienes cuenta?{" "}
              <Link to="/Registro">
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  Regístrate aquí
                </button>
              </Link>
            </p>

            {fetcher.state === "submitting" && (
              <p className="text-blue-500 text-center mt-4">
                Iniciando sesión...
              </p>
            )}

            {fetcher.data && !fetcher.data.success && (
              <p className="text-red-500 text-center mt-4">
                Error: {fetcher.data.error}
              </p>
            )}
          </fetcher.Form>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center relative text-white"
        style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
      >
        <div className="bg-gradient-to-b from-black/30 to-black w-full h-full absolute top-0 left-0"></div>

        <div className="bg-black bg-opacity-70 w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[60vw] h-[80%] flex flex-col justify-evenly items-center p-6 rounded-3xl shadow-2xl relative z-10">
          <h2 className="text-center text-4xl font-bold text-gray-100 m-4">
            ¡Hola, {userName.toUpperCase()}!
          </h2>

          <button
            className="bg-red-600 py-3 px-6 rounded-3xl w-[50%] text-white font-semibold text-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105"
            onClick={() => (window.location.href = "Logout")}
          >
            Cerrar sesión
          </button>

          <h3>Tus ejercicios favoritos</h3>
          <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none">
            {ejerciciosFavoritos.map((ejercicio) => (
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
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
