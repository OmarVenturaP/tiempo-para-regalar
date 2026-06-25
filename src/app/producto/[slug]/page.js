import { getPool } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductoDetalle from './ProductoDetalle';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const id = extractId(slug);
  if (!id) return {};

  const pool = getPool();
  const [rows] = await pool.query('CALL sp_obtener_catalogo_completo_marisol()');
  const producto = rows[0].find(p => Number(p.id_producto) === Number(id));
  if (!producto) return {};

  const imageUrl = producto.imagenes?.split('|')[0]?.trim();
  const desc = (producto.descripcion || '').slice(0, 160) || `Compra ${producto.nombre} en Tiempo para Regalar`;

  return {
    title: producto.nombre,
    description: desc,
    openGraph: {
      title: producto.nombre,
      description: desc,
      images: imageUrl ? [{ url: imageUrl, width: 800, height: 800 }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function extractId(slug) {
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const id = extractId(slug);

  if (!id) notFound();

  const pool = getPool();
  const [rows] = await pool.query('CALL sp_obtener_catalogo_completo_marisol()');
  const producto = rows[0].find(p => Number(p.id_producto) === Number(id));

  if (!producto) notFound();

  return <ProductoDetalle initialProducto={producto} slug={slug} />;
}
