export default function MensajeAlerta({ mensaje, setMensaje }) {
  if (!mensaje) return null;

  const esExito = mensaje.startsWith('✅');
  const color = esExito ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800';

  return (
    <div
      className={`max-w-2xl mx-auto mb-6 border rounded-md px-4 py-3 text-sm text-center ${color}`}
      onClick={() => setMensaje('')}
    >
      {mensaje}
    </div>
  );
}
