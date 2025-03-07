import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import db from "~/db.server";

// Definir el tipo de los datos que recibimos
type LoaderData = {
    rutina: {
        nombre: string;
        ejercicios: { id: string; nombre: string; video: string }[];
    };
};

// Loader para recibir los ejercicios desde el query param
export const loader: LoaderFunction = async ({ params }) => {
    const nombreRutina = decodeURIComponent(params.nombre || "");

    console.log("Nombre de la rutina recibido:", nombreRutina);

    if (!nombreRutina) {
        throw new Response("No se envió el nombre de la rutina", { status: 400 });
    }

    // Buscar la rutina por nombre en la base de datos
    const rutina = await db.rutina.findFirst({
        where: { nombre: nombreRutina },
        include: { ejercicios: true },
    });

    if (!rutina) {
        throw new Response("Rutina no encontrada", { status: 404 });
    }

    return json({ rutina });
};

export default function VerRutina() {
    const { rutina } = useLoaderData<LoaderData>();

    return (
        <div className=" flex flex-col items-center justify-start min-h-screen bg-cover"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(175, 175, 175, 0.5), rgb(0, 0, 0)), url("/imgs/fotoFondo.jpg")`
            }}>
            <h1 className="text-3xl font-bold my-10">{rutina.nombre}</h1>
            <ul className="flex flex-wrap justify-center gap-8 overflow-x-auto mb-4 snap-x snap-mandatory md:snap-none">
                {rutina.ejercicios.map((ejercicio) => (
                    <li
                        key={ejercicio.id}
                        className="border-2 border-gray-300 rounded-md p-4 w-[calc(100vw-2rem)] flex-none snap-center h-fit md:w-96 mx-auto"
                    >
                        <h1 className="text-2xl text-center font-extrabold first-letter:uppercase text-white">
                            {ejercicio.nombre}
                        </h1>
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full my-2"
                            src={`/vids/${ejercicio.video}`}
                        >
                            Tu navegador no soporta la reproducción de videos.
                        </video>
                    </li>
                ))}
            </ul>
            <Link to="/Rutina" className="px-6 py-3 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 mb-5"
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
                }>
                Volver a mis rutinas
            </Link>

        </div>

    );
}
