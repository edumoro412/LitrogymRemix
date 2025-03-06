// app/routes/ejercicios/new.tsx
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import prisma from "~/db.server"; // Asegúrate de tener configurado tu cliente de Prisma
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
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  const formData = await request.formData();
  const nombre = formData.get("nombre") as string;
  const musculo = formData.get("musculo") as string;
  const videoFile = formData.get("video") as File | null;
  const esGeneral = formData.get("esGeneral") === "on"; // Verifica si el checkbox está marcado

  // Validación básica
  if (!nombre || !musculo) {
    return json(
      { error: "Nombre y músculo son campos requeridos" },
      { status: 400 }
    );
  }

  // Guardar el archivo de video si existe
  let videoPath = "";
  if (videoFile) {
    const uploadDir = path.join(process.cwd(), "public", "vids");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    videoPath = `${videoFile.name}`;
    const fileBuffer = await videoFile.arrayBuffer();
    fs.writeFileSync(
      path.join(uploadDir, videoFile.name),
      Buffer.from(fileBuffer)
    );
  }

  // Crear el ejercicio en la base de datos
  try {
    await prisma.ejercicio.create({
      data: {
        nombre,
        musculo,
        video: videoPath || "",
        userId: esGeneral ? null : userId, // Asociar el ejercicio al usuario o dejarlo como general
      },
    });
    return redirect("/ejercicios"); // Redirige a la lista de ejercicios
  } catch (error) {
    console.error("Error al crear el ejercicio:", error);
    return json({ error: "Error al crear el ejercicio" }, { status: 500 });
  }
};

export default function AddExercise() {
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div
      className="bg-black bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center relative text-white"
      style={{ backgroundImage: 'url("/imgs/fotoFondo.jpg")' }}
    >
      <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Añadir Ejercicio
        </h1>
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre:</label>
            <input
              type="text"
              name="nombre"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del ejercicio"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Músculo:</label>
            <input
              type="text"
              name="musculo"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Músculo trabajado"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Video (MP4):
            </label>
            <input
              type="file"
              name="video"
              accept=".mp4"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="esGeneral"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-300">
              ¿Es un ejercicio general?
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? "Añadiendo..." : "Añadir Ejercicio"}
          </button>
        </Form>
        {actionData?.error && (
          <p className="mt-4 text-center text-red-500">{actionData.error}</p>
        )}
      </div>
    </div>
  );
}
