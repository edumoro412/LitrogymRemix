import { Link } from "@remix-run/react";
export default function Alimentacion() {
  return (
    <>
      <div className="alimentacion">
        <b className="alimentacion-titulo">ALIMENTACION</b>
        <div className="alimentacion-contenedor">
          <div className="alimentacion-contenedor-contenido">
            <p id="titulo">Recetas:</p>
            <Link to="Receta1"><button>· Recetas con pechuga de pollo o pavo</button></Link>
            <Link to="Receta2"><button>· Recetas con otras carnes o queso</button></Link>
            <Link to="Receta3"><button>· Recetas con pescado</button></Link>
            <Link to="Receta4"><button>· Recetas veganas</button></Link>
            <Link to="Receta5"><button>· Recetas de postres proteicos</button></Link>
            <Link to="Receta6"><button>· Recetas en airfryer</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
