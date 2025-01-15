import { Link, useLoaderData } from "@remix-run/react";
import { UserIcon } from "../../services/icons";

export default function Header() {
  const { userId, userName } = useLoaderData<{
    userId: string | undefined;
    userName: string | undefined;
  }>();

  function ScrollFooter() {
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (userId === undefined) {
    return (
      <>
        <div className=" bg-black flex w-full h-[15vh] text-white text-[130%] flex-row justify-start">
          <div className=" flex w-1/2 items-center justify-start">
            <img
              src="/imgs/logo.png"
              alt="Logo"
              id="logo"
              className="h-full w-auto"
            />
            <p className="text-[190%] ml-[5%]">
              <b>LITROGYM</b>
            </p>
          </div>
          <div className=" flex w-1/2 justify-around">
            <Link to="/">
              <button className=" text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa]">
                HOME
              </button>
            </Link>
            <Link to="LogIn">
              <button className=" text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa]">
                INICIA SESION
              </button>
            </Link>
            <Link to="QuienesSomos">
              <button className="text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa]">
                ¿QUIENES SOMOS?
              </button>
            </Link>

            <button
              className="text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa]"
              onClick={ScrollFooter}
            >
              CONTACTO
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className=" bg-black flex w-full h-[15vh] text-white text-[130%] flex-row justify-start">
          <div className=" flex w-1/2 items-center justify-start">
            <img
              src="/imgs/logo.png"
              alt="Logo"
              id="logo"
              className="h-full w-auto"
            />
            <p className="text-[190%] ml-[5%]">
              <b>LITROGYM</b>
            </p>
          </div>
          <div className=" flex w-1/2 justify-around">
            <Link to="/">
              <button className=" text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa]">
                HOME
              </button>
            </Link>

            <Link to="QuienesSomos">
              <button className="text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa]">
                ¿QUIENES SOMOS?
              </button>
            </Link>

            <button
              className="text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#aaaaaa]"
              onClick={ScrollFooter}
            >
              CONTACTO
            </button>

            <Link to="LogIn">
              <button className="text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#ff4f4f] flex flex-col justify-center items-center">
                <UserIcon />
                <span>{userName?.toUpperCase()}</span>
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
