"use client";
import { useEffect, useState } from "react";

export default function AngelUp() {
  // Usamos dos estados: uno para el scroll y otro para saber si el modal estorba
  const [scrolled, setScrolled] = useState(false); 
  const [modalAbierto, setModalAbierto] = useState(false); 

  useEffect(() => {
    // 1. Lógica del Scroll: Si bajamos más de 400px, scrolled es true
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    // 2. Lógica del Evento Personalizado: Escuchamos si el catálogo dice "abierto"
    const handleModalChange = (event) => {
      // Leemos el dato que enviamos desde el otro componente
      if (event.detail) {
        setModalAbierto(event.detail.abierto);
      }
    };

    // Agregamos los "oídos" (listeners) a la ventana global
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("estadoModalCambio", handleModalChange);

    // Limpieza: Quitamos los oídos cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("estadoModalCambio", handleModalChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // CONDICIÓN FINAL:
  // Se muestra SOLO SI: (Hay scroll) Y (El modal NO está abierto)
  const esVisible = scrolled && !modalAbierto;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`
        fixed bottom-8 right-8 z-50
        w-14 h-14 rounded-full
        bg-linear-to-r from-[#7C3AED] to-[#EC4899]
        text-white text-2xl
        flex items-center justify-center
        shadow-2xl
        transition-all duration-500
        hover:scale-110
        ${esVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}
      `}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={3} 
        stroke="currentColor" 
        className="w-6 h-6 animate-bounce"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}