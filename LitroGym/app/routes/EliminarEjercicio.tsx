import {
  Form,
  useActionData,
  useNavigation,
  useLoaderData,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import prisma from "~/db.server";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import fs from "fs";
import path from "path";
import { getSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }

  const ejercicios = await prisma.ejercicio.findMany({
    where: {
      userId: userId,
    },
  });

  return json({ ejercicios });
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return json(
      { error: "Debes iniciar sesión para eliminar un ejercicio" },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const ejercicioId = formData.get("ejercicioId") as string;

  if (!ejercicioId) {
    return json(
      { error: "ID del ejercicio no proporcionado" },
      { status: 400 }
    );
  }

  const ejercicio = await prisma.ejercicio.findUnique({
    where: { id: ejercicioId },
  });

  if (!ejercicio) {
    return json({ error: "Ejercicio no encontrado" }, { status: 404 });
  }

  if (ejercicio.video) {
    const videoPath = path.join(
      process.cwd(),
      "public",
      "vids",
      ejercicio.video
    );
    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
  }

  try {
    await prisma.ejercicio.delete({
      where: { id: ejercicioId },
    });
    return json({ success: true });
  } catch (error) {
    console.error("Error al eliminar el ejercicio:", error);
    return json({ error: "Error al eliminar el ejercicio" }, { status: 500 });
  }
};

export default function DeleteExercise() {
  const { ejercicios } = useLoaderData<{
    ejercicios: Array<{ id: string; nombre: string; video: string }>;
  }>();
  const actionData = useActionData<{ error?: string; success?: boolean }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div
      className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center relative text-white"
      style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
    >
      <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Eliminar Ejercicio
        </h1>
        <Form method="post" className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Selecciona un ejercicio para eliminar:
            </label>
            <select
              name="ejercicioId"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un ejercicio</option>
              {ejercicios.map((ejercicio) => (
                <option key={ejercicio.id} value={ejercicio.id}>
                  {ejercicio.nombre}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {isSubmitting ? "Eliminando..." : "Eliminar Ejercicio"}
          </button>
        </Form>
        {actionData?.error && (
          <p className="mt-4 text-center text-red-500">{actionData.error}</p>
        )}
        {actionData?.success && (
          <p className="mt-4 text-center text-green-500">
            Ejercicio eliminado correctamente.
          </p>
        )}
      </div>
    </div>
  );
}
