"use client";
import { Instagram, Facebook, MessageCircle, Mail, Users, Gift, Smile, Award, Truck, ShieldCheck, CalendarDays, Wallet, Layers, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";

export default function Headers() {
    const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const isAdmin = true;

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setSelectedProduct(null);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
  if (!menuOpen) return;
  const closeOnScroll = () => setMenuOpen(false);
  window.addEventListener("scroll", closeOnScroll);

  return () => window.removeEventListener("scroll", closeOnScroll);
}, [menuOpen]);

  return (
        <header className="fixed top-6 inset-x-0 z-40 flex justify-center px-4">
          <div className="relative w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-full px-10 py-4 border border-[#E7E2D8] shadow-[0_25px_60px_rgba(0,0,0,0.12)] flex items-center justify-between">
          <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5"
              aria-label="Abrir menú"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            <nav className="hidden md:flex gap-8 text-sm text-gray-600">
              <a href="#inicio">Inicio</a>
              <a href="#catalogo">Catálogo</a>
            </nav>
            <a href="#inicio" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl">
              <div className="">
                <img src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1766933777/logo_bg_regalar_yfbuhv.png" alt="Logo TIEMPO PARA REGALAR" className="w-12 h-12" />
              </div>
            </a>


            <nav className="hidden md:flex gap-8 text-sm text-gray-600">
              <a href="#servicios">Servicios</a>
              <a href="#contacto">Contacto</a>
            </nav>
          </div>
          <div
            className={`
              absolute top-22.5 w-full max-w-6xl mx-auto px-6 md:hidden
              transition-all duration-300 ease-out
              ${menuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"}
            `}
          >
            <div className="bg-white rounded-4xl border border-[#E7E2D8]
                  shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                  p-8 flex flex-col gap-6 text-center text-gray-700">

            {/* LINKS PÚBLICOS */}
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          </div>
        </div>
        </header>
  );
}