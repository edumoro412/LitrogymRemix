import { ActionFunction } from "@remix-run/node";
import { Link, redirect, useFetcher } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { commitSession, getSession } from "~/services/session";
// eslint-disable-next-line import/no-unresolved
import { AuthenticateUser } from "~/services/user.services";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("contrasena") as string;

  try {
    const userId = await AuthenticateUser(email, password);

    if (!userId) {
      return { succes: false, error: "La contraseña es incorrecta" };
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("userEmail", email);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return {
      succes: false,
      error: "Hubo un error durante la autenticación",
    };
  }
};

export default function LogIn() {
  const fetcher = useFetcher<{ succes: boolean; error?: string }>();

  return (
    <div
      className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-evenly relative text-white"
      style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
    >
      <div className="bg-gradient-to-b from-gray-500/50 to-black w-full h-full absolute top-0 left-0"></div>

      <div className="bg-black bg-opacity-65 w-[35vw] h-[60%] flex flex-col justify-around items-center p-4 rounded-2xl shadow-xl relative">
        <b className="text-center text-3xl my-2">INICIAR SESIÓN</b>

        <form className="flex flex-col w-full" method="post">
          <div className="mb-4">
            <label htmlFor="email" className="text-xl">
              Correo electrónico:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-5/6 mt-2 p-2 rounded-lg text-black text-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena" className="text-xl">
              Contraseña:
            </label>
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              required
              className="w-5/6 mt-2 p-2 rounded-lg text-black text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-1/2 mx-auto mt-6 p-3 text-white text-xl rounded-lg bg-blue-500 hover:bg-blue-700"
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

          {fetcher.data && !fetcher.data.succes && (
            <p className="text-red-500 text-center mt-4">
              Error: {fetcher.data.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
