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

  return json({ userId, userName });
};

export const links: LinksFunction = () => [
  { rel: "icon", href: "/imgs/logoIcon.png" }, // Esta línea es para poner el logo en la pestaña
  { rel: "shortcut icon", href: "/imgs/logoIcon.png" },
  { rel: "stylesheet", href: "/Styles/home.css" },
  { rel: "stylesheet", href: "Styles/Footer.css" },
  { rel: "stylesheet", href: "Styles/Registro.css" },
  { rel: "stylesheet", href: "Styles/Alimentacion.css" },
  { rel: "stylesheet", href: "Styles/Rutina.css" },
  { rel: "stylesheet", href: "Styles/QuienesSomos.css" },
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
