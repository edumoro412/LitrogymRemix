import { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "./Componentes/Header/Header";
import Footer from "./Componentes/Footer/Footer";
// eslint-disable-next-line import/no-unresolved
import styles from "~/tailwind.css";

//Esto es para cambiar el titulo de la pestaña, se pone en root para que el titulo se mantenga en todas las pestañas.
export const meta: MetaFunction = () => {
  return [{ title: "LITROGYM" }];
};

export const links: LinksFunction = () => [
  { rel: "icon", href: "/imgs/logoIcon.png" }, // Esta línea es para poner el logo en la pestaña
  { rel: "shortcut icon", href: "/imgs/logoIcon.png" },
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: "/Styles/home.css" },
  { rel: "stylesheet", href: "Styles/Footer.css" },
  { rel: "stylesheet", href: "Styles/LogIn.css" },
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
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
