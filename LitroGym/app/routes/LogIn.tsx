import { ActionFunction } from "@remix-run/node";
import { json, Link, redirect, useFetcher } from "@remix-run/react";
import { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { AuthenticateUser } from "~/services/user.services";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("contrasena") as string;

  try {
    const valido = await AuthenticateUser(email, password);

    if (valido) {
      return redirect("/");
    } else {
      return json({ succes: false, error: "La contraseña es incorrecta" });
    }
  } catch (error) {
    return json({ succes: false, error: "Hubo un error" });
  }
};
export default function LogIn() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const fetcher = useFetcher<{ succes: boolean; error?: string }>();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetcher.submit({ email, contrasena }, { method: "post", action: "/login" });
  };
  return (
    <>
      <div className="login">
        <b className="login-titulo">INICIAR SESIÓN</b>
        <div className="login-contenedor">
          <form className="login-formulario" onSubmit={handleLogin}>
            <div className="login-grupoinput">
              <label htmlFor="usuario">
                <p>Correo electrónico: </p>
              </label>
              <br />
              <input
                type="email"
                name="usuario"
                id="usuario"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-grupoinput">
              <label htmlFor="contrasena">
                <p>Contraseña: </p>
              </label>
              <br />
              <input
                type="password"
                name="contrasena"
                id="contrasena"
                required
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>

            <button type="submit" className="login-boton">
              Enviar
            </button>
            <p className="login-textoRegistro">
              ¿No tienes cuenta?
              <Link to="/Registro">
                <button type="button" className="login-boton-registro">
                  Regístrate aquí
                </button>
              </Link>
            </p>
            {fetcher.data && !fetcher.data.succes && (
              <p>Error: {fetcher.data.error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
