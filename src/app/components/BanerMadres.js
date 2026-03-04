"use client";
import { useState, useEffect } from "react";
import { Gift, X } from "lucide-react";

export default function BannerMadres() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Revisamos si el usuario ya lo cerró antes para no ser molestos
    const bannerCerrado = localStorage.getItem("bannerMadresCerrado");
    if (!bannerCerrado) {
      setIsVisible(true);
    }
  }, []);

  const cerrarBanner = () => {
    setIsVisible(false);
    localStorage.setItem("bannerMadresCerrado", "true");
  };

  if (!isVisible) return null;

  // Enlace directo a WhatsApp con mensaje específico para apartados
  const telefono = "5219619326135";
  const mensaje = "¡Hola! 👋 Vi el aviso en su página y me interesa apartar un regalo, te cuento que producto me interesa...";
  const linkWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white relative shadow-md z-50 animate-in slide-in-from-top-full duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center md:text-left pr-10 md:pr-4">
        
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 animate-pulse shrink-0" />
          <p className="text-sm md:text-base font-medium">
            <strong className="font-black tracking-wide uppercase">¡Anticipa tu regalo!</strong> Aparta desde <strong className="font-black tracking-wide uppercase">$69</strong> hoy y congela el precio, liquida hasta en 15 días.
          </p>
        </div>

        <a 
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/20 hover:bg-white text-white hover:text-[#EC4899] text-xs md:text-sm font-bold px-5 py-2 md:py-1.5 rounded-full transition-all duration-300 backdrop-blur-sm whitespace-nowrap border border-white/30 shadow-sm hover:shadow-lg"
        >
          Apartar ahora ❯
        </a>

      </div>

      <button 
        onClick={cerrarBanner}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
        aria-label="Cerrar aviso"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}