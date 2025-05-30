import React, { useEffect, useState } from "react";
import { ActivityActions } from "../reducers/activity-reducers";

interface Activity {
  id: string;
  service: string;
  client: string;
  plates?: string;
  startTime?: number;
  price?: number;
}

interface ActivityListProps {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>; // Updated to use ActivityActions directly
}

function ActivityList({ activities, dispatch }: ActivityListProps) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateCost = (startTime: number | undefined) => {
    if (!startTime) return 0;
    const elapsedSeconds = (currentTime - startTime) / 1000;
    const ratePerHour = 20; // Tarifa por hora
    return Math.ceil((elapsedSeconds / 3600) * ratePerHour);
  };

  const formatTime = (startTime: number | undefined) => {
    if (!startTime) return "00:00:00";
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="bg-white p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-5">Historial de Actividades</h2>
      {activities.length === 0 ? (
        <p className="text-gray-500">No hay actividades registradas.</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="border border-gray-300 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">Servicio: {activity.service}</p>
                <p>Cliente: {activity.client}</p>
                {activity.service === "Estacionamiento" && (
                  <>
                    <p>Placas: {activity.plates}</p>
                    <p>Tiempo: {formatTime(activity.startTime)}</p>
                    <p>Costo: ${calculateCost(activity.startTime)}</p>
                  </>
                )}
                {activity.service !== "Estacionamiento" && (
                  <p>Precio: ${activity.price}</p>
                )}
              </div>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_ACTIVITY", payload: activity.id }) // Updated to use UUID
                }
                className="text-red-600 font-bold"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivityList;
