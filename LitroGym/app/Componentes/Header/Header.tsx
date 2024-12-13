import { Link } from "@remix-run/react";

// import "../Header/Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="header-leftheader">
          <img src="/imgs/logo.png" alt="Logo" id="logo" />
          <p className="header-name">
            <b>LITROGYM</b>
          </p>
        </div>
        <div className="header-rightheader">
          <Link to="/">
            <button className="header-boton">HOME</button>
          </Link>
          <Link to="LogIn">
            <button className="header-boton">INICIAR SESIÓN</button>
          </Link>
          <Link to="QuienesSomos">
            <button className="header-boton">¿QUIENES SOMOS?</button>
          </Link>
          <Link to="Contacto">
            <button className="header-boton">CONTACTO</button>
          </Link>
        </div>
      </div>
    </>
  );
}
