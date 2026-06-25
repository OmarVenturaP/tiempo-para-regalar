'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductoDetalle({ initialProducto, slug }) {
  const [producto] = useState(initialProducto);
  const [relacionados, setRelacionados] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (producto?.categoria) {
      fetch('/api/productos')
        .then(r => r.json())
        .then(all => {
          const mismoCat = Array.isArray(all)
            ? all.filter(p => p.categoria === producto.categoria && Number(p.id_producto) !== Number(producto.id_producto))
            : [];
          setRelacionados(mismoCat.slice(0, 8));
        })
        .catch(() => {});
    }
  }, [producto?.categoria, producto?.id_producto]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    setImgIndex(Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth));
  };

  const prevImg = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    const prevIdx = (idx - 1 + imagenes.length) % imagenes.length;
    el.scrollTo({ left: prevIdx * el.clientWidth, behavior: 'smooth' });
    setImgIndex(prevIdx);
  };

  const nextImg = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    const nextIdx = (idx + 1) % imagenes.length;
    el.scrollTo({ left: nextIdx * el.clientWidth, behavior: 'smooth' });
    setImgIndex(nextIdx);
  };

  const imagenes = producto.imagenes ? producto.imagenes.split('|').map(s => s.trim()).filter(Boolean) : [];
  const colores = producto.colores ? producto.colores.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-regalo-lila font-bold">
          <span className="text-xl">❮</span>
          <span className="text-sm hidden sm:inline">Volver</span>
        </Link>
        <Link href="/" className="font-bold text-sm text-regalo-lila">Tiempo para Regalar</Link>
        <div className="w-12" />
      </header>

      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative bg-gray-100">
              <div className="relative aspect-square">
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none h-full w-full touch-pan-x"
                >
                  {imagenes.length > 0 ? imagenes.map((url, i) => (
                    <div key={i} className="relative w-full h-full shrink-0 snap-start">
                      <Image src={url} alt={producto.nombre} fill className="object-contain p-4" sizes="50vw" priority={i === 0} />
                    </div>
                  )) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">Sin imagen</div>
                  )}
                </div>
                {imagenes.length > 1 && (
                  <>
                    <button onClick={prevImg} className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-regalo-lila transition">❮</button>
                    <button onClick={nextImg} className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-regalo-lila transition">❯</button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
                      {imagenes.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === imgIndex ? 'bg-regalo-lila w-4' : 'bg-gray-300/60'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
              <span className="text-xs font-bold text-regalo-rosa uppercase tracking-widest">{producto.categoria}</span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mt-1 leading-tight">{producto.nombre}</h1>

              {producto.vendidos > 0 && (
                <p className="text-sm text-gray-500 mt-2">+{producto.vendidos} vendidos</p>
              )}

              <p className="text-gray-600 mt-4 text-sm leading-relaxed">{producto.descripcion}</p>

              {colores.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-gray-400 uppercase">Colores disponibles</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {colores.map(c => (
                      <span key={c} className="px-3 py-1 bg-gray-50 rounded-lg text-sm border border-gray-100">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-6 p-4 bg-regalo-lila/5 rounded-2xl">
                <p className="text-3xl font-black text-regalo-lila">${producto.precio_oferta}</p>
                {Number(producto.precio_original) > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-base">${producto.precio_original}</span>
                    <span className="bg-regalo-rosa/10 text-regalo-rosa px-2 py-0.5 rounded-full text-xs font-bold">
                      -{Math.round(100 - (producto.precio_oferta * 100 / producto.precio_original))}%
                    </span>
                  </div>
                )}
              </div>

              <a
                href={`https://wa.me/5219619326135?text=${encodeURIComponent(`Hola! Me interesa: ${producto.nombre} - $${producto.precio_oferta}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-black text-gray-800 mb-6">
              Más <span className="text-regalo-lila">{producto.categoria}</span> que te pueden gustar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {relacionados.map(p => (
                <RelacionadoCard key={p.id_producto} producto={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function toSlug(nombre, id) {
  const slug = nombre
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúüñ]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${slug}-${id}`;
}

function RelacionadoCard({ producto }) {
  const imgUrl = producto.imagenes?.split('|')[0]?.trim();
  return (
    <a
      href={`/producto/${toSlug(producto.nombre, producto.id_producto)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group block"
    >
      <div className="relative aspect-square bg-gray-50">
        {imgUrl ? (
          <Image src={imgUrl} alt={producto.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">Sin imagen</div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight">{producto.nombre}</p>
        <p className="text-base font-black text-regalo-lila mt-1">${producto.precio_oferta}</p>
      </div>
    </a>
  );
}
