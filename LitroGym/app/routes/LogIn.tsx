import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Link, redirect, useFetcher } from "@remix-run/react";
import { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { Ojo, OjoCerrado } from "~/services/icons";
// eslint-disable-next-line import/no-unresolved
import { commitSession, getSession } from "~/services/session";
// eslint-disable-next-line import/no-unresolved
import { AuthenticateUser } from "~/services/user.services";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const userName = session.get("userName");

  if (userName) {
    return redirect("/");
  }

  return null;
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
  const [type, setType] = useState("password");

  function setInputType(type: string) {
    setType(type);
  }

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
          <div className="flex w-full">
            <input
              type={type}
              name="contrasena"
              id="contrasena"
              required
              className="absolute w-[90%] mt-2 p-2 rounded-lg text-black text-lg pr-12"
            />
            <button
              type="button"
              className="relative p-2"
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
}
