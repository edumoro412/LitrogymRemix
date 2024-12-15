import { LinksFunction } from "@remix-run/node";
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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "Styles/tailwind.css" },
  { rel: "stylesheet", href: " /Styles/Header.css" },
  { rel: "stylesheet", href: "/Styles/home.css" },
  { rel: "stylesheet", href: "Styles/Footer.css" },
  { rel: "stylesheet", href: "Styles/LogIn.css" },
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
