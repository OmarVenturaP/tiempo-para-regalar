"use client";

export default function FacebookLive() {

  return (

    <section id="contacto" className="py-10 bg-linear-to-br from-white to-pink-50 overflow-hidden">
    <div className="max-w-7xl container mx-auto px-4">
      <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-pink-100 border-2 border-regalo-rosa/10 relative overflow-hidden">
        
        {/* Decoración de fondo sutil */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-regalo-rosa opacity-5 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          
          {/* LADO IZQUIERDO: Visual / Icono */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Círculo de pulso que simula "En Vivo" */}
              <div className="absolute -top-2 -left-2 flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider animate-pulse shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full"></span> En Vivo
              </div>
              
              <div className="bg-gray-100 w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] rotate-3 flex items-center justify-center overflow-hidden border-8 border-white shadow-xl">
                 <img 
                  src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1767021085/logo_pink_shop_mkqx5z.png" 
                  alt="Pink Shop Live" 
                  className="w-40 h-40 object-contain -rotate-3"
                 />
              </div>
              
              {/* Badge Flotante del Lema */}
              <div className="absolute -bottom-6 -right-6 bg-regalo-azul-r text-white p-6 rounded-3xl shadow-2xl -rotate-6 hidden md:block border-4 border-white">
                <p className="text-xl font-black italic">"Si compras, ganas"</p>
              </div>
            </div>
          </div>
  
          {/* LADO DERECHO: Contenido */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-black uppercase mb-4 tracking-widest">
              ¡Conéctate con nosotros!
            </span>
            <h2 className="text-5xl font-black text-regalo-azul-r leading-none tracking-tighter mb-6">
              Nuestras ofertas <br />
              <span className="text-regalo-rosa">cobran vida</span> en Facebook
            </h2>
            
            <p className="text-xl text-gray-500 mb-8 font-medium leading-relaxed">
              Sigue nuestras transmisiones y se de los primeros en vivir la experiencia de compras en vivo a precios de locura y con dinámicas increíbles.
            </p>

            {/* Lista de beneficios con estilo de "Tags" */}
            <div className="flex flex-wrap gap-3 mb-12">
              {['✅  Accesorios nuevos', '🎽  Ropa americana', '🎟️  Sorteos exclusivos', '🎁  Regalos por comprar'].map((item) => (
                <div  key={item} className="group-hover:scale-125 flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                  <span className="text-2xl group-hover:scale-125 transition-transform"></span>
                  <p className="text-sm font-bold text-gray-700 group-hover:scale-105 transition-transform">{item}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.open('https://www.facebook.com/people/Pink-shop/100087662107222/', '_blank')}
              className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white transition-all duration-200 bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200"
            >
              <svg className="w-6 h-6 mr-3 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              SIGUENOS EN FACEBOOK
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
              </span>
            </button>
          </div>
  
        </div>
      </div>
    </div>
  </section>

  );
}