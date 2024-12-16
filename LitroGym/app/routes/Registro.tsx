export default function Registro() {
  return (
    <div className="registro">
      <b className="registro-titulo">CREA TU CUENTA</b>
      <div className="registro-contenedor">
        <form className="registro-formulario">
          <div className="registro-grupoinput">
            <label htmlFor="correo">
              <p>Correo electrónico: </p>
            </label>
            <br />
            <input type="email" name="correo" id="correo" required />
          </div>

          <div className="registro-grupoinput">
            <label htmlFor="nombre">
              <p>Nombre: </p>
            </label>
            <br />
            <input type="text" name="nombre" id="nombre" required />
          </div>

          <div className="registro-grupoinput">
            <label htmlFor="contrasena">
              <p>Contraseña: </p>
            </label>
            <br />
            <input type="password" name="contrasena" id="contrasena" required />
          </div>

          <button type="submit" className="registro-boton">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
