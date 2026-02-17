"use client";
import { useEffect, useState } from "react";

export default function AngelUp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // aparece después de bajar 400px
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
        shadow-[0_20px_50px_rgba(124,58,237,0.35)]
        transition-all duration-500
        hover:scale-110
        hover:shadow-[0_30px_80px_rgba(124,58,237,0.55)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      ↑
    </button>
  );
}
