import { useFetcher } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
// eslint-disable-next-line import/no-unresolved
import { createUser } from "~/services/user.services";

export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const name = formData.get("name")!;
  const email = formData.get("email")!;
  const password = formData.get("password")!;

  try {
    const user = await createUser(name, email, password);
    if (!user) {
      return json(
        { success: false, error: "Hubo un problema al crear el usuario." },
        { status: 500 }
      );
    }
    return redirect("/login");
  } catch (error) {
    return json(
      {
        success: false,
        error: "Ya existe una cuenta asociada a este correo electrónico.",
      },
      { status: 400 }
    );
  }
};

export default function Registro() {
  const fetcher = useFetcher<{
    success: boolean;
    user?: { name: string };
    error?: string;
  }>();

  return (
    <div
      className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-evenly relative text-white"
      style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
    >
      <div className="bg-gradient-to-b from-gray-500/50 to-black w-full h-full absolute top-0 left-0"></div>

      <div className="bg-black bg-opacity-65 w-[90vw] sm:w-[70vw] md:w-[40vw] lg:w-[30vw] h-[60%] flex flex-col justify-around items-center p-4 rounded-2xl shadow-xl relative">
        <b className="text-center text-3xl my-2">CREA TU CUENTA</b>

        <fetcher.Form
          method="post"
          action="/registro"
          className="flex flex-col w-full"
        >
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

          <div className="mb-4">
            <label htmlFor="name" className="text-xl">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full mt-2 p-2 rounded-lg text-black text-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-xl">
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full mt-2 p-2 rounded-lg text-black text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-3 text-white text-xl rounded-lg bg-blue-500 hover:bg-blue-700"
          >
            Enviar
          </button>
        </fetcher.Form>

        {fetcher.data && fetcher.data.success && (
          <p className="text-green-500 text-center mt-4">
            Usuario creado correctamente. Redirigiendo al login...
          </p>
        )}
        {fetcher.data && !fetcher.data.success && (
          <p className="text-red-500 text-center mt-4">
            Error: {fetcher.data.error}
          </p>
        )}
      </div>
    </div>
  );
}
