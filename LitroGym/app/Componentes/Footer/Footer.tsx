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
          <b>
            <p className="footer-content-title">LITROGYM</p>
          </b>
          <p>Entrenamiento personal, nutrición y mucho más</p>
          <p>C. Romero, 2, 28221 Majadahonda, Madrid</p>
          <b>
            <p className="footer-content-title">Datos de contacto</p>
          </b>
          <p>litrocontacto@gmail.com</p>
          <b>
            <p>+34 91 234 56 78</p>
          </b>
        </div>
        <div className="footer-content-right">
          <Link to="/" className="a-footer">
            <button className="footer-boton">
              <p>Home</p>
            </button>
          </Link>
          <Link to="LogIn" className="a-footer">
            <button className="footer-boton">
              <p>Iniciar Sesión</p>
            </button>
          </Link>

          <button className="footer-boton">
            <p>Registro</p>
          </button>
          <Link to="QuienesSomos" className="a-footer">
            <button className="footer-boton">
              <p>¿Quiénes somos?</p>
            </button>
          </Link>

          <button className="footer-boton">
            <p>Alimentación</p>
          </button>
          <button className="footer-boton">
            <p>Rutina</p>
          </button>
          <button className="footer-boton">
            <p>Buscar Ejercicios</p>
          </button>
        </div>
      </div>
    </div>
  );
}
