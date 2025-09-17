// src/components/encuestas/LanzarEncuestaModal.jsx

import React, { useState } from "react";

export default function LanzarEncuestaModal({ show, onClose, onConfirm }) {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [pCompletarInicio, setPCompletarInicio] = useState("");
  const [pCompletarFin, setPCompletarFin] = useState("");

  if (!show) return null;

  const handleSubmit = () => {

    if (!fechaInicio || !fechaFin || !pCompletarInicio || !pCompletarFin) {
    alert("Completá todas las fechas");
    return;
  }


    onConfirm({
      fechaInicio,
      fechaFin,
      fechaPCompletarInicio: pCompletarInicio,
      fechaPCompletarFin: pCompletarFin,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-bold mb-4">Lanzar Encuesta</h3>

        {/* PERIODO DE EVALUACIÓN */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            PERIODO DE EVALUACIÓN
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs text-gray-500 mb-1">Desde</span>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Hasta</span>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* PLAZO PARA RESPONDER */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            PLAZO PARA RESPONDER LA ENCUESTA
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs text-gray-500 mb-1">Desde</span>
              <input
                type="date"
                value={pCompletarInicio}
                onChange={(e) => setPCompletarInicio(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Hasta</span>
              <input
                type="date"
                value={pCompletarFin}
                onChange={(e) => setPCompletarFin(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Lanzar
          </button>
        </div>
      </div>
    </div>
  );
}
