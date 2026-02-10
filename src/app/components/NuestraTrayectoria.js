"use client";
import { Instagram, Facebook, MessageCircle, Mail, Users, Gift, Smile, Award, Truck, ShieldCheck, CalendarDays, Wallet, Layers, MapPin } from 'lucide-react';
import Counter from '../components/Counter';

export default function NuestraTrayectoria() {

  return (

    <section id='trayectoria' className="scroll-mt-24 py-24 bg-[#0A192F] relative overflow-hidden">
    {/* Elementos decorativos de fondo (Círculos de luz) */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-regalo-azul-r/20 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-regalo-rosa/20 rounded-full blur-[120px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight">
          NUESTRA <span className="text-regalo-azul-c">TRAYECTORIA</span> EN NÚMEROS
        </h2>
        <p className="text-gray-400 mt-2 font-medium">Resultados que hablan de nuestro compromiso</p>
        <div className="h-1 w-20 bg-regalo-rosa mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Tarjeta 1 */}
        <StatCardDarkMode 
          icon={<Users size={32} />} 
          target="500" 
          label="Clientes Satisfechos" 
          symbol="+"
          accentColor="text-regalo-azul-c"
        />
        {/* Tarjeta 2 */}
        <StatCardDarkMode 
          icon={<Gift size={32} />} 
          target="2200" 
          label="Regalos Enviados" 
          symbol="+"
          accentColor="text-regalo-rosa"
        />
        {/* Tarjeta 3 */}
        <StatCardDarkMode 
          icon={<Smile size={32} />} 
          target="100" 
          label="Felicidad Garantizada" 
          symbol="%"
          accentColor="text-regalo-verde"
        />
        {/* Tarjeta 4 */}
        <StatCardDarkMode 
          icon={<Award size={32} />} 
          target="4" 
          label="Años de Experiencia" 
          symbol=""
          accentColor="text-white"
        />
      </div>
    </div>
  </section>

  );
  
}

const StatCardDarkMode = ({ icon, target, label, symbol, accentColor }) => (
  <div className="relative group p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 text-center">
    {/* Icono con resplandor */}
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/10 ${accentColor} shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    
    {/* Número animado */}
    {symbol === '%' ? (
      <div className="text-5xl font-black text-white mb-2 tabular-nums tracking-tighter">
        <Counter target={target} />{symbol}
      </div>
    ) : (
      <div className="text-5xl font-black text-white mb-2 tabular-nums tracking-tighter">
        {symbol}<Counter target={target} />
      </div>
    )}
    
    {/* Etiqueta */}
    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">
      {label}
    </p>

    {/* Línea decorativa inferior que crece al hacer hover */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-1 bg-regalo-azul-c group-hover:w-12 transition-all duration-200 rounded-full"></div>
  </div>
);