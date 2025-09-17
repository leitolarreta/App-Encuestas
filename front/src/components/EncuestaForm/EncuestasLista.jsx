// src/components/encuestas/EncuestasLista.jsx



import React, { useState } from "react";
import LanzarEncuestaModal from "./LanzarEncuestaModal";

const EncuestasLista = ({
  encuestasExistentes,
  onSelectEncuesta,
  onEliminar,
  onLanzar,
}) => {
  const [lanzarVisible, setLanzarVisible] = useState(false);
  const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);

  const handleLanzar = (encuesta) => {
    setEncuestaSeleccionada(encuesta);
    setLanzarVisible(true);
  };

  const confirmarLanzamiento = (fechas) => {
    if (encuestaSeleccionada && onLanzar) {
      onLanzar({ ...encuestaSeleccionada, fechas });
      setLanzarVisible(false);
      setEncuestaSeleccionada(null);
    }
  };

  const encuestasBorrador = encuestasExistentes.filter(
    (e) => !e.fechaInicio && !e.fechaFin
  );
  const encuestasLanzadas = encuestasExistentes.filter(
    (e) => e.fechaInicio && e.fechaFin
  );

  const renderGrupos = (grupos) =>
    grupos?.length ? grupos.map((g) => g.nombre).join(", ") : "-";

  const renderPreguntas = (preguntas) =>
    preguntas?.length ? preguntas.map((p) => p.texto).join(", ") : "-";

  return (
    <div className="space-y-6">
      {/* BORRADORES */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Borradores</h3>
        {encuestasBorrador.length === 0 && <p>No hay encuestas en borrador.</p>}
        {encuestasBorrador.map((e) => (
          <div
            key={e.id}
            className="border rounded-lg p-4 mb-3 shadow bg-white flex flex-col gap-2"
          >
            <h5 className="font-semibold text-gray-800">
              {e.descripcion || `Encuesta #${e.id}`}
            </h5>
            <p className="text-sm text-gray-700">
              Preguntas: {renderPreguntas(e.preguntas)}
            </p>
            <p className="text-sm text-gray-700">Grupos: {renderGrupos(e.grupos)}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onSelectEncuesta(e)}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleLanzar(e)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Lanzar
              </button>
              <button
                onClick={() => onEliminar(e.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LANZADAS */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Lanzadas</h3>
        {encuestasLanzadas.length === 0 && <p>No hay encuestas lanzadas.</p>}
        {encuestasLanzadas.map((e) => (
          <div
            key={e.id}
            className="border rounded-lg p-4 mb-3 shadow bg-white flex flex-col gap-2"
          >
            <h5 className="font-semibold text-gray-800">
              {e.descripcion || `Encuesta #${e.id}`}
            </h5>
            <p className="text-sm text-gray-700">
              Período evaluado: {e.fechaInicio} — {e.fechaFin} <br />
              Plazo de respuesta: {e.fechaPCompletarInicio} — {e.fechaPCompletarFin}
            </p>
            <p className="text-sm text-gray-700">
              Preguntas: {renderPreguntas(e.preguntas)}
            </p>
            <p className="text-sm text-gray-700">Grupos: {renderGrupos(e.grupos)}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onSelectEncuesta(e)}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
              >
                Editar
              </button>
      
              <button
                onClick={() => onEliminar(e.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {lanzarVisible && (
        <LanzarEncuestaModal
          show={lanzarVisible}
          onClose={() => setLanzarVisible(false)}
          onConfirm={confirmarLanzamiento}
        />
      )}
    </div>
  );
};

export default EncuestasLista;
