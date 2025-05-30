import { useReducer, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons"; // Ícono de auto
import Form from "./Complements/Form";
import { activityReducer, initialState, ActivityActions } from "./reducers/activity-reducers";
import ActivityList from "./Complements/ActivityList";
import "./index.css"; // Tailwind CSS y estilos personalizados

function App() {
  const savedState = JSON.parse(localStorage.getItem("activitiesState") || "null");
  const [state, dispatch] = useReducer(activityReducer, savedState || initialState);

  useEffect(() => {
    localStorage.setItem("activitiesState", JSON.stringify(state));
  }, [state]);

  return (
    <div className="relative min-h-screen bg-gradient overflow-hidden">
      {/* Contenido principal */}
      <header className="relative z-10 bg-gradient-to-r from-blue-600 to-green-500 py-4 flex items-center justify-center shadow-lg">
        <h1 className="text-4xl font-bold text-white uppercase flex items-center gap-2">
          <FontAwesomeIcon icon={faCar} /> {/* Ícono de auto */}
          Estacionamiento
        </h1>
      </header>

      <main className="relative z-10">
        <section className="bg-gray-100 bg-opacity-80 py-10 px-5">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
            <Form dispatch={dispatch} state={state} />
          </div>
        </section>

        <section className="p-10 mx-auto max-w-4xl">
          <ActivityList activities={state.activities} dispatch={dispatch as React.Dispatch<ActivityActions>} />
        </section>
      </main>
    </div>
  );
}

export default App;
