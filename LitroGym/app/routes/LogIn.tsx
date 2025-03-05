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
  if (session.get("userName")) {
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
    if (!userId) {
      return json(
        { success: false, error: "Email o contraseña incorrectos" },
        { status: 400 }
      );
    }
    const cookieHeader = request.headers.get("cookie");
    const session = await getSession(cookieHeader);
    session.set("userId", userId.id);
    session.set("userName", userId.name);
    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch {
    return json(
      { success: false, error: "Error en la autenticación" },
      { status: 500 }
    );
  }
};

export default function LogIn() {
  const fetcher = useFetcher<{ success: boolean; error?: string }>();
  const [type, setType] = useState("password");

  return (
    <div
      className="h-screen flex items-center justify-center bg-black bg-cover bg-center text-white relative"
      style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-500/50 to-black"></div>

      <div className="relative bg-black bg-opacity-70 w-[90%] max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl text-center font-bold mb-6">INICIAR SESIÓN</h2>

        <fetcher.Form method="post" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full p-2 rounded-lg text-black text-lg mt-1"
            />
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-lg">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={type}
                name="contrasena"
                id="contrasena"
                required
                className="w-[90%] p-2 rounded-lg text-black text-lg pr-12 mt-1"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onMouseDown={() => setType("text")}
                onMouseUp={() => setType("password")}
                onMouseLeave={() => setType("password")}
              >
                {type === "text" ? <Ojo /> : <OjoCerrado />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 hover:bg-blue-700 text-xl rounded-lg"
          >
            Enviar
          </button>

          <p className="text-center mt-4">
            ¿No tienes cuenta?{" "}
            <Link
              to="/Registro"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Regístrate aquí
            </Link>
          </p>

          {fetcher.state === "submitting" && (
            <p className="text-blue-500 text-center">Iniciando sesión...</p>
          )}
          {fetcher.data && !fetcher.data.success && (
            <p className="text-red-500 text-center">
              Error: {fetcher.data.error}
            </p>
          )}
        </fetcher.Form>
      </div>
    </div>
  );
}
