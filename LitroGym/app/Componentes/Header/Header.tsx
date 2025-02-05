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

  return (
    <div
      className="flex w-full h-[15vh] text-[130%] justify-between items-center"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "white",
      }}
    >
      {/* Logo */}
      <div className="flex items-center h-full pl-4">
        <img
          src="/imgs/logo.png"
          alt="Logo"
          id="logo"
          className="h-full w-auto"
        />
        <p className="text-[190%] ml-4">
          <b>LITROGYM</b>
        </p>
      </div>

      {/* Navegación */}
      <div className="flex h-full w-1/2 justify-around">
        <Link to="/">
          <button
            className="w-28 h-full flex items-center justify-center text-[70%] rounded-md transition-all duration-300"
            style={{
              backgroundColor: "var(--color-primary)", // Fondo predeterminado
              color: "white",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-primary-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-primary)")
            }
          >
            HOME
          </button>
        </Link>
        {!userId ? (
          <Link to="LogIn">
            <button
              className="w-28 h-full flex items-center justify-center text-[70%] rounded-md transition-all duration-300"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-primary-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              INICIA SESION
            </button>
          </Link>
        ) : (
          <Link to="LogIn">
            <button
              className="w-28 h-full flex flex-col items-center justify-center text-[70%] rounded-md transition-all duration-300"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-primary-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              <UserIcon />
              <span>{userName?.toUpperCase()}</span>
            </button>
          </Link>
        )}
        <Link to="QuienesSomos">
          <button
            className="w-28 h-full flex items-center justify-center text-[70%] rounded-md transition-all duration-300"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-primary-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-primary)")
            }
          >
            ¿QUIENES SOMOS?
          </button>
        </Link>
        <button
          className="w-28 h-full flex items-center justify-center text-[70%] rounded-md transition-all duration-300"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-primary-light)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-primary)")
          }
          onClick={ScrollFooter}
        >
          CONTACTO
        </button>
      </div>
    </div>
  );
}
