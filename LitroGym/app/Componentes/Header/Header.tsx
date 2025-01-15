import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { getSession } from "~/services/session";
// eslint-disable-next-line import/no-unresolved

export const loader: LoaderFunction = async ({ request }) => {
  // Obtén la sesión desde las cookies
  const cookieHeader = request.headers.get("Cookie");
  const session = await getSession(cookieHeader);

  // Obtén el userId de la sesión
  const userId = session.get("userId");
  const userName = session.get("userName");

  // Mostrar el userId en el servidor
  console.log("Valor de userId en la sesión:", userId);
  console.log("Valor de userName en la sesión:", userName);

  return json({ userId, userName });
};

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
              <button className=" text-[70%] border-0 text-white bg-black h-full w-auto p-[30px] hover:bg-[#232323] hover:border-b-2 hover:border-[#ff4f4f]">
                {userName}
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
