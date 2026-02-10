"use client";
import { useState, useEffect } from 'react';

export default function SorteoPink() {
  const [paso, setPaso] = useState('cerrado'); 
  const [premio, setPremio] = useState('');
  const [esGanador, setEsGanador] = useState(true);
  const [codigo, setCodigo] = useState('');

  const HORAS_ESPERA = 48;

  useEffect(() => {
    const ultimoIntento = localStorage.getItem('pink_shop_ultimo_intento');
    
    if (ultimoIntento) {
      const ahora = new Date().getTime();
      const tiempoTranscurrido = ahora - parseInt(ultimoIntento);
      const msEn48Horas = HORAS_ESPERA * 60 * 60 * 1000;

      if (tiempoTranscurrido < msEn48Horas) {
        setPaso('finalizado'); // Aún no pasan las 48 horas
      } else {
        localStorage.removeItem('pink_shop_ultimo_intento'); // Tiempo cumplido, liberamos
        setPaso('cerrado');
      }
    }
  }, []);

  const iniciarSorteo = () => {
    setPaso('animando');

    // CONFIGURACIÓN DE PROBABILIDADES
    const opciones = [
      { t: "💖 Regalo Sorpresa", g: true },
      { t: "🎁 Aretes de Regalo", g: true },
      { t: "🚚 Envío Gratis", g: true },
      { t: "Ups! Sigue participando", g: false },
      { t: "Ups! Sigue participando", g: false },
      { t: "Ups! Sigue participando", g: false },
      { t: "Ups! Sigue participando", g: false },
      { t: "Ups! Sigue participando", g: false },
      { t: "Ups! Sigue participando", g: false } 
    ];

    const resultado = opciones[Math.floor(Math.random() * opciones.length)];
    const idUnico = Math.floor(1000 + Math.random() * 9000);
    
    setTimeout(() => {
      setPremio(resultado.t);
      setEsGanador(resultado.g);
      setCodigo(`WIN-${idUnico}`);
      setPaso('premio');

      const ahora = new Date().getTime();
      localStorage.setItem('pink_shop_ultimo_intento', ahora.toString());
    }, 2000);
  };

  if (paso === 'finalizado') return null;

  return (
    <div className="fixed bottom-10 right-10 z-70">
      {paso === 'cerrado' && (
        <button onClick={iniciarSorteo} className="bg-regalo-rosa w-20 h-20 rounded-full shadow-2xl flex items-center justify-center text-4xl animate-bounce hover:scale-110 transition-transform border-4 border-white">
          🎁
          <span className="absolute -top-1 -right-2 bg-regalo-azul-r text-white text-[9px] px-2 py-1 rounded-full font-black animate-pulse">
            ABRE
          </span>
        </button>
      )}

      {paso === 'animando' && (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-2 border-regalo-rosa text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-regalo-rosa border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="font-black text-regalo-rosa text-[10px] uppercase tracking-widest">Intentando...</p>
        </div>
      )}

      {paso === 'premio' && (
        <div className="bg-white p-1 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-2 border-regalo-rosa w-72 overflow-hidden animate-in zoom-in duration-500">
          
          {/* CABECERA DINÁMICA (ROSA SI GANA, GRIS SI PIERDE) */}
          <div className={`${esGanador ? 'bg-regalo-rosa' : 'bg-gray-400'} rounded-t-2xl p-8 text-center text-white rounded-t-2rem`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
              {esGanador ? '¡Increíble!' : '¡Oh no!'}
            </p>
            <h3 className="text-2xl font-black leading-tight italic">
              {premio}
            </h3>
          </div>
          
          <div className="p-6 text-center">
          {esGanador ? (
            <>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-4 leading-tight">
                Toma captura ahora. <br/> Solo tienes una oportunidad.
              </p>
              <div className="bg-pink-50 border-2 border-dashed border-regalo-rosa/30 p-4 rounded-2xl mb-4">
                <p className="text-xs text-regalo-rosa font-bold mb-1">CÓDIGO ÚNICO:</p>
                <p className="text-xl font-black text-regalo-azul-r">{codigo}</p>
              </div>
            </>
          ) : (
            <div className="mb-6">
              <p className="text-sm text-gray-500 font-medium mb-2 ">
                ¡No te rindas! Intenta en el siguiente en vivo.
              </p>
            </div>
          )}
          
          <button 
            onClick={() => setPaso('finalizado')}
            className={`w-full py-3 rounded-full text-[11px] font-black transition-all uppercase shadow-md ${
              esGanador 
                ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' 
                : 'bg-regalo-rosa text-white hover:bg-regalo-rosa/90 hover:scale-105'
            }`}
          >
            {esGanador ? 'Entendido, cerrar' : 'CERRAR'}
          </button>
        </div>
          
          <div className="bg-regalo-azul-r py-2 text-center rounded-b-2xl">
            <p className="text-white text-[9px] font-black italic tracking-widest uppercase">
              Pink Shop • Si compras, ganas
            </p>
          </div>
        </div>
      )}
    </div>
  );
}