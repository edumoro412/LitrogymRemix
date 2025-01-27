import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { themeCookie } from "../services/cookie";
import { validateForm } from "../services/validation";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const theme = await themeCookie.parse(cookieHeader);

  return { theme: typeof theme === "string" ? theme : "black" };
}

const themeSchema = z.object({
  theme: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  return validateForm(
    formData,
    themeSchema,
    async ({ theme }) =>
      json(
        { theme },
        {
          headers: {
            "Set-Cookie": await themeCookie.serialize(theme),
          },
        }
      ),
    (errors) => json({ errors }, { status: 400 })
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
            backgroundColor: "var(--color-primary)", // Fondo dinámico
            color: "white", // Texto blanco para buen contraste
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-primary-light)")
          } // Hover dinámico
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-primary)")
          } // Volver al color original
        >
          Save
        </button>
      </div>
    </Form>
  );
}
