import { redirect, useFetcher } from "@remix-run/react";
import { useState } from "react";
import { ActionFunction, json } from "@remix-run/node";
// eslint-disable-next-line import/no-unresolved
import { createUser } from "~/services/user.services";

export const action: ActionFunction = async ({ request }) => {
  //Basicamente obtiene los datos del formulario
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    //Aqui se crea al usuario

    const user = await createUser(name, email, password);
    if (!user) {
      throw new Error("No se pudo crear el usuario."); // Lanza un error si `user` es null o undefined.
    }
    return redirect("/login");
  } catch (error) {
    console.error("Error general:", error); // Esto ayudará a identificar errores generales.
    return json({
      success: false,
      error: "El correo ya tiene una cuenta asociada",
    });
  }
};

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetcher = useFetcher<{
    success: boolean;
    user?: { name: string };
    error?: string;
  }>();

  //El fetcher envia los datos del formulario al /registro, para que  se haga el action. Si quisiesemos usar un action en otro fichero, pondriamos la ruta de ese fichero
  const handleRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    fetcher.submit(
      { name, email, password },
      { method: "post", action: "/registro" }
    );
  };

  return (
    <div className="registro">
      <b className="registro-titulo">CREA TU CUENTA</b>
      <div className="registro-contenedor">
        <form className="registro-formulario" onSubmit={handleRegistro}>
          <div className="registro-grupoinput">
            <label htmlFor="correo">
              <p>Correo electrónico: </p>
            </label>
            <input
              type="email"
              id="correo"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="registro-grupoinput">
            <label htmlFor="nombre">
              <p>Nombre: </p>
            </label>
            <input
              type="text"
              id="nombre"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="registro-grupoinput">
            <label htmlFor="contrasena">
              <p>Contraseña: </p>
            </label>
            <input
              type="password"
              id="contrasena"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="registro-boton">
            Enviar
          </button>
        </form>

        {fetcher.data && fetcher.data.success && fetcher.data.user && (
          <p>Usuario creado correctamente: {fetcher.data.user.name}</p>
        )}
        {fetcher.data && !fetcher.data.success && (
          <p>Error: {fetcher.data.error}</p>
        )}
      </div>
    </div>
  );

  //El fetcher.data es la respuesta que se obtiene del action, devuelve principalmente dos parametros. El parametro succes que es true or false, y el parámetro user, que contiene todos los parametros del usuario creado. En este caso seria user{name:____, email:_____, contraseña:_____}. Si fetcher devolviese un error tambien devolveria un parametro error.
}
