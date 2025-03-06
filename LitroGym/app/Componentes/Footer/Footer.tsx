import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="mt-8 py-4 h-fit bg-gray-900 text-white flex flex-col md:flex-row items-center md:items-start justify-between px-8 md:px-16 ">
      {/* <div className="flex justify-center md:justify-start space-x-6 w-full md:w-1/3 mb-4 md:mb-0">
        <a
          href="https://www.instagram.com/s0ymelen/"
          className="text-white text-3xl hover:scale-110 transition-transform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-instagram"></i>
        </a>
        <a
          href="https://github.com/pitumola/LitroGym"
          className="text-white text-3xl hover:scale-110 transition-transform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github"></i>
        </a>
        <a
          href="https://open.spotify.com/playlist/37i9dQZF1DWYp5sAHdz27Y"
          className="text-white text-3xl hover:scale-110 transition-transform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-spotify"></i>
        </a>
      </div> */}

      <div className="flex flex-col md:flex-row justify-between w-full md:w-2/3 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2 space-y-2">
          <strong className="text-xl">LITROGYM</strong>
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
