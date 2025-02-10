import { Link } from "@remix-run/react";
import { UserIcon } from "../../services/icons";

interface HeaderProps {
  userId?: string;
  userName?: string;
}

export default function Header({ userId, userName }: HeaderProps) {
  function ScrollFooter() {
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className="bg-black flex w-full h-[15vh] text-white flex-row justify-between px-4 overflow-x-hidden box-border">
      <div className="flex items-center">
        <img
          src="/imgs/logo.png"
          alt="Logo"
          className="h-16 sm:h-20 md:h-full w-auto max-w-full"
        />
        <p className="text-xl md:text-[190%] ml-2 hidden md:block">
          <b>LITROGYM</b>
        </p>
      </div>

      <div className="flex justify-around items-center gap-4 flex-shrink-0">
        <Link to="/" className="block w-full h-full">
          <button className="text-sm sm:text-base md:text-lg border-0 text-white bg-black h-full px-4 hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa] flex items-center justify-center">
            HOME
          </button>
        </Link>

        {!userId && (
          <Link to="/login" className="block w-full h-full">
            <button className="text-sm sm:text-base md:text-lg border-0 text-white bg-black h-full px-4 hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa] flex items-center justify-center">
              INICIA SESION
            </button>
          </Link>
        )}

        <Link to="/quienessomos" className="block w-full h-full">
          <button className="text-sm sm:text-base md:text-lg border-0 text-white bg-black h-full px-4 hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa] flex items-center justify-center">
            ¿QUIENES SOMOS?
          </button>
        </Link>

        <button
          className="text-sm sm:text-base md:text-lg border-0 text-white bg-black h-full px-4 hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa] flex items-center justify-center"
          onClick={ScrollFooter}
        >
          CONTACTO
        </button>

        {userId && (
          <Link to="/user" className="block w-full h-full">
            <button className="text-sm sm:text-base md:text-lg border-0 text-white bg-black h-full px-4 hover:bg-[#232323] hover:border-b-2 hover:border-[#ff4f4f] flex flex-col justify-center items-center">
              <UserIcon />
              <span className="text-xs sm:text-sm md:text-base">
                {userName?.toUpperCase()}
              </span>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
