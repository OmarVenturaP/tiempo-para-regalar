"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import EditProductModal from '@/app/components/EditProductModal';
import { Trash, Pencil, Search } from 'lucide-react';

const STATUS_LIST = ['nuevo', 'oferta', 'agotado'];

export default function DashboardPage() {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [categorias, setCategorias] = useState([]);
  const router = useRouter();

  const cargarProductos = async () => {
    try {
      const res = await fetch('/api/productos-dashboard');
      if (res.status === 401) { router.replace('/login'); return; }
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarProductos(); }, []);

  useEffect(() => {
    fetch('/api/catalogos').then(r => r.json()).then(d => setCategorias(d.categorias || [])).catch(() => {});
  }, []);

  const eliminarProducto = async (id) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return;
    const res = await fetch(`/api/admin/productos?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProductos(productos.filter(p => p.id_producto !== id));
    } else {
      const err = await res.json();
      alert(err.error || "Error al eliminar");
    }
  };

  const productosFiltrados = productos.filter(p => {
    const q = busqueda.toLowerCase();
    const coincideBusqueda = !q || p.nombre?.toLowerCase().includes(q) || p.categoria?.toLowerCase().includes(q);
    const coincideCategoria = !categoriaFiltro || String(p.id_categoria) === categoriaFiltro;
    const coincideEstado = !estadoFiltro || p.estado === estadoFiltro;
    return coincideBusqueda && coincideCategoria && coincideEstado;
  });

  if (loading) return <p className="p-10 text-center">Cargando panel...</p>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <AdminNav />
      <div className="flex justify-between items-center my-6 flex-wrap gap-4">
        <h1 className="text-3xl font-black text-gray-800">Catálogo <span className="text-regalo-lila">Admin</span></h1>
        <div className="flex gap-3">
          <Link href="/dashboard/banner" className="bg-regalo-lila/10 text-regalo-lila px-5 py-2 rounded-full font-bold hover:bg-regalo-lila hover:text-white transition whitespace-nowrap text-sm">
            Editar Banner
          </Link>
          <Link href="/dashboard/nuevo" className="bg-regalo-rosa text-white px-5 py-2 rounded-full font-bold hover:bg-regalo-lila transition whitespace-nowrap text-sm">
            + Agregar Nuevo
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Buscar producto..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-regalo-lila outline-none transition" />
        </div>
        <select value={categoriaFiltro} onChange={e => setCategoriaFiltro(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-regalo-lila outline-none transition">
          <option value="">Todas las categorías</option>
          {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setEstadoFiltro('')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition ${!estadoFiltro ? 'bg-regalo-lila text-white shadow-md' : 'bg-regalo-lila/10 text-regalo-lila hover:bg-regalo-lila/20'}`}>
          Todos
        </button>
        {STATUS_LIST.map(s => (
          <button key={s} onClick={() => setEstadoFiltro(estadoFiltro === s ? '' : s)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition ${estadoFiltro === s ? 'bg-regalo-rosa text-white shadow-md' : 'bg-regalo-rosa/10 text-regalo-rosa hover:bg-regalo-rosa/20'}`}>
            {s}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400 mb-4 font-medium">
        {productosFiltrados.length} de {productos.length} productos
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {productosFiltrados.map(p => (
          <div key={p.id_producto} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition group">
            <div className="relative aspect-square bg-gray-50">
              <img src={p.imagenes?.split('|')[0]?.trim()} alt={p.nombre}
                className="w-full h-full object-cover" />
              <Badge estado={p.estado} className="absolute top-2 left-2" />
            </div>
            <div className="p-3">
              <p className="font-bold text-sm text-gray-800 leading-tight truncate">{p.nombre}</p>
              <p className="text-[10px] text-gray-400 uppercase font-medium mt-0.5">{p.categoria}</p>
              <div className="mt-1.5">
                <span className="font-black text-regalo-verde text-sm">${p.precio_oferta}</span>
                {p.precio_original && <span className="text-[10px] text-gray-400 line-through ml-1">${p.precio_original}</span>}
              </div>
              <div className="flex gap-1.5 mt-2.5 md:opacity-0 md:group-hover:opacity-100 transition">
                <button onClick={() => setProductoAEditar(p)}
                  className="flex-1 flex items-center justify-center gap-1 bg-regalo-lila/10 text-regalo-lila py-1.5 rounded-lg text-[11px] font-bold hover:bg-regalo-lila hover:text-white transition">
                  <Pencil size={12} /> <span className="hidden sm:inline">Editar</span>
                </button>
                <button onClick={() => eliminarProducto(p.id_producto)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-500 py-1.5 rounded-lg text-[11px] font-bold hover:bg-red-500 hover:text-white transition">
                  <Trash size={12} /> <span className="hidden sm:inline">Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productoAEditar && (
        <EditProductModal
          key={productoAEditar.id_producto}
          producto={productoAEditar}
          onClose={() => setProductoAEditar(null)}
          onUpdate={cargarProductos}
        />
      )}
    </div>
  );
}

const Badge = ({ estado, className = '' }) => {
  if (!estado) return null;
  const estilos = {
    nuevo: "bg-regalo-verde text-white",
    agotado: "bg-gray-400 text-white",
    oferta: "bg-regalo-amarillo text-red-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${estilos[estado] || "bg-regalo-lila text-white"} ${className}`}>
      {estado}
    </span>
  );
};
