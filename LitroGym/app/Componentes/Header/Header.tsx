import { Link } from "@remix-run/react";

export default function Header() {
  function ScrollFooter() {
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  }
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

          <button className="header-boton" onClick={ScrollFooter}>
            CONTACTO
          </button>
        </div>
      </div>
    </>
  );
}
