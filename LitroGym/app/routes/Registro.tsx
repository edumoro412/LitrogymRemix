import { useFetcher } from "@remix-run/react";

import { ActionFunction, json, redirect } from "@remix-run/node";
// eslint-disable-next-line import/no-unresolved
import { createUser } from "~/services/user.services"; // Asegúrate de que la función `createUser` esté exportada correctamente

export const action: ActionFunction = async ({ request }) => {
  // Recibimos los datos del formulario
  const formData = new URLSearchParams(await request.text());
  const name = formData.get("name")!;
  const email = formData.get("email")!;
  const password = formData.get("password")!;

  try {
    // Intentamos crear el usuario
    const user = await createUser(name, email, password);

    if (!user) {
      return json(
        {
          success: false,
          error: "Hubo un problema al crear el usuario.",
        },
        { status: 500 }
      );
    }

    // Si el usuario se crea correctamente, lo redirigimos al login
    return redirect("/login");
  } catch (error) {
    console.error(error);

    // En caso de error, mostramos el mensaje adecuado
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
    <div className="registro">
      <b className="registro-titulo">CREA TU CUENTA</b>
      <div className="registro-contenedor">
        {/* Usamos fetcher.Form en lugar de un <form> estándar */}
        <fetcher.Form
          method="post"
          action="/registro"
          className="registro-formulario"
        >
          <div className="registro-grupoinput">
            <label htmlFor="correo">
              <p>Correo electrónico: </p>
            </label>
            <input type="email" id="correo" name="email" required />
          </div>

          <div className="registro-grupoinput">
            <label htmlFor="nombre">
              <p>Nombre: </p>
            </label>
            <input type="text" id="nombre" name="name" required />
          </div>

          <div className="registro-grupoinput">
            <label htmlFor="contrasena">
              <p>Contraseña: </p>
            </label>
            <input type="password" id="contrasena" name="password" required />
          </div>

          <button type="submit" className="registro-boton">
            Enviar
          </button>
        </fetcher.Form>

        {/* Mostrar mensajes en función de la respuesta del servidor */}
        {fetcher.data && fetcher.data.success && (
          <p className="success-message">
            Usuario creado correctamente. Redirigiendo al login...
          </p>
        )}
        {fetcher.data && !fetcher.data.success && (
          <p className="error-message">Error: {fetcher.data.error}</p>
        )}
      </div>
    </div>
  );
}
