import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer
      className="footer mt-8 py-4 h-fit flex flex-col md:flex-row items-center md:items-start justify-between px-8 md:px-16 "
      style={{
        backgroundColor: "var(--color-primary)", // Fondo predeterminado
        color: "white",
      }}
    >
      <div className="footer-content">
        <div className="footer-content-left">
          <strong className="footer-content-title">LITROGYM</strong>
          <p>Entrenamiento personal, nutrición y mucho más</p>
          <p>C. Romero, 2, 28221 Majadahonda, Madrid</p>
          <strong className="footer-content-title">Datos de contacto</strong>
          <p>litrocontacto@gmail.com</p>
          <strong>+34 91 234 56 78</strong>
        </div>

        <div className="footer-content-right">
          <Link to="/" className="a-footer">
            Home
          </Link>
          <Link to="LogIn" className="a-footer">
            Iniciar Sesión
          </Link>
          <Link to="Registro" className="a-footer">
            Registro
          </Link>
          <Link to="QuienesSomos" className="a-footer">
            ¿Quiénes somos?
          </Link>
          <Link to="Alimentacion" className="a-footer">
            Alimentación
          </Link>
          <Link to="Rutina" className="a-footer">
            Rutina
          </Link>
          <Link to="BuscarEjercicios" className="a-footer">
            Buscar Ejercicios
          </Link>
        </div>
      </div>
    </footer>
  );
}
