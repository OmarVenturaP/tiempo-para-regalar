"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import AdminNav from '@/components/admin/AdminNav';
import Toast from '@/components/admin/Toast';
import Link from 'next/link';

export default function NuevoProducto() {
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ show: false, msj: '', tipo: 'success' });
  const [prod, setProd] = useState({
    nombre: '',
    id_categoria: '',
    precio_original: '',
    precio_oferta: '',
    descripcion: '',
    id_estado: '',
    imagenes: [],
    colores: [],
    temporadas: []
  });
  const [catalogos, setCatalogos] = useState({ categorias: [], estados: [] });
  const [enviando, setEnviando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/catalogos')
      .then(res => res.json())
      .then(data => {
        if (data.categorias && data.estados) {
          setCatalogos({
            categorias: data.categorias,
            estados: data.estados,
          });
        }
      })
      .catch(console.error);
  }, []);

  const handleCheckbox = (tipo, valor) => {
    setProd(prev => {
      const lista = prev[tipo].includes(valor)
        ? prev[tipo].filter(i => i !== valor)
        : [...prev[tipo], valor];
      return { ...prev, [tipo]: lista };
    });
  };

  const handleNewImage = (url) => {
    setProd(prev => ({
      ...prev,
      imagenes: [...prev.imagenes, url]
    }));
  };

  const removeImage = (indexToDelete) => {
    setProd(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== indexToDelete)
    }));
  };

  const guardar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setLoading(true);

    const payload = {
      ...prod,
      imagenes: prod.imagenes.join('|') 
    };

    try {
      const res = await fetch('/api/admin/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setAlerta({ show: true, msj: "¡Producto guardado exitosamente!", tipo: 'success' });
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setAlerta({ show: true, msj: "Hubo un error al guardar", tipo: 'error' });
        setLoading(false);
      }
    } catch (error) {
      setAlerta({ show: true, msj: "Error de conexión", tipo: 'error' });
      setLoading(false);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-xl my-10">
      <AdminNav />
      <div className="flex items-center justify-between mb-8 mt-4">
        <h2 className="text-3xl font-black text-gray-800">Nuevo <span className="text-regalo-rosa">Producto</span></h2>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-gray-400 hover:text-regalo-lila font-bold transition-colors group"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">❮</span>
          Regresar al Dashboard
        </Link>
      </div>
      <form onSubmit={guardar} className="grid grid-cols-2 gap-6">
        <span className="px-3 bg-primary/10 text-primary rounded-full text-sm col-span-2">
          {(prod.nombre || "").length}/40
        </span>
        <input className="col-span-2 p-4 border rounded-2xl" placeholder="Nombre del producto (min 35 - 40 caracteres)" required
          onChange={e => setProd({...prod, nombre: e.target.value})} minLength={35} maxLength={40} />

        <div className="col-span-2">
          <label className="text-xs font-bold text-gray-400 uppercase ml-2">Descripción del Producto</label>
          <textarea
            className="w-full p-4 border rounded-2xl mt-1 h-32 focus:border-regalo-rosa outline-none resize-none"
            placeholder="Escribe aquí los detalles del producto, materiales, tamaño, etc..."
            value={prod.descripcion}
            required
            onChange={e => setProd({...prod, descripcion: e.target.value})}
          />
        </div>

        <select className="p-4 border rounded-2xl" required onChange={e => setProd({...prod, id_categoria: e.target.value})}>
          <option value="">Selecciona Categoría</option>
          {catalogos.categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>

        <select className="p-4 border rounded-2xl" required onChange={e => setProd({...prod, id_estado: e.target.value})}>
          <option value="">Selecciona Estado</option>
          {catalogos.estados.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
        </select>

        <input type="number" className="p-4 border rounded-2xl" placeholder="Precio Original"
          onChange={e => setProd({...prod, precio_original: e.target.value})} />

        <input type="number" className="p-4 border rounded-2xl" placeholder="Precio Oferta"
          onChange={e => setProd({...prod, precio_oferta: e.target.value})} />

        <div className="col-span-2 p-4 bg-gray-50 rounded-2xl">
          <p className="font-bold mb-3 text-gray-500 uppercase text-xs">Temporadas:</p>
          <div className="flex flex-wrap gap-4">
            {['niños','amor','madre','padre','regalos'].map(t => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" onChange={() => handleCheckbox('temporadas', t)} />
                <span className="capitalize">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <p className="font-bold mb-2 text-gray-500 uppercase text-xs">Colores (escribe y presiona Enter):</p>
          <input
            className="w-full p-4 border rounded-2xl"
            placeholder="Ej: Rojo, Azul, Dorado"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCheckbox('colores', e.target.value);
                e.target.value = '';
              }
            }}
          />
          <div className="flex gap-2 mt-2">
            {prod.colores.map(c => <span key={c} className="bg-regalo-rosa text-white px-3 py-1 rounded-full text-sm">{c}</span>)}
          </div>
        </div>

        <div className="col-span-2 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
          <label className="block text-sm font-bold text-gray-500 uppercase mb-4">Galería de Imágenes</label>

          <div className="flex flex-wrap gap-4 mb-4">
            {prod.imagenes.map((url, index) => (
              <div key={index} className="relative w-24 h-24 group">
                <img
                  src={url}
                  alt="preview"
                  className="w-full h-full object-cover rounded-xl shadow-sm border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600 transition-transform hover:scale-110"
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="w-24 h-24 flex items-center justify-center bg-white border rounded-xl overflow-hidden">
               <div className="scale-75 origin-center">
                  <ImageUploader onUploadSuccess={handleNewImage} />
               </div>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {prod.imagenes.length === 0 ? "No hay imágenes cargadas" : `${prod.imagenes.length} imágenes listas para guardar`}
          </p>
        </div>

        <button disabled={loading} className="col-span-2 bg-regalo-rosa text-white py-5 rounded-2xl font-black text-xl hover:shadow-xl transition-all disabled:bg-gray-300 mt-4">
          {loading ? "GUARDANDO..." : "GUARDAR PRODUCTO"}
        </button>
      </form>
      {alerta.show && (
        <Toast
          mensaje={alerta.msj}
          tipo={alerta.tipo}
          onClose={() => setAlerta({ ...alerta, show: false })}
        />
      )}
    </div>
  );
}
