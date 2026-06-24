"use client";
import { useEffect } from 'react';

export default function Toast({ mensaje, tipo = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const estilos = {
    success: "bg-regalo-verde border-green-600",
    error: "bg-red-500 border-red-700",
    info: "bg-blue-500 border-blue-700"
  };

  return (
    <div className={`fixed bottom-10 right-10 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl text-white shadow-2xl border-b-4 ${estilos[tipo]}`}>
      <span className="text-2xl">{tipo === 'success' ? '✅' : '❌'}</span>
      <p className="font-bold text-sm tracking-wide">{mensaje}</p>
      <button onClick={onClose} className="ml-4 hover:scale-125 transition-transform text-xs opacity-70">✕</button>
    </div>
  );
}
