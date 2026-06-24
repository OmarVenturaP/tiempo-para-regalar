import { getPool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const pool = getPool();
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS cat_banners (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      titulo VARCHAR(200),
      descripcion TEXT,
      texto_boton VARCHAR(100),
      enlace_boton VARCHAR(500),
      activo BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

    const [rows] = await pool.query('SELECT * FROM cat_banners WHERE activo = true LIMIT 1');
    return NextResponse.json(rows[0] || null);
  } catch (error) {
    console.error("Error al obtener banner:", error);
    return NextResponse.json(null);
  }
}
