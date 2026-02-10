import {
  Gift,
  HeartHandshake,
  Sparkles,
  Truck,
  Smile,
  ShieldCheck
} from "lucide-react";

export default function NuestrosSericios() {
  return (
    <section
      id="servicios"
      className="
        relative w-full pt-28 pb-46
        bg-gradient-to-b
        from-[#F4F1FB]
        via-[#EEE9FA]
        to-[#D8D0F0]
        overflow-hidden
      "
    >
      {/* Glows suaves */}
      <div className="absolute -top-40 right-0 w-[420px] h-[420px] bg-regalo-lila/25 rounded-full blur-[120px]" />
      <div className="absolute top-32 -left-40 w-[420px] h-[420px] bg-regalo-azul/25 rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Separador */}
        <div className="w-40 h-[2px] bg-regalo-verde rounded-full mb-14 opacity-80" />

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-regalo-negro leading-tight">
            Más que un regalo,
            <span className="block text-regalo-verde">
              una experiencia
            </span>
          </h2>

          <p className="mt-6 text-lg text-regalo-negro/70">
            Cada detalle está pensado para crear momentos que se
            sienten, se recuerdan y se comparten.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

          {[
            { icon: Gift, title: "Detalles únicos", text: "Contamos con productos especiales para cada temporada." },
            { icon: HeartHandshake, title: "Atención cercana", text: "Trato directo, sin intermediarios." },
            { icon: Sparkles, title: "Diseño elegante", text: "Seleccionamos cuidadosamente cada producto para asegurar que recibas solo lo mejor." },
            { icon: Truck, title: "Envíos Gratis", text: "Te enviamos tu regalo hasta tu hogar gratis en compras desde $199.00 MXN." },
            { icon: Smile, title: "Emociones reales", text: "Momentos que generan sonrisas auténticas." },
            { icon: ShieldCheck, title: "Compra 100% confiable", text: "¿Estás fuera de Tonalá, Chiapas? Enviamos a todo México por las mejores paqueterías." },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white/60 backdrop-blur-xl
                  border border-white/40
                  rounded-3xl p-6
                  shadow-[0_20px_60px_rgba(124,58,237,0.15)]
                  transition-all duration-700
                  hover:-translate-y-2
                  hover:shadow-[0_40px_100px_rgba(124,58,237,0.25)]
                "
              >
                {/* Glow hover */}
                <div className="
                  absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100
                  bg-gradient-to-br from-regalo-azul/20 via-transparent to-regalo-lila/20
                  transition-opacity duration-300
                " />

                <div className="relative z-10">
                  <div className="
                    w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 mb-5 rounded-xl
                    flex items-center justify-center
                    bg-regalo-lila/15
                    text-regalo-lila
                  ">
                    <Icon size={18} className="sm:size-[20px] lg:size-[22px] text-regalo-lila opacity-80 group-hover:scale-110 group-hover:opacity-100" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold text-regalo-negro mb-1">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-sm text-regalo-negro/70 leading-snug sm:leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
