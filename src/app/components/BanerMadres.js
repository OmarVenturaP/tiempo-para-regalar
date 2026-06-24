"use client";
import { useState, useEffect } from "react";
import { Gift, X } from "lucide-react";

export default function BannerMadres() {
  const [isVisible, setIsVisible] = useState(false);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch('/api/banner')
      .then(res => res.json())
      .then(data => {
        if (data && data.activo) {
          setBanner(data);
          const bannerCerrado = localStorage.getItem("bannerCerrado_" + data.id);
          if (!bannerCerrado) {
            setIsVisible(true);
          }
        }
      })
      .catch(() => {});
  }, []);

  const cerrarBanner = () => {
    setIsVisible(false);
    if (banner?.id) {
      localStorage.setItem("bannerCerrado_" + banner.id, "true");
    }
  };

  if (!isVisible || !banner) return null;

  const telefono = "5219619326135";
  const mensaje = "¡Hola! Vi el aviso en su página y me interesa apartar un regalo.";
  const linkWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white relative shadow-md z-50 animate-in slide-in-from-top-full duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center md:text-left pr-10 md:pr-4">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 animate-pulse shrink-0" />
          <p className="text-sm md:text-base font-medium">
            {banner.titulo && <strong className="font-black tracking-wide uppercase">{banner.titulo}</strong>}
            {banner.titulo && banner.descripcion ? ' ' : ''}
            {banner.descripcion}
          </p>
        </div>

        {banner.texto_boton && (
          <a
            href={banner.enlace_boton || linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white text-white hover:text-[#EC4899] text-xs md:text-sm font-bold px-5 py-2 md:py-1.5 rounded-full transition-all duration-300 backdrop-blur-sm whitespace-nowrap border border-white/30 shadow-sm hover:shadow-lg"
          >
            {banner.texto_boton} ❯
          </a>
        )}
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
