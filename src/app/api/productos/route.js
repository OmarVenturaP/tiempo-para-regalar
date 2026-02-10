import { getPool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const pool = getPool();

  try {
    const [rows] = await pool.query('CALL sp_obtener_catalogo_completo_marisol()');
    const productos = rows[0];
    return NextResponse.json(productos);
  } catch (error) {
    console.error('❌ Error en la base de datos:', error);
    return NextResponse.json(
      { error: 'Error al conectar con Aiven', details: error.message },
      { status: 500 }
    );
  }
}