import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Header from "./Componentes/Header/Header";
import Footer from "./Componentes/Footer/Footer";
import { getSession } from "./services/session";
// eslint-disable-next-line import/no-unresolved
import "/styles/tailwind.css";

import prisma from "~/db.server";
import { getTheme } from "~/services/theme";

//Esto es para cambiar el titulo de la pestaña, se pone en root para que el titulo se mantenga en todas las pestañas.
export const meta: MetaFunction = () => {
  return [{ title: "LITROGYM" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const session = await getSession(cookieHeader);

  const userId = session.get("userId");
  const userName = session.get("userName");

  console.log("Valor de userId en la sesión:", userId);
  console.log("Valor de userName en la sesión:", userName);

  let userColor = "black"; // Color por defecto

  if (userId) {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: { color: true },
    });

    userColor = userData?.color ?? "black";
  }

  const theme = getTheme(userColor);

  const data = `
  :root {
    --color-primary: ${theme.colorPrimary};
    --color-primary-light: ${theme.colorPrimaryLight};
  }
  `;
  return json({ userId, userName, data });
};

export const links: LinksFunction = () => [
  { rel: "icon", href: "/imgs/logoIcon.png" }, // Esta línea es para poner el logo en la pestaña
  { rel: "shortcut icon", href: "/imgs/logoIcon.png" },
  { rel: "stylesheet", href: "/Styles/home.css" },
  { rel: "stylesheet", href: "Styles/Footer.css" },
  { rel: "stylesheet", href: "Styles/Registro.css" },
  { rel: "stylesheet", href: "Styles/Alimentacion.css" },
  { rel: "stylesheet", href: "Styles/Rutina.css" },
  { rel: "stylesheet", href: "Styles/recetas.css" },
  { rel: "stylesheet", href: "Styles/QuienesSomos.css" },
  { rel: "stylesheet", href: "/theme.css?v=" + Date.now() },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { userId, userName } = useLoaderData<typeof loader>();

  return (
    <>
      <Header userId={userId} userName={userName} />
      <Outlet />
      <Footer />
    </>
  );
}
