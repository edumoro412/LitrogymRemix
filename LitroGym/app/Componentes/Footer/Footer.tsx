import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-logos">
        <a
          href="https://www.instagram.com/s0ymelen/"
          className="footer-logos-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa">&#xf16d;</i>
        </a>
        <a
          href="https://github.com/pitumola/LitroGym"
          className="footer-logos-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
        <a
          href="https://open.spotify.com/playlist/37i9dQZF1DWYp5sAHdz27Y"
          className="footer-logos-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-spotify" aria-hidden="true"></i>
        </a>
      </div>
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
          <Link to="/" className="footer-boton">
            <span>Home</span>
          </Link>
          <Link to="LogIn" className="footer-boton">
            <span>Iniciar Sesión</span>
          </Link>
          <Link to="Registro" className="footer-boton">
            <span>Registro</span>
          </Link>
          <Link to="QuienesSomos" className="footer-boton">
            <span>¿Quiénes somos?</span>
          </Link>
          <Link to="Alimentacion" className="footer-boton">
            <span>Alimentación</span>
          </Link>
          <Link to="Rutina" className="footer-boton">
            <span>Rutina</span>
          </Link>
          <Link to="BuscarEjercicios" className="footer-boton">
            <span>Buscar Ejercicios</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
