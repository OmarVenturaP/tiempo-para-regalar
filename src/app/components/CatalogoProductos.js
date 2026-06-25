"use client";
import Image from 'next/image';
import { useState, useMemo, useEffect, useRef } from 'react';

export default function CatalogoProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [orden, setOrden] = useState("default");

  const PRODUCTOS_POR_PAGINA = 8;
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const peticionDatos = fetch('/api/productos');
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
        console.error("Error cargando datos:", err); 
        setError("No pudimos cargar los productos. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    }
    cargarProductos();
  }, []);



  const categorias = useMemo(() => {
    return ["Todas", ...new Set(productos.map(p => p.categoria))];
  }, [productos]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, categoria, orden]);

  const productosFiltrados = useMemo(() => {
    let resultado = productos.filter((p) => {
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoria === "Todas" || p.categoria === categoria;
      return coincideBusqueda && coincideCategoria;
    });

    const resultadoOrdenado = [...resultado];

    if (orden === "default") {
      resultadoOrdenado.sort((a, b) => {
        const prioridad = { "mas vendidos": 1, "oferta": 2, "nuevo": 3, "normal": 4 };
        const estadoA = a.estado ? a.estado.toLowerCase() : "normal";
        const estadoB = b.estado ? b.estado.toLowerCase() : "normal";
        const aPrio = prioridad[estadoA] || 4;
        const bPrio = prioridad[estadoB] || 4;
        return aPrio - bPrio;
      });
    } else if (orden === "precio-bajo") {
      resultadoOrdenado.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-alto") {
      resultadoOrdenado.sort((a, b) => b.precio - a.precio);
    } else if (orden === "nuevos") {
      resultadoOrdenado.sort((a, b) => (a.estado === "nuevo" ? -1 : b.estado === "nuevo" ? 1 : 0));
    } else if (orden === "oferta") {
      resultadoOrdenado.sort((a, b) => (a.estado === "oferta" ? -1 : b.estado === "oferta" ? 1 : 0));
    }

    return resultadoOrdenado;
  }, [productos, busqueda, categoria, orden]);

  const indiceUltimoProducto = paginaActual * PRODUCTOS_POR_PAGINA;
  const indicePrimerProducto = indiceUltimoProducto - PRODUCTOS_POR_PAGINA;
  const productosVisibles = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);

  const gridRef = useRef(null);

const cambiarPagina = (numero) => {
    if (gridRef.current) {
      gridRef.current.style.minHeight = `${gridRef.current.offsetHeight}px`;
    }

    setPaginaActual(numero);

    setTimeout(() => {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    setTimeout(() => {
      if (gridRef.current) {
        gridRef.current.style.minHeight = ''; 
      }
    }, 800);
  };


  return (
    <div>
      <section className="bg-white border-b border-gray-200 px-6 mt-12 py-6">
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
              <option value="oferta">Ofertas y Promociones</option>
              <option value="precio-bajo">Precio: Menor a Mayor</option>
              <option value="precio-alto">Precio: Mayor a Menor</option>
              <option value="nuevos">Recién llegados (Nuevos)</option>
            </select>
          </div>
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
            {productosFiltrados.length} resultados encontrados
          </p>
        </div>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : productosVisibles.length > 0 ? (
          <>
            <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mb-12 animate-in fade-in duration-500">
              {productosVisibles.map((producto) => (
                <TarjetaProducto 
                  key={producto.id} 
                  producto={producto} 
                />
              ))}
            </div>

            {totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className={`px-4 py-2 rounded-lg font-bold transition ${
                    paginaActual === 1 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-white text-regalo-azul-c border border-gray-200 hover:bg-regalo-azul-c hover:text-white"
                  }`}
                >
                  ❮<span className='hidden sm:block'> Anterior</span>
                </button>

                <div className="flex gap-1 overflow-x-auto max-w-[200px] md:max-w-none">
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                    <button
                      key={numero}
                      onClick={() => cambiarPagina(numero)}
                      className={`w-10 h-10 rounded-lg font-bold transition ${
                        paginaActual === numero
                          ? "bg-regalo-azul-c text-white shadow-md"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {numero}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`px-4 py-2 rounded-lg font-bold transition ${
                    paginaActual === totalPaginas
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-white text-regalo-azul-c border border-gray-200 hover:bg-regalo-azul-c hover:text-white"
                  }`}
                >
                  <span className='hidden sm:block'>Siguiente </span>❯
                </button>
              </div>
            )}
            
            <p className="text-center text-gray-400 text-sm mt-4">
              Página {paginaActual} de {totalPaginas}
            </p>
          </>
        ) : (
          !error && <div></div>
        )}
      </section>

      {/* SECCIÓN DE ALERTAS */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
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

        {!error && !loading && productosFiltrados.length === 0 && (
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

      <section className="bg-gray-50 py-12 px-6 border-t border-gray-200 mt-12 hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Regalos en Tonalá, Chiapas con entrega a domicilio
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            En <strong>Tiempo para Regalar</strong> nos especializamos en hacer sonreír a tus seres queridos. 
            Ofrecemos entrega a domicilio de <strong>mochilas, bolsas de mano, termos, perfumes originales y accesorios de moda</strong>. 
            Somos tu mejor opción para regalos en toda la región de la zona costa de Arriaga y Tonala Chiapas.
          </p>
        </div>
      </section>

      <BotonWhatsappFlotante />
    </div>
  );
}

// --- COMPONENTES AUXILIARES ---

// 1. SKELETON CARD
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg h-full overflow-hidden border-2 border-transparent p-4 animate-pulse">
      <div className="bg-gray-200 h-48 sm:h-64 rounded-xl mb-4 w-full"></div>
      <div className="flex justify-center mb-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="flex justify-center mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
    </div>
  );
};

// 2. BOTÓN FLOTANTE WHATSAPP (CON ANIMACIÓN PREMIUM Y LÓGICA DE OCULTAR)
const BotonWhatsappFlotante = () => {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <a 
        href="https://wa.me/5219619326135?text=Hola,%20quisiera%20más%20información%20sobre%20tus%20productos." 
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        {/* EFECTO DE PULSO/PING (Onda expansiva) */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping"></span>
        
        {/* BOTÓN PRINCIPAL */}
        <span className="relative bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-1xl transition-all hover:scale-110 flex items-center gap-2">
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </span>
      </a>
    </div>
  );
};

const Badge = ({ estado }) => {
  if (!estado) return null;
  const estilos = {
    nuevo: "bg-regalo-azul-c text-white",
    agotado: "bg-gray-500 text-white",
    oferta: "bg-regalo-amarillo text-red-800",
  };
  return (
    <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-md z-10 ${estilos[estado] || "bg-regalo-lila text-white"}`}>
      {estado}
    </span>
  );
};

const BadgeTemporada = ({ temporadas }) => {
  if (!temporadas || temporadas.length === 0) return null;
  const obtenerTemporadaActivaHoy = () => {
    const fecha = new Date();
    const mes = fecha.getMonth() + 1; 
    const dia = fecha.getDate();
    if (mes === 1 && dia >= 1 && dia < 10) return 'niños';
    if (mes === 2 && dia <= 15) return 'amor';
    if (mes === 4 && dia >= 10 &&  mes ===5 && dia < 2) return 'niños';
    if (mes === 5 && dia <= 15) return 'madre';
    if (mes === 6 && dia <= 20) return 'padre';
    if (mes === 12) return 'regalos'; 
    return null;
  };

  const temporadaActivaHoy = obtenerTemporadaActivaHoy();
  const listaTemporadasProducto = Array.isArray(temporadas) ? temporadas : temporadas.split(', ').map(t => t.toLowerCase().trim());
  const esTemporadaActual = listaTemporadasProducto.includes(temporadaActivaHoy);
  if (!esTemporadaActual) return null;

  const config = {
    amor: { texto: "Especial del amor", clase: "bg-red-500" },
    niños: { texto: "Especial para regalar", clase: "bg-blue-400" },
    madre: { texto: "Especial para Mamá", clase: "bg-rose-400" },
    padre: { texto: "Especial para Papá", clase: "bg-slate-700" },
    regalos: { texto: "Especial para regalar", clase: "bg-red-600" },
  };
  const { texto, clase } = config[temporadaActivaHoy] || { texto: "Temporada", clase: "bg-gray-500" };

  return (
    <span className={`absolute top-7 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shadow-lg z-10 text-white animate-bounce-slow ${clase}`}>
      ✨ {texto}
    </span>
  );
};

function toSlug(nombre, id) {
  const slug = nombre
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúüñ]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${slug}-${id}`;
}

function TarjetaProducto({ producto }) {
  const scrollRef = useRef(null);
  const [imgIndex, setImgIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setImgIndex(idx);
  };

  const prevImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const prevIdx = (imgIndex - 1 + producto.imagenes.length) % producto.imagenes.length;
    el.scrollTo({ left: prevIdx * el.clientWidth, behavior: 'smooth' });
    setImgIndex(prevIdx);
  };

  const nextImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const nextIdx = (imgIndex + 1) % producto.imagenes.length;
    el.scrollTo({ left: nextIdx * el.clientWidth, behavior: 'smooth' });
    setImgIndex(nextIdx);
  };

  const productHref = `/producto/${toSlug(producto.nombre, producto.id_producto)}`;

  return (
    <div className="group bg-white rounded-2xl shadow-md flex flex-col h-full overflow-hidden border border-transparent hover:border-regalo-lila transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-36 sm:h-48 overflow-hidden bg-gray-200">
        <Badge estado={producto.estado} />
        <BadgeTemporada temporadas={producto.temporadas} />
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none h-full"
        >
          {producto.imagenes.map((url, i) => (
            <div key={i} className="relative w-full h-full shrink-0 snap-start">
              <Image
                src={url}
                alt={producto.nombre}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        <a href={productHref} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
        {producto.imagenes.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow text-gray-600 hover:text-regalo-lila transition z-20 text-sm">❮</button>
            <button onClick={nextImg} className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow text-gray-600 hover:text-regalo-lila transition z-20 text-sm">❯</button>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none z-20">
              {producto.imagenes.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? 'bg-white w-2.5' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold text-regalo-rosa shadow pointer-events-none z-20">
          {producto.categoria}
        </div>
      </div>

      <div className="p-3 text-center">
        {producto.vendidos > 0 ? (
          <p className="text-[10px] font-bold text-gray-400 mb-0.5 flex items-center justify-center gap-1">
            <span className="text-regalo-rosa">★</span> +{producto.vendidos} vendidos
          </p>
        ) : (
          <p className="text-[10px] font-bold text-gray-300 mb-0.5 flex items-center justify-center gap-1 italic">
            <span className="text-regalo-rosa">★</span> Nuevo
          </p>
        )}
        <h3 className="text-sm font-bold leading-tight mb-1 group-hover:text-regalo-lila transition line-clamp-2">{producto.nombre}</h3>
        <div className="flex justify-center items-center gap-2 mb-2">
          {producto.precioOriginal && (
            <span className="text-gray-400 line-through text-xs">${producto.precioOriginal}</span>
          )}
          <p className="text-lg font-black text-regalo-lila">${producto.precio}</p>
        </div>
        <a
          href={productHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full py-2 rounded-lg text-xs font-bold transition-colors shadow-sm hover:shadow-md ${
            producto.estado === 'agotado'
            ? 'bg-gray-300 cursor-not-allowed pointer-events-none'
            : 'bg-linear-to-r from-[#7C3AED] to-[#EC4899] hover:bg-regalo-lila text-white'
          }`}
        >
          {producto.estado === 'agotado' ? 'Sin Stock' : 'Ver Detalle'}
        </a>
      </div>
    </div>
  );
}