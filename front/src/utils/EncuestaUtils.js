export const COLORES_GRUPO = [
  'bg-blue-100 border-blue-300 text-blue-800',
  'bg-green-100 border-green-300 text-green-800',
  'bg-yellow-100 border-yellow-300 text-yellow-800',
  'bg-purple-100 border-purple-300 text-purple-800',
  'bg-pink-100 border-pink-300 text-pink-800',
  'bg-indigo-100 border-indigo-300 text-indigo-800',
  'bg-orange-100 border-orange-300 text-orange-800',
  'bg-rose-100 border-rose-300 text-rose-800',
];

const grupoColorMap = new Map();
let coloresUsados = new Set();

export function colorDeFondoPorGrupo(nombreGrupo = '') {
  if (grupoColorMap.has(nombreGrupo)) return grupoColorMap.get(nombreGrupo);
  const disponibles = COLORES_GRUPO.filter(c => !coloresUsados.has(c));
  const color =
    disponibles[Math.floor(Math.random() * disponibles.length)] ||
    COLORES_GRUPO[Math.floor(Math.random() * COLORES_GRUPO.length)];
  grupoColorMap.set(nombreGrupo, color);
  coloresUsados.add(color);
  return color;
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export function formatPeriodoMeses(inicio, fin) {
  if (!inicio || !fin) return '-';

  const [añoIni, mesIni] = inicio.split('-').map(Number);
  const [añoFin, mesFin] = fin.split('-').map(Number);

  const optsMes = { month: 'long' };
  const optsMesAnio = { month: 'long', year: 'numeric' };

  const fechaIni = new Date(añoIni, mesIni - 1);
  const fechaFin = new Date(añoFin, mesFin - 1);

  if (añoIni === añoFin) {
    const mesInicio = fechaIni.toLocaleDateString('es-AR', optsMes);
    const mesFinStr = fechaFin.toLocaleDateString('es-AR', optsMesAnio);
    return `${capitalize(mesInicio)} - ${capitalize(mesFinStr)}`;
  }

  return `${capitalize(fechaIni.toLocaleDateString('es-AR', optsMesAnio))} - ${capitalize(
    fechaFin.toLocaleDateString('es-AR', optsMesAnio)
  )}`;
}
