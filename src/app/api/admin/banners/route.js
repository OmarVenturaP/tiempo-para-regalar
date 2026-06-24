import { getPool } from '@/lib/db';
import { verifyToken, getTokenFromCookies } from '@/lib/auth';
import { NextResponse } from 'next/server';

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
}

export async function GET(req) {
  const token = getTokenFromCookies(req);
  if (!token || !verifyToken(token)) return unauthorized();

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

    const [rows] = await pool.query('SELECT * FROM cat_banners ORDER BY id LIMIT 1');
    return NextResponse.json(rows[0] || null);
  } catch (error) {
    console.error("Error al obtener banner:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const token = getTokenFromCookies(req);
  if (!token || !verifyToken(token)) return unauthorized();

  const pool = getPool();
  try {
    const body = await req.json();
    const { nombre, titulo, descripcion, texto_boton, enlace_boton, activo } = body;

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

    const [existing] = await pool.query('SELECT id FROM cat_banners LIMIT 1');

    if (existing.length > 0) {
      await pool.query(
        `UPDATE cat_banners SET nombre=?, titulo=?, descripcion=?, texto_boton=?, enlace_boton=?, activo=? WHERE id=?`,
        [nombre, titulo, descripcion, texto_boton, enlace_boton, activo ?? true, existing[0].id]
      );
    } else {
      await pool.query(
        `INSERT INTO cat_banners (nombre, titulo, descripcion, texto_boton, enlace_boton, activo) VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, titulo, descripcion, texto_boton, enlace_boton, activo ?? true]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al guardar banner:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
