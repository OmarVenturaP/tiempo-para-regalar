"use client";
import { useReveal } from "@/hooks/useReveal";
import { Phone, Facebook, MessageCircle } from "lucide-react";

export default function Contacto() {
  const ref = useReveal({ threshold: 0.2 });

  return (
    <section
      id="contacto"
      className="relative w-full bg-[#F9F7FF] py-32 px-6 overflow-hidden"
    >
      <div
        ref={ref}
        className="
          max-w-5xl mx-auto
          opacity-0 translate-y-10 blur-sm
          transition-all duration-700 ease-out
        "
      >
        <div className="relative bg-white rounded-[2.5rem] p-12 md:p-16 shadow-[0_30px_80px_rgba(124,58,237,0.15)] border border-gray-100">

          {/* Decoración */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-regalo-lila/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-regalo-rosa/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center space-y-7">

            <span className="uppercase tracking-[0.35em] text-xs font-semibold text-gray-400">
              Contacto
            </span>

            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Estamos listos para
              <br />
              <span className="text-regalo-lila">ayudarte</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Escríbenos o llámanos y con gusto te asesoramos para elegir
              el regalo perfecto.
            </p>

            {/* BOTONES */}
            <div className="pt-10 flex flex-col md:flex-row gap-5 justify-center">

              {/* WhatsApp */}
              <a
                href="https://wa.me/5219619326135"
                target="_blank"
                className="
                  inline-flex items-center justify-center gap-3
                  px-10 py-5 rounded-full
                  bg-linear-to-r from-[#7C3AED] to-[#EC4899]
                  text-white font-bold text-lg
                  shadow-[0_25px_50px_rgba(124,58,237,0.35)]
                  transition-all duration-300
                  hover:scale-105 hover:shadow-[0_35px_70px_rgba(124,58,237,0.45)]
                "
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/tiempopara.regalar.3"
                target="_blank"
                className="
                  inline-flex items-center justify-center gap-3
                  px-8 py-5 rounded-full
                  border-2 border-regalo-lila
                  text-regalo-lila font-bold
                  transition-all duration-300
                  hover:bg-regalo-lila hover:text-white hover:scale-105
                "
              >
                <Facebook className="w-6 h-6" />
                Facebook
              </a>

              {/* Llamada */}
              <a
                href="tel:+5219619326135"
                className="
                  inline-flex items-center justify-center gap-3
                  px-8 py-5 rounded-full
                  border-2 border-gray-300
                  text-gray-600 font-bold
                  transition-all duration-300
                  hover:border-regalo-rosa hover:text-regalo-rosa hover:scale-105
                "
              >
                <Phone className="w-6 h-6" />
                Llamar
              </a>

            </div>

            <p className="text-sm text-gray-400 italic pt-4">
              Atención personalizada • Respuesta rápida • Confianza total
            </p>

          </div>
        </div>
      </div>
            {/* Conector al footer (sutil) */}
      <div
        className="
          absolute bottom-0 left-0 w-full h-22
          bg-gradient-to-b
          from-transparent
          via-[#D8D0F0]
          to-[#0A0916]
        "
      />
    </section>
  );
}
