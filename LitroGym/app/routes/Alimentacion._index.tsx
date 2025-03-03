import { Link } from "@remix-run/react";

export default function Alimentacion() {
  return (
    <div className="alimentacion">
      <div className="alimentacion-contenedor">
        <b className="alimentacion-titulo">RECETAS</b>
        <div className="alimentacion-contenedor-contenido">
          <Link to="/alimentacion/pollo-pavo">
            <button>· Recetas con pechuga de pollo o pavo</button>
          </Link>
          <Link to="/alimentacion/otras-carnes-queso">
            <button>· Recetas con otras carnes o queso</button>
          </Link>
          <Link to="/alimentacion/pescado">
            <button>· Recetas con pescado</button>
          </Link>
          <Link to="/alimentacion/veganas">
            <button>· Recetas veganas</button>
          </Link>
          <Link to="/alimentacion/postres">
            <button>· Recetas de postres proteicos</button>
          </Link>
          <Link to="/alimentacion/airfryer">
            <button>· Recetas en airfryer</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
