import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { themeCookie } from "../services/cookie";
import { validateForm } from "../services/validation";
import prisma from "~/db.server";
import { getSession } from "~/services/session";
import { getUserFromSession } from "../services/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return json({ theme: "black" }); // Tema por defecto si no hay usuario autenticado
  }

  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { color: true },
  });

  return json({ theme: userData?.color ?? "black" });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");
  const formData = await request.formData();
  const theme = formData.get("theme") as string;

  if (!theme) {
    return json({ errors: { theme: "El tema es requerido" } }, { status: 400 });
  }

  // Actualizar el color en la base de datos
  await prisma.user.update({
    where: { id: userId },
    data: { color: theme },
  });

  return json(
    { theme },
    {
      headers: {
        "Set-Cookie": await themeCookie.serialize(theme), // Guardar también en la cookie
      },
    }
  );
}

export default function SettingApp() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<{ theme?: string }>();

  return (
    <Form reloadDocument method="post">
      <div
        className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-evenly relative text-black"
        style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
      >
        <label
          htmlFor="theme"
          className="px-4 py-2 text-white font-semibold text-md rounded-md shadow-md transition-all duration-300"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
          }}
        >
          Tema
        </label>
        <select
          id="theme"
          name="theme"
          className="p-2 mt-2 border-2 border-black-200 rounded-md
          w-full md:w-64"
          defaultValue={actionData?.theme ?? data.theme}
        >
          <option value="red">Rojo</option>
          <option value="orange">Naranja</option>
          <option value="yellow">Amarillo</option>
          <option value="green">Verde</option>
          <option value="blue">Azul</option>
          <option value="purple">Morado</option>
          <option value="black">Negro</option>
        </select>
        <button
          className="px-6 py-3 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
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
          Save
        </button>
      </div>
    </Form>
  );
}
