//EncuestaForm

import React, { useEffect, useRef, useState } from 'react';
import {
  obtenerPreguntas,
  crearEncuesta,
  editarEncuesta,
  obtenerGrupos,
  crearPregunta,
  obtenerEncuestas,
  lanzarEncuesta,
  eliminarEncuesta
} from '../../services/api';

import GruposSelector from './GruposSelector';
import PreguntasSelector from './PreguntasSelector';
import EncuestasLista from './EncuestasLista';

// --- helper para formatear fechas para inputs (YYYY-MM-DD) ---
const toInputDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return d.toISOString().split('T')[0];
};

// --- helper para mostrar fechas legibles ---
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    return `${day}/${month}/${year}`;
  } catch {
    return dateStr;
  }
};

export default function EncuestaForm() {
  // datos base
  const [preguntasDisponibles, setPreguntasDisponibles] = useState([]);
  const [gruposDisponibles, setGruposDisponibles] = useState([]);
const [descripcion, setDescripcion] = useState('');


  // estado del form
  const [preguntaIdsSeleccionadas, setPreguntaIdsSeleccionadas] = useState([]);
  const [grupoIdsSeleccionados, setGrupoIdsSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // buscadores
  const [busqueda, setBusqueda] = useState('');
  const [coincidencias, setCoincidencias] = useState([]);
  const [busquedaGrupo, setBusquedaGrupo] = useState('');
  const [coincidenciasGrupos, setCoincidenciasGrupos] = useState([]);

  // UI general
  const [encuestasExistentes, setEncuestasExistentes] = useState([]);
  const [editingEncuestaId, setEditingEncuestaId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);


  // refs
  const preguntasListRef = useRef(null);
  const gruposListRef = useRef(null);

  // cargar datos
  useEffect(() => {
    obtenerPreguntas().then(res => setPreguntasDisponibles(res.data));
    obtenerGrupos().then(res => setGruposDisponibles(res.data));
    fetchEncuestas();
  }, []);

  const fetchEncuestas = async () => {
    try {
      const res = await obtenerEncuestas();
      setEncuestasExistentes(res.data);
    } catch (err) {
      console.error('Error al obtener encuestas', err);
    }
  };

  const handleEliminarEncuesta = async (id) => {
  if (!window.confirm("¿Seguro que deseas eliminar esta encuesta?")) return;
  try {
    await eliminarEncuesta(id);
    setMensaje("✅ Encuesta eliminada correctamente");
    await fetchEncuestas();
  } catch (err) {
    console.error(err);
    setMensaje("❌ Error al eliminar encuesta");
  }
};



  // filtros dinámicos
  useEffect(() => {
    const lower = busqueda.trim().toLowerCase();
    if (!lower) return setCoincidencias([]);
    setCoincidencias(
      preguntasDisponibles.filter(p => (p.texto || '').toLowerCase().includes(lower))
    );
  }, [busqueda, preguntasDisponibles]);

  useEffect(() => {
    const lower = busquedaGrupo.trim().toLowerCase();
    if (!lower) return setCoincidenciasGrupos([]);
    setCoincidenciasGrupos(
      gruposDisponibles.filter(g => (g.nombre || '').toLowerCase().includes(lower))
    );
  }, [busquedaGrupo, gruposDisponibles]);

  // utils
  const handleTogglePregunta = (id) => {
    setPreguntaIdsSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
    setBusqueda('');
    setCoincidencias([]);
  };

  const handleToggleGrupo = (id) => {
    setGrupoIdsSeleccionados(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
    setBusquedaGrupo('');
    setCoincidenciasGrupos([]);
  };

  const agregarDesdeInput = async () => {
    const texto = busqueda.trim();
    if (!texto) return;
    const existente = preguntasDisponibles.find(
      p => (p.texto || '').toLowerCase() === texto.toLowerCase()
    );
    if (existente) {
      if (!preguntaIdsSeleccionadas.includes(existente.id)) {
        setPreguntaIdsSeleccionadas(prev => [...prev, existente.id]);
      }
    } else {
      try {
        const nueva = await crearPregunta(texto);
        setPreguntasDisponibles(prev => [...prev, nueva.data]);
        setPreguntaIdsSeleccionadas(prev => [...prev, nueva.data.id]);
      } catch {
        setMensaje('❌ Error al crear nueva pregunta');
      }
    }
    setBusqueda('');
    setCoincidencias([]);
  };

  const agregarGrupoDesdeInput = () => {
    if (!busquedaGrupo.trim()) return;
    const encontrado = gruposDisponibles.find(
      g => (g.nombre || '').toLowerCase() === busquedaGrupo.trim().toLowerCase()
    );
    if (encontrado && !grupoIdsSeleccionados.includes(encontrado.id)) {
      setGrupoIdsSeleccionados(prev => [...prev, encontrado.id]);
    }
    setBusquedaGrupo('');
    setCoincidenciasGrupos([]);
  };

  const resetForm = () => {
    setPreguntaIdsSeleccionadas([]);
    setGrupoIdsSeleccionados([]);
    setDescripcion('');
    setEditingEncuestaId(null);
    setBusqueda('');
    setBusquedaGrupo('');
    setCoincidencias([]);
    setCoincidenciasGrupos([]);
    setMensaje('');
    setFormVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
  grupos: grupoIdsSeleccionados,
  preguntas: preguntaIdsSeleccionadas,
  descripcion: descripcion?.trim() || null,
};

      if (editingEncuestaId) {
        await editarEncuesta(editingEncuestaId, payload);
        setMensaje('✅ Encuesta actualizada correctamente');
      } else {
        await crearEncuesta(payload);
        setMensaje('✅ Encuesta creada correctamente');
      }
      resetForm();
      await fetchEncuestas();
    } catch (err) {
      console.error(err);
      setMensaje(editingEncuestaId ? '❌ Error al editar encuesta' : '❌ Error al crear encuesta');
    }
  };

  const selectEncuesta = (enc) => {
    setFormVisible(true);
    setEditingEncuestaId(enc.id);

    const grupos = Array.isArray(enc.grupos)
      ? enc.grupos.map(g => (typeof g === 'object' ? g.id : g))
      : [];
    const preguntas = Array.isArray(enc.preguntas)
      ? enc.preguntas.map(p => (typeof p === 'object' ? p.id : p))
      : [];
    setGrupoIdsSeleccionados(grupos);
    setPreguntaIdsSeleccionadas(preguntas);
    setDescripcion(enc.descripcion || '');
    setMensaje('');
  };

  const iniciarCrear = () => {
    setFormVisible(true);
    setEditingEncuestaId(null);
    setPreguntaIdsSeleccionadas([]);
    setGrupoIdsSeleccionados([]);
    setBusqueda('');
    setBusquedaGrupo('');
    setCoincidencias([]);
    setCoincidenciasGrupos([]);
    setMensaje('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Encuestas</h2>
        {!formVisible && (
          <button
            onClick={iniciarCrear}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Agregar encuesta
          </button>
        )}
      </div>

      {formVisible && (
        <div className="mt-4 border rounded p-6 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Descripción (opcional)
  </label>
  <input
    type="text"
    value={descripcion}
    onChange={(e) => setDescripcion(e.target.value)}
    placeholder="Ej: Encuesta de clima laboral Q1"
    className="w-full border rounded px-3 py-2 text-sm"
  />
</div>


            <GruposSelector
              gruposDisponibles={gruposDisponibles}
              grupoIdsSeleccionados={grupoIdsSeleccionados}
              onToggleGrupo={handleToggleGrupo}
              busquedaGrupo={busquedaGrupo}
              setBusquedaGrupo={setBusquedaGrupo}
              coincidenciasGrupos={coincidenciasGrupos}
              gruposListRef={gruposListRef}
              onAgregarDesdeInput={agregarGrupoDesdeInput}
            />

            <PreguntasSelector
              preguntasDisponibles={preguntasDisponibles}
              preguntaIdsSeleccionadas={preguntaIdsSeleccionadas}
              onTogglePregunta={handleTogglePregunta}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              coincidencias={coincidencias}
              preguntasListRef={preguntasListRef}
              onAgregarDesdeInput={agregarDesdeInput}
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 transition"
              >
                {editingEncuestaId ? 'Guardar cambios' : 'Crear encuesta'}
              </button>

              {editingEncuestaId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700"
                >
                  Cancelar edición
                </button>
              )}
            </div>

            {mensaje && (
              <p className={`text-sm ${mensaje.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {mensaje}
              </p>
            )}
          </form>
        </div>
      )}

   

     <EncuestasLista
  encuestasExistentes={encuestasExistentes}
  onSelectEncuesta={selectEncuesta}
  onEliminar={handleEliminarEncuesta}
  onLanzar={async (encuesta, fechas) => {
    try {
      await lanzarEncuesta(encuesta.id, fechas);
      setMensaje("✅ Encuesta lanzada correctamente");
      await fetchEncuestas();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al lanzar encuesta");
    }
  }}
  formatDate={formatDate}
/>


    </div>
  );
}
