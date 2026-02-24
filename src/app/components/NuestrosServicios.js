"use client"; // Necesario para la interactividad (onClick)
import { useState } from "react";
import {
  ShoppingBag,
  Star,
  Truck,
  MapPin,
  HeartHandshake,
  Gift,
  ChevronDown // Nuevo icono para la flechita
} from "lucide-react";

export default function NuestrosServicios() {
  // Estado para controlar qué tarjeta está abierta en móvil
  // null = todas cerradas
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    // Si tocas la que ya está abierta, se cierra. Si no, se abre la nueva.
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const beneficios = [
    { 
      icon: ShoppingBag, 
      title: "Accesorios de Moda", 
      text: "Encuentra mochilas, tote bags, bandoleras, perfumes y termos. Una selección exclusiva de accesorios en tendencia." 
    },
    { 
      icon: MapPin, 
      title: "Envío Local Gratis", 
      text: (<span>¡Te consentimos! En compras mayores a <strong className="text-regalo-verde font-bold">$199.00 MXN</strong>, llevamos tu pedido hasta tu puerta dentro de Tonalá, Chiapas.</span>)
    },
    { 
      icon: Star, 
      title: "Calidad Seleccionada", 
      text: "No vendemos nada que no usaríamos. Cada pieza es elegida cuidadosamente para garantizarte durabilidad y estilo." 
    },
    { 
      icon: Truck, 
      title: "Envíos a todo México", 
      text: "¿Estás fuera de Tonalá, Chiapas? No te preocupes, gestionamos envíos seguros y rápidos a cualquier parte de la república." 
    },
    { 
      icon: HeartHandshake, 
      title: "Asesoría Personal", 
      text: "¿Buscas el regalo perfecto? Te ayudamos a elegir el detalle ideal según tu presupuesto, estilo y ocasión." 
    },
    { 
      icon: Gift, 
      title: "Shopping Experiencial", 
      text: "Cada compra es una experiencia única y especial. Porque siempre es un buen momento para regalar." 
    },
  ];

  return (
    <section
      id="servicios"
      className="
        relative w-full pt-28 pb-32
        bg-gradient-to-b from-[#F4F1FB] via-[#EEE9FA] to-[#D8D0F0]
        overflow-hidden
      "
    >
      {/* Glows decorativos */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Separador Visual */}
        <div className="flex justify-start mb-10">
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>

        {/* Encabezado */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
            Calidad y estilo en <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              cada accesorio
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
            Desde ese <strong>termo</strong> que te acompaña al gym hasta el <strong>bolso</strong> que completa tu outfit. Nos encargamos de que recibas solo lo mejor.
          </p>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

          {beneficios.map((item, index) => {
            const Icon = item.icon;
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => toggleCard(index)} // Click para abrir en móvil
                className={`
                  group relative
                  bg-white/70 backdrop-blur-md
                  border border-white/60
                  rounded-[2rem] p-6 md:p-8
                  shadow-sm 
                  transition-all duration-500
                  cursor-pointer md:cursor-default
                  ${isOpen ? 'ring-2 ring-purple-400 shadow-md' : 'hover:shadow-xl md:hover:-translate-y-2'}
                `}
              >
                {/* HEADER DE LA TARJETA (Siempre visible) */}
                <div className="flex items-center gap-4 md:block">
                  {/* Icono Principal */}
                  <div className="
                    w-12 h-12 md:w-14 md:h-14 
                    shrink-0 rounded-2xl
                    flex items-center justify-center
                    bg-purple-50 text-purple-600
                    md:mb-6
                    md:group-hover:bg-purple-600 md:group-hover:text-white
                    transition-colors duration-300
                    shadow-inner
                  ">
                    <Icon size={24} className="md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Título y Flecha (Flex en móvil para alinearlos) */}
                  <div className="flex-1 flex items-center justify-between md:block">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 md:mb-3 group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Flecha: Solo visible en móvil (md:hidden) */}
                    <ChevronDown 
                      className={`
                        w-5 h-5 text-gray-400 md:hidden transition-transform duration-300
                        ${isOpen ? 'rotate-180 text-purple-600' : ''}
                      `} 
                    />
                  </div>
                </div>

                {/* CUERPO DE LA TARJETA (Colapsable en móvil, Fijo en Desktop) */}
                <div 
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-0'}
                  `}
                >
                  <p className="text-gray-600 text-sm leading-relaxed pl-[3.5rem] md:pl-0">
                    {item.text}
                  </p>
                </div>

                {/* Decoración Hover (Solo Desktop) */}
                <div className="hidden md:block absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}