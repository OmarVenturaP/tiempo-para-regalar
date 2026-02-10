"use client";
import { useState, useMemo, useEffect } from 'react';

export default function CatalogoProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [imgIndexModal, setImgIndexModal] = useState(0);
  const [error, setError] = useState(null);
  
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [orden, setOrden] = useState("default");

  useEffect(() => {
    async function cargarProductos() {
      try {

        // 1. Iniciamos la petición y el temporizador de 3 segundos al mismo tiempo
        const peticionDatos = fetch('/api/productos');

        // 2. Esperamos a que ambos terminen (el que tarde más mandará)
        const [res] = await Promise.all([peticionDatos]);
        
        if (!res.ok) throw new Error("No se pudo conectar con la base de datos");
        const data = await res.json();

        const productosFormateados = data.map(p => ({
          ...p,
          id: p.id_producto, 
          precio: p.precio_oferta, 
          precioOriginal: p.precio_original,
          imagenes: p.imagenes ? p.imagenes.split(' | ') : [], 
          colores: p.colores ? p.colores.split(', ') : []      
        }));

        setProductos(productosFormateados);
      } catch (err) {
        console.error("Error cargando datos:", err); // Corregido 'error' por 'err'
      }
    }
    cargarProductos();
  }, []);

  // OBTENER CATEGORÍAS ÚNICAS
  const categorias = useMemo(() => {
    return ["Todas", ...new Set(productos.map(p => p.categoria))];
  }, [productos]);

  // LÓGICA DE FILTRADO Y ORDENADO
  const productosFiltrados = useMemo(() => {
    let resultado = productos.filter((p) => {
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoria === "Todas" || p.categoria === categoria;
      return coincideBusqueda && coincideCategoria;
    });

    const resultadoOrdenado = [...resultado];

    if (orden === "default") {
      resultadoOrdenado.sort((a, b) => {
        const prioridad = { "mas vendidos": 1, "nuevo": 2, "normal": 3 };
        const aPrio = prioridad[a.estado] || 3;
        const bPrio = prioridad[b.estado] || 3;
        return aPrio - bPrio;
      });
    } else if (orden === "precio-bajo") {
      resultadoOrdenado.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-alto") {
      resultadoOrdenado.sort((a, b) => b.precio - a.precio);
    } else if (orden === "nuevos") {
      resultadoOrdenado.sort((a, b) => (a.estado === "nuevo" ? -1 : b.estado === "nuevo" ? 1 : 0));
    }

    return resultadoOrdenado;
  }, [productos, busqueda, categoria, orden]);

  return (
    <div>
      <section
        className="bg-white border-b border-gray-200 px-6 mt-12 py-6">
        <h2 id="catalogo" className="scroll-mt-24 text-3xl font-bold text-center py-6">
          Nuestros <span className="text-regalo-lila">productos</span>
        </h2>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-gray-500 uppercase">Categoría:</span>
            <select 
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-regalo-azul-c"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-gray-500 uppercase">Ordenar por:</span>
            <select 
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-regalo-azul-c"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="default">Relevancia</option>
              <option value="precio-bajo">Precio: Menor a Mayor</option>
              <option value="precio-alto">Precio: Mayor a Menor</option>
              <option value="nuevos">Recién llegados (Nuevos)</option>
            </select>
          </div>
          {/* BARRA DE BÚSQUEDA */}
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="Buscar un regalo..."
              className=" w-full px-4 py-2 rounded-full border-2 border-gray-100 focus:border-regalo-azul-c outline-none transition"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-400 ml-auto italic">
            Mostrando {productosFiltrados.length} resultados
          </p>
        </div>
      </section>
            {/* GRID DE PRODUCTOS */}
      <section 
      className="max-w-7xl mx-auto py-12 px-4">
      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {productosFiltrados.map((producto) => (
            <TarjetaProducto 
              key={producto.id} 
              producto={producto} 
              onOpenModal={() => setProductoSeleccionado(producto)}
            />
          ))}
        </div>
      ) : (
        /* Mostrar mensaje de no resultados solo si no hay error */
        !error && (
          <div>
          </div>
        )
      )}
      </section>
      {/* SECCIÓN DE ALERTAS Y FEEDBACK */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        {/* ERROR TÉCNICO (Archivo dañado o datos nulos) */}
        {error && (
          <div className="bg-red-50 border-l-4 border-regalo-rosa p-4 rounded-r-xl my-4">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="text-regalo-rosa font-bold">Error de sistema</h3>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* ERROR DE FILTRO (No se encontró nada con esa búsqueda) */}
        {!error && productosFiltrados.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-400">¡Ups! No encontramos productos</h3>
            <p className="text-gray-400 mb-6">Prueba con otras palabras, cambia la categoría o recarga la página.</p>
            <button 
              onClick={() => {setBusqueda(""); setCategoria("Todas"); setOrden("default");}}
              className="bg-regalo-azul-c text-white px-6 py-2 rounded-full font-bold hover:bg-regalo-azul-r transition"
            >
              Ver todos los productos
            </button>
          </div>
        )}
        </section>
                {/* MODAL DE DETALLE */}
        {productoSeleccionado && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
              <button 
                onClick={() => {
                  setProductoSeleccionado(null);
                  setImgIndexModal(0); // Reiniciar el índice al cerrar
                }}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-regalo-rosa shadow-md transition-colors font-bold"
              >✕</button>
              
              <div className="flex flex-col md:flex-row">
                {/* LADO IZQUIERDO: CARRUSEL DEL MODAL */}
                <div className="md:w-1/2 relative bg-gray-100">
                  <img 
                    src={productoSeleccionado.imagenes[imgIndexModal]} 
                    alt={productoSeleccionado.nombre} 
                    className="w-full h-full object-cover transition-opacity duration-500" 
                  />
                  
                  {/* Controles del Carrusel */}
                  {productoSeleccionado.imagenes.length > 1 && (
                    <>
                      <button 
                        onClick={() => setImgIndexModal((prev) => (prev - 1 + productoSeleccionado.imagenes.length) % productoSeleccionado.imagenes.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg text-regalo-azul-r hover:bg-regalo-azul-c hover:text-white transition-all"
                      >❮</button>
                      
                      <button 
                        onClick={() => setImgIndexModal((prev) => (prev + 1) % productoSeleccionado.imagenes.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg text-regalo-azul-r hover:bg-regalo-azul-c hover:text-white transition-all"
                      >❯</button>

                      {/* Indicadores (Dots) */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {productoSeleccionado.imagenes.map((_, i) => (
                          <button 
                            key={i}
                            onClick={() => setImgIndexModal(i)}
                            className={`h-2 rounded-full transition-all ${i === imgIndexModal ? 'w-8 bg-regalo-rosa' : 'w-2 bg-white/70'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* LADO DERECHO: INFORMACIÓN */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                  <span className="text-regalo-azul-c font-bold text-sm uppercase tracking-widest">
                    {productoSeleccionado.categoria}
                  </span>
                  {productoSeleccionado.vendidos > 10 && (
                    <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                      🔥 Popular
                    </span>
                  )}
                </div>
                  <h3 className="text-4xl font-black text-regalo-azul-r mt-2 leading-tight">{productoSeleccionado.nombre}</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Más de <span className="font-bold text-gray-800">{productoSeleccionado.vendidos} personas</span> han regalado esto.
                  </p>
                  
                  <p className="text-gray-600 mt-6 text-lg leading-relaxed">{productoSeleccionado.descripcion}</p>
                  
                  <div className="mt-8">
                    <p className="font-bold text-gray-800">Colores disponibles:</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {productoSeleccionado.colores.map(c => (
                        <span key={c} className="px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium border border-gray-100 text-gray-700 italic">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-10 p-6 bg-regalo-azul-c/5 rounded-3xl">
                    <p className="text-5xl font-black text-regalo-rosa">${productoSeleccionado.precio}</p>
                    {productoSeleccionado.precioOriginal && (
                      <div className="flex flex-col border-l-2 border-gray-200 pl-4">
                        <span className="text-gray-400 line-through text-base">${productoSeleccionado.precioOriginal}</span>
                        <span className="text-regalo-rosa font-black text-sm">
                          -{Math.round(100 - (productoSeleccionado.precio * 100 / productoSeleccionado.precioOriginal))}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <button 
                  onClick={() => {
                      const telefono = "5219619326135"; 
                      const mensaje = `Hola! 👋 Me interesa obtener más información sobre: 
                  *${productoSeleccionado.nombre}* Precio: *$${productoSeleccionado.precio}* ¿Tienen disponibilidad?`;
                      
                      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                      window.open(url, '_blank');
                    }}
                    className="mt-8 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Preguntar por WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

const Badge = ({ estado }) => {
  if (!estado) return null;
  
  const estilos = {
    nuevo: "bg-regalo-azul-c text-white",
    agotado: "bg-gray-500 text-white",
    oferta: "bg-regalo-amarillo text-red-800",
  };

  return (
    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md z-10 ${estilos[estado] || "bg-regalo-lila text-white"}`}>
      {estado}
    </span>
  );
};

const BadgeTemporada = ({ temporadas }) => {
  // 1. Si el producto no tiene temporadas asignadas, no mostramos nada
  if (!temporadas || temporadas.length === 0) return null;

  // 2. Función para obtener qué temporada "toca" hoy según el calendario
  const obtenerTemporadaActivaHoy = () => {
    const fecha = new Date();
    const mes = fecha.getMonth() + 1; // Enero es 1
    const dia = fecha.getDate();

    if (mes === 1 && dia >= 1 && dia < 10) return 'niños';
    if (mes === 2 && dia <= 15) return 'amor';
    if (mes === 4 && dia >= 10 &&  mes ===5 && dia < 2) return 'niños';
    if (mes === 5 && dia <= 15) return 'madre';
    if (mes === 6 && dia <= 20) return 'padre';
    if (mes === 12) return 'regalos'; // Temporada Navideña / Regalos generales
    
    return null;
  };

  const temporadaActivaHoy = obtenerTemporadaActivaHoy();

  const listaTemporadasProducto = Array.isArray(temporadas) 
    ? temporadas 
    : temporadas.split(', ').map(t => t.toLowerCase().trim());

  const esTemporadaActual = listaTemporadasProducto.includes(temporadaActivaHoy);
  // Si el producto no pertenece a la temporada que estamos viviendo hoy, no mostramos el badge
  if (!esTemporadaActual) return null;

  // 4. Configuración de estilos y nombres visuales
  const config = {
    amor: { texto: "Especial del amor", clase: "bg-red-500" },
    niños: { texto: "Especial para regalar", clase: "bg-blue-400" },
    madre: { texto: "Especial para Mamá", clase: "bg-rose-400" },
    padre: { texto: "Especial para Papá", clase: "bg-slate-700" },
    regalos: { texto: "Especial para regalar", clase: "bg-red-600" },
  };

  const { texto, clase } = config[temporadaActivaHoy];

  return (
    <span className={`absolute top-12 left-4 px-3 py-1 rounded-full text-[11px] font-black uppercase shadow-lg z-10 text-white animate-bounce-slow ${clase}`}>
      ✨ {texto}
    </span>
  );
};


// Sub-componente para la Tarjeta con Carrusel
function TarjetaProducto({ producto, onOpenModal }) {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % producto.imagenes.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + producto.imagenes.length) % producto.imagenes.length);
  };
  

  return (
    <div className="group bg-white rounded-3xl shadow-lg flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-regalo-lila transition-all duration-300 hover:shadow-2xl hover:bg-white/90 hover:backdrop-blur-lg hover:-translate-y-2">      {/* Carrusel */}
      <div className="relative h-80 overflow-hidden bg-gray-200">
      <Badge estado={producto.estado} />
      <BadgeTemporada temporadas={producto.temporadas} />
        <img src={producto.imagenes[imgIndex]} alt={producto.nombre} className="w-full h-full group-hover:scale-110 object-cover transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-regalo-rosa shadow">
                  {producto.categoria}
                </div>
        {producto.imagenes.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-regalo-azul-r">❮</button>
            <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-regalo-azul-r">❯</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {producto.imagenes.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === imgIndex ? 'bg-regalo-rosa' : 'bg-white/50'}`} />
                
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 text-center">
        {/* Texto de cantidad vendida */}
        {producto.vendidos > 0 ? (
          <p className="text-xs font-bold text-gray-400 mb-1 flex items-center justify-center gap-1">
            <span className="text-regalo-rosa">★</span> +{producto.vendidos} vendidos
          </p>
        ) : (
          <p className="text-xs font-bold text-gray-300 mb-1 flex items-center justify-center gap-1 italic">
          <span className="text-regalo-rosa">★</span> ¡Recién agregado! <span className="text-regalo-rosa">★</span>
          </p>
        )}
        <h3 className="text-xl font-bold mb-2 group-hover:text-regalo-lila transition">{producto.nombre}</h3>
        {/* Lógica de Precios */}
          <div className="flex justify-center items-center gap-3 mb-4">
          {producto.precioOriginal && (
            <span className="text-gray-400 line-through text-lg">${producto.precioOriginal}</span>
          )}
          <p className="text-2xl font-black text-regalo-lila">${producto.precio}</p>
        </div>
      <button 
        disabled={producto.estado === 'agotado'}
        onClick={onOpenModal}
        className={`w-full py-3 rounded-xl font-bold transition-colors shadow-md hover:shadow-xl ${
          producto.estado === 'agotado' 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-linear-to-r from-[#7C3AED] to-[#EC4899] hover:bg-regalo-lila text-white'
        }`}
      >
        {producto.estado === 'agotado' ? 'Sin Stock' : 'Ver Detalle'}
      </button>
      </div>
    </div>
  );
}