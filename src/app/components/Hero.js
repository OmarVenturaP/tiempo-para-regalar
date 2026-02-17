"use client";
import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
function useScrollIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 1400); // aparece después del reveal del hero

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return visible;
}


export default function Hero() {
  const heroRef = useReveal();
  const showScroll = useScrollIndicator();

  return (
    <section
      id="inicio"
      className="relative w-full pt-44 pb-30 flex justify-center px-6 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      {/* COLLAGE MOBILE (fondo) */}
        <div className="absolute inset-0 flex justify-center items-center lg:hidden pointer-events-none transition-all duration-1000 ease-out">
          <div className="relative w-[320px] h-[320px] opacity-25 blur-[1px]">
            <img
              src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1770701932/hero1_bjacg9.png"
              className="absolute -top-6 left-10 w-44 h-60 object-cover rounded-3xl"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1770701946/hero1a_z8uwc3.png"
              className="absolute bottom-0 left-0 w-40 h-56 object-cover rounded-3xl"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1770702440/hero3a_yjbs9u.png"
              className="absolute top-12 right-0 w-48 h-64 object-cover rounded-3xl"
              alt=""
            />
          </div>
        </div>
        {/* TEXTO */}
        <div
          ref={heroRef}
          className="relative z-10 opacity-0 translate-y-10 transition-all duration-700 ease-out space-y-7 max-w-xl"
        >
          <span className="uppercase tracking-[0.35em] text-xs text-gray-500">
            Siempre es un buen momento para regalar
          </span>

          <h1 className="font-serif text-[3.4rem] leading-[1.05]">
            Haz cada momento <br />
            <span className="text-[#7C3AED]">UNICO</span>
          </h1>

          <p className="text-gray-600 text-lg pb-12">
            Una selección exclusiva de productos especiales para alegrar cada
            momento de tu vida y hacerlo especial.
          </p>
          {/* 
          <button
            className="
              relative overflow-hidden
              px-10 py-4 rounded-full
              bg-linear-to-r from-[#7C3AED] to-[#EC4899]
              text-white font-semibold
              shadow-[0_20px_60px_rgba(124,58,237,0.35)]
              transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              hover:scale-[1.03]
              hover:shadow-[0_40px_100px_rgba(124,58,237,0.5)]
            "
            onClick={() => {
                      const telefono = "5219619326135"; 
                      const mensaje = `Hola Tiempo para regalar! 👋 Me interesa obtener más información sobre tus productos.`;
                      
                      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                      window.open(url, '_blank');
                    }}
          >
            Contacto
          </button>*/}

        </div>

        {/* COLLAGE */}
        <div className="hidden lg:flex justify-center relative">
          <div className="relative w-[420px] h-[420px]">
            <img
              src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1770701932/hero1_bjacg9.png"
              alt=""
              className="absolute top-0 left-10 w-52 h-72 object-cover rounded-3xl shadow-xl"
            />
            <img
              src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1770701946/hero1a_z8uwc3.png"
              alt=""
              className="absolute bottom-0 left-0 w-48 h-64 object-cover rounded-3xl shadow-lg"
            />
            <img
              src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1770702440/hero3a_yjbs9u.png"
              alt=""
              className="absolute top-20 right-0 w-56 h-80 object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
{/* SCROLL INDICATOR — PREMIUM */}
<button
  onClick={() => {
    const section = document.getElementById("catalogo");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }}
  className={`
    absolute bottom-10 left-1/2 -translate-x-1/2
    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
    ${showScroll
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6 pointer-events-none"}
  `}
>
  <div
    className="
      group
      px-5 py-3
      rounded-full
      backdrop-blur-xl
      bg-white/40 dark:bg-white/10
      border border-white/30
      shadow-[0_10px_40px_rgba(124,58,237,0.25)]
      hover:shadow-[0_20px_70px_rgba(124,58,237,0.45)]
      transition-all duration-500
      flex items-center gap-3
    "
  >
    <span className="text-xs tracking-widest uppercase text-gray-700/80">
      Explorar catálogo
    </span>

    <div className="premium-arrow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-[#7C3AED]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
</button>

    </section>
  );
}
