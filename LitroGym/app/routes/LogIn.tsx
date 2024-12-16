import { Link } from "@remix-run/react";
export default function LogIn() {
  return (
    <>
      <div className="login">
        <b className="login-titulo">INICIAR SESIÓN</b>
        <div className="login-contenedor">
          <form className="login-formulario">
            <div className="login-grupoinput">
              <label htmlFor="usuario">
                <p>Correo electrónico: </p>
              </label>
              <br />
              <input type="email" name="usuario" id="usuario" required />
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
          </form>
        </div>
      </div>
    </>
  );
}
