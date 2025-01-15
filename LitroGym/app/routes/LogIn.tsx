import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Link, redirect, useFetcher, useLoaderData } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { commitSession, getSession } from "~/services/session";
// eslint-disable-next-line import/no-unresolved
import { AuthenticateUser } from "~/services/user.services";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);

  const userName = session.get("userName");
  return { userName };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("contrasena") as string;

  try {
    const userId = await AuthenticateUser(email, password);

    // Si el usuario tiene la contraseña incorrecta o el email no se encuentra en la base de datos lanzará este error
    if (userId == null) {
      return json(
        { success: false, error: "La contraseña o el email son incorrectos" },
        { status: 400 }
      );
    }

    // Si el usuario es correcto
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
  const { userName } = useLoaderData<{ userName: string | undefined }>();

  if (userName == undefined) {
    return (
      <div
        className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-evenly relative text-white"
        style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
      >
        <div className="bg-gradient-to-b from-gray-500/50 to-black w-full h-full absolute top-0 left-0"></div>

        <div className="bg-black bg-opacity-65 w-[35vw] h-[60%] flex flex-col justify-around items-center p-4 rounded-2xl shadow-xl relative">
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
      <>
        <div
          className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center relative text-white"
          style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
        >
          <div className="bg-gradient-to-b from-black/30 to-black w-full h-full absolute top-0 left-0"></div>

          <div className="bg-black bg-opacity-70 w-[40vw] max-w-[450px] h-[50%] flex flex-col justify-evenly items-center p-6 rounded-3xl shadow-2xl relative z-10">
            <h2 className="text-center text-4xl font-bold text-gray-100 mb-4">
              ¡Hola, {userName.toUpperCase()}!
            </h2>

            <button
              className="bg-red-600 py-3 px-6 rounded-3xl w-[70%] text-white font-semibold text-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105"
              onClick={() => (window.location.href = "Logout")}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </>
    );
  }
}
