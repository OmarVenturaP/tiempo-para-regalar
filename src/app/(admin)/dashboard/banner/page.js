"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import Toast from '@/components/admin/Toast';
import Link from 'next/link';

export default function BannerAdmin() {
  const [banner, setBanner] = useState({
    nombre: 'principal',
    titulo: '',
    descripcion: '',
    texto_boton: '',
    enlace_boton: '',
    activo: true,
  });
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState({ show: false, msj: '', tipo: 'success' });
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/banners')
      .then(res => {
        if (res.status === 401) { router.replace('/login'); return null; }
        return res.json();
      })
      .then(data => {
        if (data) setBanner(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const guardar = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/banners', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(banner),
    });
    if (res.ok) {
      setAlerta({ show: true, msj: 'Banner guardado exitosamente', tipo: 'success' });
    } else {
      setAlerta({ show: true, msj: 'Error al guardar banner', tipo: 'error' });
    }
  };

  if (loading) return <p className="p-10 text-center">Cargando...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <AdminNav />
      <div className="flex items-center justify-between mb-8 mt-4">
        <h2 className="text-3xl font-black text-gray-800">Banner <span className="text-regalo-lila">Promocional</span></h2>
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-regalo-lila font-bold transition-colors group">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">❮</span>
          Volver al Dashboard
        </Link>
      </div>

      <form onSubmit={guardar} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-2">Título del banner</label>
          <input
            className="w-full p-4 border rounded-2xl mt-1"
            value={banner.titulo || ''}
            onChange={e => setBanner({...banner, titulo: e.target.value})}
            placeholder="Ej: ¡Anticipa tu regalo!"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-2">Descripción</label>
          <textarea
            className="w-full p-4 border rounded-2xl mt-1 h-24 resize-none"
            value={banner.descripcion || ''}
            onChange={e => setBanner({...banner, descripcion: e.target.value})}
            placeholder="Ej: Aparta desde $69 hoy y congela el precio..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Texto del botón</label>
            <input
              className="w-full p-4 border rounded-2xl mt-1"
              value={banner.texto_boton || ''}
              onChange={e => setBanner({...banner, texto_boton: e.target.value})}
              placeholder="Ej: Apartar ahora"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Enlace del botón</label>
            <input
              className="w-full p-4 border rounded-2xl mt-1"
              value={banner.enlace_boton || ''}
              onChange={e => setBanner({...banner, enlace_boton: e.target.value})}
              placeholder="Ej: https://wa.me/5219619326135"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={banner.activo}
            onChange={e => setBanner({...banner, activo: e.target.checked})}
            className="w-5 h-5 accent-regalo-verde"
          />
          <span className="font-bold text-gray-600">Banner activo</span>
        </label>

        <button className="w-full bg-regalo-lila text-white py-5 rounded-2xl font-black text-lg hover:shadow-xl transition-all">
          GUARDAR BANNER
        </button>
      </form>

      {alerta.show && (
        <Toast mensaje={alerta.msj} tipo={alerta.tipo} onClose={() => setAlerta({ ...alerta, show: false })} />
      )}
    </div>
  );
}
