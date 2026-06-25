import { getPool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { slug } = await params;
  const id = extractId(slug);

  if (!id) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const pool = getPool();

  try {
    const [rows] = await pool.query('CALL sp_obtener_catalogo_completo_marisol()');
    const productos = rows[0];
    const producto = productos.find(p => Number(p.id_producto) === Number(id));

    if (!producto) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function extractId(slug) {
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
}
