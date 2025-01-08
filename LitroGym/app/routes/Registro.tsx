import { useState } from "react";

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        body: new URLSearchParams({ name, email, password }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.success);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Error inesperado");
    }
  };

  return (
    <div className="registro">
      <b className="registro-titulo">CREA TU CUENTA</b>
      <div className="registro-contenedor">
        <form
          className="registro-formulario"
          onSubmit={handleRegistro}
          method="POST"
        >
          <div className="registro-grupoinput">
            <label htmlFor="name">
              <p>Nombre: </p>
            </label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="registro-grupoinput">
            <label htmlFor="email">
              <p>Correo electrónico: </p>
            </label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="registro-grupoinput">
            <label htmlFor="password">
              <p>Contraseña: </p>
            </label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="registro-boton">
            Crear Cuenta
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
}
