import { Link } from "@remix-run/react";
export default function Alimentacion() {
  return (
    <>
      <div className="alimentacion">
        <div className="alimentacion-contenedor">
          <b className="alimentacion-titulo">RECETAS</b>
          <div className="alimentacion-contenedor-contenido">
            <Link to="Receta1">
              <button>· Recetas con pechuga de pollo o pavo</button>
            </Link>
            <Link to="Receta2">
              <button>· Recetas con otras carnes o queso</button>
            </Link>
            <Link to="Receta3">
              <button>· Recetas con pescado</button>
            </Link>
            <Link to="Receta4">
              <button>· Recetas veganas</button>
            </Link>
            <Link to="Receta5">
              <button>· Recetas de postres proteicos</button>
            </Link>
            <Link to="Receta6">
              <button>· Recetas en airfryer</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
