import { useEffect, useState } from "react";
import { Form } from "@remix-run/react";

interface ModalEditSettingsProps {
    onClose: () => void;
}

export default function ModalEditSettings({ onClose }: ModalEditSettingsProps) {
    const [color, setColor] = useState("black");

    useEffect(() => {
        const root = document.documentElement;
        const color = getComputedStyle(root).getPropertyValue("--color-primary");
        setColor(color);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
        const root = document.documentElement;
        root.style.setProperty("--color-primary", e.target.value);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-10">
            <div className="bg-gray-300 p-6 rounded-lg w-3/4 max-w-lg">
                <h2 className="text-2xl mb-4 text-black">Editar Ajustes</h2>

                <Form method="post">
                    <input type="hidden" name="action" value="edit" />

                    <div className="mb-4">
                        <label htmlFor="theme" className="block text-black mb-2">Color del tema:</label>
                        <input
                            type="color"
                            id="theme"
                            name="theme"
                            value={color}
                            onChange={handleChange}
                            className="border p-1 w-full h-10"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className=" text-white p-2 rounded-lg hover:bg-blue-600"
                            style={{
                                backgroundColor: "var(--color-primary)",
                                color: "white",
                            }}
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}