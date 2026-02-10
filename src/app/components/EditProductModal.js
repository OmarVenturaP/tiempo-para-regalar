"use client";
import { useState, useEffect } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function EditProductModal({ producto, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [catalogos, setCatalogos] = useState({ categorias: [], estados: [] });
  
  const [form, setForm] = useState({
    id_producto: producto.id_producto,
    nombre: producto.nombre || '',
    id_categoria: producto.id_categoria || '',
    id_estado: producto.id_estado || '',
    precio_original: producto.precio_original || '',
    precio_oferta: producto.precio_oferta || '',
    descripcion: producto.descripcion || '',
    vendidos: producto.vendidos || '',
    imagenes: [],
    colores: [],
    temporadas: [] 
  });

  useEffect(() => {
    fetch('/api/catalogos').then(res => res.json()).then(setCatalogos);

    
    const imgsArray = producto.imagenes ? producto.imagenes.split(' | ') : [];
    const colsArray = producto.colores ? producto.colores.split(', ') : [];
  
    const tempsArray = producto.temporadas ? producto.temporadas.split(', ') : [];

    setForm(prev => ({
      ...prev,
      imagenes: imgsArray,
      colores: colsArray,
      temporadas: tempsArray
    }));
  }, [producto]);
  
  const handleNewImage = (url) => {
    setForm(prev => ({ ...prev, imagenes: [...prev.imagenes, url] }));
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const handleCheckbox = (tipo, valor) => {
    setForm(prev => {
      const lista = prev[tipo].includes(valor) 
        ? prev[tipo].filter(i => i !== valor) 
        : [...prev[tipo], valor];
      return { ...prev, [tipo]: lista };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      imagenes: form.imagenes.join(' | '),
      colores: form.colores,
      temporadas: form.temporadas 
    };

    const res = await fetch('/api/admin/productos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      onUpdate();
      onClose();
    } else {
      alert("Error al actualizar");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm text-gray-800">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 font-bold text-xl">✕</button>
        
        <h2 className="text-2xl font-black mb-6">✏️ Editar Producto</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          
          <div className="col-span-2">
            <span className="px-3 bg-primary/10 text-primary rounded-full text-sm">
              {(form.nombre || "").length}/30
            </span>
            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nombre</label>
            <input className="w-full p-4 border rounded-2xl" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} minLength={25} maxLength={30} />
          </div>

          <div className="col-span-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Descripción</label>
            <textarea className="w-full p-4 border rounded-2xl h-24 resize-none" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Precio original</label>
            <input type="number" className="w-full p-4 border rounded-2xl bg-white" placeholder="Precio Original" 
            value={form.precio_original} onChange={e => setForm({...form, precio_original: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Precio oferta</label>
            <input type="number" className="w-full p-4 border rounded-2xl bg-white" placeholder="Precio oferta" 
            value={form.precio_oferta} onChange={e => setForm({...form, precio_oferta: e.target.value})} />
          </div>
          <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-2">Vendidos</label>
          <input type="number" className="w-full p-4 border rounded-2xl bg-white" placeholder="Vendidos" 
          value={form.vendidos} onChange={e => setForm({...form, vendidos: e.target.value})} />
        </div>

          {/* Temporadas Checkboxes */}
          <div className="col-span-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="font-bold mb-3 text-gray-500 uppercase text-xs">Temporadas:</p>
          <div className="flex flex-wrap gap-4">
            {['niños','amor','madre','padre','regalos'].map(t => (
              <label key={t} className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-regalo-rosa"
                  checked={form.temporadas.includes(t)}
                  onChange={() => handleCheckbox('temporadas', t)} 
                />
                <span className="capitalize text-sm font-medium">{t}</span>
              </label>
            ))}
          </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Categoría</label>
            <select className="w-full p-4 border rounded-2xl bg-white" value={form.id_categoria} onChange={e => setForm({...form, id_categoria: e.target.value})}>
              {catalogos.categorias?.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Estado</label>
            <select className="w-full p-4 border rounded-2xl bg-white" value={form.id_estado} onChange={e => setForm({...form, id_estado: e.target.value})}>
              {catalogos.estados?.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
          </div>

          {/* --- GALERÍA DE MINIATURAS (IGUAL QUE EN NUEVO) --- */}
          <div className="col-span-2 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
          <label className="block text-sm font-bold text-gray-500 uppercase mb-4">Galería de Imágenes</label>
          <div className="flex flex-wrap gap-4">
            {form.imagenes.map((url, index) => (
              <div key={index} className="relative w-24 h-24 group">
                <img src={url} alt="edit" className="w-full h-full object-cover rounded-xl shadow-sm" />
                <button type="button" onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition">
                  ✕
                </button>
              </div>
            ))}
            <div className="w-24 h-24 flex items-center justify-center bg-white border rounded-xl overflow-hidden">
                <div className="scale-75"><ImageUploader onUploadSuccess={handleNewImage} /></div>
            </div>
          </div>
        </div>
          
     
        {/* Colores (Visualización simple) */}
        <div className="col-span-2">
          <label className="text-xs font-bold text-gray-400 uppercase">Colores</label>
          <input className="w-full p-3 border rounded-xl mb-2" 
            placeholder="Escribe y Enter para agregar..."
            onKeyDown={e => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                e.preventDefault();
                handleCheckbox('colores', e.target.value);
                e.target.value = '';
              }
            }} 
          />
          <div className="flex gap-2 flex-wrap">
            {form.colores.map(c => (
              <span key={c} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {c} <button type="button" onClick={() => handleCheckbox('colores', c)}>✕</button>
              </span>
            ))}
          </div>
        </div>

          <button disabled={loading} className="col-span-2 bg-regalo-rosa text-white py-5 rounded-2xl font-black text-xl hover:shadow-xl transition-all disabled:bg-gray-300 mt-4">
            {loading ? "GUARDANDO..." : "ACTUALIZAR PRODUCTO"}
          </button>
        </form>
      </div>
    </div>
  );
}