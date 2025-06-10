import { useState } from "react";
import { Dispatch } from "react";
import { ActivityActions, ActivityState } from "../reducers/activity-reducers";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState; // Ajusta el tipo del estado
};

// Detecta entorno Docker o local automáticamente
const API_BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : "http://server:9090";

function Form({ dispatch }: FormProps) {
  const [nombre, setNombre] = useState("");
  const [placas, setPlacas] = useState("");
  const [auto, setAuto] = useState("");
  const [color, setColor] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !placas || !auto || !color || !apellido || !telefono) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    const newClient = {
      nombre,
      apellido,
      telefono,
      placas,
      auto,
      color,
    };

    const newActivity = {
      id: Date.now().toString(),
      category: 1, // Ejemplo de categoría
      name: nombre,
      service: "Estacionamiento",
      client: nombre,
      plates: placas,
      startTime: Date.now(),
      price: 0, // Precio por defecto
      calorias: 0, // Valor predeterminado para calorías
      auto,
      color,
      apellido,
      telefono,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/clients/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessages = errorResponse.errors.map((err: { msg: string }) => err.msg).join(", ");
        setMessage(`Error: ${errorMessages}`);
        return;
      }

      const data = await response.json();
      console.log("Cliente guardado exitosamente:", data);
      setMessage("Datos guardados correctamente");
      dispatch({ type: "ADD_ACTIVITY", payload: newActivity });
      setNombre("");
      setPlacas("");
      setAuto("");
      setColor("");
      setApellido("");
      setTelefono("");
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      setMessage("Error al guardar los datos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className={`p-4 rounded ${message.includes("Error") ? "bg-red-500" : "bg-green-500"} text-white`}>
          {message}
        </div>
      )}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre del Cliente
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
          Apellido del Cliente
        </label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
          Teléfono del Cliente
        </label>
        <input
          type="text"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="placas" className="block text-sm font-medium text-gray-700">
          Placas del Vehículo
        </label>
        <input
          type="text"
          id="placas"
          value={placas}
          onChange={(e) => setPlacas(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="auto" className="block text-sm font-medium text-gray-700">
          Tipo de Vehículo (Carro o Camioneta)
        </label>
        <input
          type="text"
          id="auto"
          value={auto}
          onChange={(e) => setAuto(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Color del Vehículo
        </label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Guardar
      </button>
    </form>
  );
}

export default Form;