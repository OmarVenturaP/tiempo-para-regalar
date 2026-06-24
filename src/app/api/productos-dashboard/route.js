import { getPool } from '@/lib/db';
import { verifyToken, getTokenFromCookies } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const token = getTokenFromCookies(req);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const pool = getPool();

  try {
    const [rows] = await pool.query('CALL sp_obtener_productos_completos()');
    const productos = rows[0];
    return NextResponse.json(productos);
  } catch (error) {
    console.error('Error en la base de datos:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos', details: error.message },
      { status: 500 }
    );
  }
}
