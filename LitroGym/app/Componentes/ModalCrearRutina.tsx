import { useState } from "react";
import { Form } from "@remix-run/react";


interface ModalCrearRutinaProps {
    onClose: () => void;
    ejerciciosDisponibles: { id: string; nombre: string }[];
}

export default function ModalCrearRutina({ onClose, ejerciciosDisponibles }: ModalCrearRutinaProps) {
    const [nombre, setNombre] = useState("");
    const [seleccionados, setSeleccionados] = useState<string[]>([]);

    const toggleEjercicio = (id: string) => {
        setSeleccionados((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-3/4 max-w-lg">
                <h2 className="text-2xl mb-4">Crear Rutina</h2>

                <Form method="post" onSubmit={onClose}>
                    <input type="hidden" name="_action" value="create" />
                    <input
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre de la rutina"
                        className="border p-2 w-full mb-4"
                        required
                    />

                    <div className="mb-4">
                        <h3 className="text-lg">Escoja los ejercicios</h3>
                        <div className="flex flex-wrap gap-2">
                            {ejerciciosDisponibles.map((ejercicio) => (
                                <button
                                    type="button"
                                    key={ejercicio.id}
                                    onClick={() => toggleEjercicio(ejercicio.id)}
                                    className={`p-2 border rounded ${seleccionados.includes(ejercicio.id) ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                >
                                    {ejercicio.nombre}
                                </button>
                            ))}
                        </div>
                    </div>

                    <input type="hidden" name="ejercicios" value={JSON.stringify(seleccionados)} />

                    <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
                        Guardar Rutina
                    </button>
                    <button onClick={onClose} className="bg-red-500 text-white p-2 rounded w-full my-3">Cerrar</button>
                </Form>
            </div>
        </div>
    );
}
