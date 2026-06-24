import { getPool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query('CALL sp_obtener_catalogos_admin()');

    return NextResponse.json({
      categorias: rows[0],
      estados: rows[1],
      vendedor: rows[2] || []
    });
  } catch (error) {
    console.error("Error cargando catálogos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}