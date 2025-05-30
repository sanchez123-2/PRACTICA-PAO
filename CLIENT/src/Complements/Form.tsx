import { useState } from "react";
import { Dispatch } from "react";
import { ActivityActions } from "../reducers/activity-reducers";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: any; // Ajusta el tipo según la estructura de `state` en `App.tsx`
};

function Form({ dispatch }: FormProps) {
  const [nombre, setNombre] = useState("");
  const [placas, setPlacas] = useState("");
  const [auto, setAuto] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    };

    try {
      const response = await fetch("http://localhost:4000/api/clients/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el cliente");
      }

      const data = await response.json();
      console.log("Cliente guardado exitosamente:", data);
      setMessage("Datos guardados correctamente");
      dispatch({ type: "ADD_ACTIVITY", payload: newActivity });
      setNombre("");
      setPlacas("");
      setAuto("");
      setColor("");
    } catch (error) {
      console.error(error);
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