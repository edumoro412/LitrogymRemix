import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { getUserEmailFromSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const email = await getUserEmailFromSession(request);
  console.log(email);
  return { email };
};

export default function Header() {
  const email = useLoaderData() as string | null;

  function ScrollFooter() {
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  }

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
              {email ? "LOGOUT" : "LOG IN"}
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
      {email && <p>Bienvenido, {email}</p>}{" "}
      {/* Muestra el correo si está en la sesión */}
    </>
  );
}
