// src/components/EncuestaCard.jsx
import PreguntaCard from './PreguntaCard';
import { Loader2 } from 'lucide-react';
import { colorDeFondoPorGrupo, formatPeriodoMeses } from '../utils/EncuestaUtils';


export default function EncuestaCard({
  encuesta,
  respuestas,
  handlePuntajeChange,
  handleJustificacionChange,
  handleSubmit,
  replicarRespuestasDeEncuesta,
  justifRefs,
  loading,
  encuestas,
}) {
  return (
    <div key={encuesta.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <div className="mb-4">
        <div
          className={`rounded-lg px-6 py-4 shadow-sm text-center border ${colorDeFondoPorGrupo(
            encuesta.grupos?.[0]?.descripcion
          )}`}
        >
          {encuesta.descripcion && (
            <div className="mb-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{encuesta.descripcion}</h3>
            </div>
          )}

          <p className="text-sm">
            <span className="font-medium">Período evaluado:</span>{' '}
            {formatPeriodoMeses(encuesta.fechaInicio, encuesta.fechaFin)}
          </p>

          <p className="text-sm">
            <span className="font-medium">Grupo:</span>{' '}
            {encuesta.grupoDelCliente?.descripcion || `Grupo ${encuesta.grupoDelCliente?.id}`}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {(encuesta.preguntas || []).map((pregunta) => (
          <PreguntaCard
  key={pregunta.id}
  pregunta={pregunta}
  encuesta={encuesta} // ✅ le pasamos el objeto completo
  respuestas={respuestas}
  handlePuntajeChange={handlePuntajeChange}
  handleJustificacionChange={handleJustificacionChange}
  justifRefs={justifRefs}
/>

        ))}
      </div>

      <button
        onClick={() => handleSubmit(encuesta.id)}
        disabled={loading}
        className="mt-6 w-full rounded-md bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" /> Enviando...
          </span>
        ) : (
          'Enviar respuestas'
        )}
      </button>

      {encuesta.preguntas?.length > 0 && encuestas.length > 1 && (
        <button
          type="button"
          onClick={() => replicarRespuestasDeEncuesta(encuesta.id)}
          className="mt-4 w-full rounded-md bg-green-600 text-white px-5 py-2.5 text-sm font-semibold shadow hover:bg-green-700 transition"
        >
          📋 Replicar respuestas a otras encuestas
        </button>
      )}
    </div>
  );
}
