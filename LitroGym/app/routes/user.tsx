import { useState } from "react"; // Importar useState para manejar el estado local
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { EditIcon, SaveIcon } from "~/services/icons";
// eslint-disable-next-line import/no-unresolved
import { getSession, commitSession, destroySession } from "~/services/session";
// eslint-disable-next-line import/no-unresolved
import {
  BorrarUsuario,
  CambiarNombre,
  EjerciciosFavoritos,
  // eslint-disable-next-line import/no-unresolved
} from "~/services/user.services";

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

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const userId = session.get("userId");
  console.log(userId);

  const formData = await request.formData();
  const action = formData.get("action")?.toString();

  if (action === "borrarCuenta") {
    await BorrarUsuario(userId);
    await destroySession(session);
    return redirect("/Logout", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    const newUserName = formData.get("newUserName")?.toString().toLowerCase();

    if (!newUserName) {
      return { error: "El nombre no puede estar vacío" };
    }

    const result = await CambiarNombre(newUserName, userId);

    session.set("userName", newUserName);

    return redirect("/user", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export default function UserDashboard() {
  const data = useLoaderData<{
    userName: string;
    ejerciciosFavoritos: Awaited<ReturnType<typeof EjerciciosFavoritos>>;
  }>();

  const { userName: initialUserName, ejerciciosFavoritos = [] } = data || {};

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(initialUserName);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  return (
    <div
      className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center relative text-white"
      style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
    >
      <div className="bg-gradient-to-b from-black/30 to-black w-full h-full absolute top-0 left-0"></div>

      <div className="bg-black bg-opacity-70 w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] h-[80%] flex flex-col justify-evenly items-center p-6 rounded-3xl shadow-2xl relative z-10">
        <Form
          method="post"
          className="w-full flex justify-start gap-4"
          reloadDocument
        >
          <button
            type="submit"
            className="bg-red-800 py-2 px-4 sm:py-1 sm:px-2 rounded-lg hover:bg-red-700  hover:scale-105 active:scale-95 text-sm sm:text-xs md:text-sm"
            name="action"
            value="borrarCuenta"
          >
            Borrar Cuenta
          </button>

          <a
            href="/settings.app"
            className="px-6 py-3 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-primary-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-primary)")
            }
            onClick={() => (window.location.href = "settings.app")}
          >
            Ajustes
          </a>
        </Form>
        <h2 className="text-center text-3xl sm:text-2xl font-bold text-gray-100 m-4">
          <span className="flex items-center justify-center gap-2">
            {isEditing ? (
              <Form
                method="post"
                reloadDocument
                className="flex items-center justify-center w-full"
              >
                <p className="text-white">¡Hola, </p>
                <input
                  type="text"
                  value={userName}
                  onChange={handleNameChange}
                  name="newUserName"
                  className="bg-transparent border-b-2 border-white text-white focus:outline-none text-center w-1/2 sm:w-2/3 md:w-1/2"
                />
                <button
                  type="submit"
                  className="text-white text-xs sm:text-sm md:text-base"
                >
                  <SaveIcon />
                </button>
              </Form>
            ) : (
              <>
                {userName ? `¡Hola, ${userName.toUpperCase()}!` : ""}
                <button
                  onClick={handleEditClick}
                  className="focus:outline-none"
                >
                  <EditIcon />
                </button>
              </>
            )}
          </span>
        </h2>

        <button
          className="bg-red-600 py-2 px-4 sm:py-1 sm:px-2 rounded-3xl w-[50%] text-white font-semibold text-lg sm:text-base hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105"
          onClick={() => (window.location.href = "Logout")}
        >
          Cerrar sesión
        </button>

        <h2 className="m-4 text-xl sm:text-lg md:text-xl">
          Tus ejercicios favoritos
        </h2>
        <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none">
          {ejerciciosFavoritos.length > 0 ? (
            ejerciciosFavoritos.map((ejercicio) => (
              <li
                key={ejercicio.ejercicioId}
                className="border-2 border-gray-300 rounded-md p-4 w-full sm:w-[calc(100%-2rem)] flex-none snap-center h-fit md:w-96 mx-auto"
              >
                <h1 className="text-xl sm:text-lg md:text-2xl text-center font-extrabold first-letter:uppercase">
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
            <p className="text-center text-gray-300 sm:text-sm md:text-base">
              No tienes ejercicios favoritos aún.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
