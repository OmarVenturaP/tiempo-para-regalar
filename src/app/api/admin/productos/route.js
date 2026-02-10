import { getPool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const connection = await getPool().getConnection(); // Obtenemos conexión para la transacción
  try {
    const body = await req.json();
    const { 
      nombre, id_categoria, precio_original, precio_oferta, 
      descripcion, id_estado, imagenes, colores, temporadas 
    } = body;

    await connection.beginTransaction();

    // 1. Insertar el Producto Base
    const [prodResult] = await connection.query(
      `INSERT INTO cat_productos (nombre, id_categoria, precio_original, precio_oferta, descripcion, id_estado) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, id_categoria, precio_original, precio_oferta, descripcion, id_estado]
    );
    const id_producto = prodResult.insertId;

    // 2. Insertar Imágenes (Separando el string por '|')
    if (imagenes) {
      const imgArray = imagenes.split('|').map(url => url.trim());
      for (const url_imagen of imgArray) {
        if (url_imagen) await connection.query('INSERT INTO cat_images (id_producto, url_imagen) VALUES (?, ?)', [id_producto, url_imagen]);
      }
    }

    // 3. Insertar Colores
    if (colores && colores.length > 0) {
      for (const color of colores) {
        await connection.query('INSERT INTO cat_colores (id_producto, nombre) VALUES (?, ?)', [id_producto, color]);
      }
    }

    // 4. Insertar Temporadas
    if (temporadas && temporadas.length > 0) {
      for (const temp of temporadas) {
        await connection.query('INSERT INTO cat_temporadas (id_producto, nombre) VALUES (?, ?)', [id_producto, temp]);
      }
    }

    await connection.commit();
    return NextResponse.json({ success: true, id_producto });

  } catch (error) {
    await connection.rollback();
    console.error("Error en transacción:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    connection.release();
  }
}

export async function PUT(req) {
  const connection = await getPool().getConnection();
  try {
    const body = await req.json();
    const { 
      id_producto, nombre, id_categoria, precio_original, 
      precio_oferta, descripcion, vendidos, id_estado, imagenes, colores, temporadas
    } = body;
    await connection.beginTransaction();
    console.log(body)

    // 1. Actualizar datos base del producto
    await connection.query(
      `UPDATE cat_productos 
      SET 
        nombre=?, 
        id_categoria=?, 
        precio_original=?, 
        precio_oferta=?, 
        descripcion=?, 
        id_estado=?, 
        vendidos=?
       WHERE id_producto=?`,
      [nombre, id_categoria, precio_original, precio_oferta, descripcion, id_estado, vendidos, id_producto]
    );

    // 2. ACTUALIZAR IMÁGENES (Estrategia: Borrar todo e insertar lo nuevo)
    // Primero borramos las existentes
    await connection.query('DELETE FROM cat_images WHERE id_producto = ?', [id_producto]);

    if (imagenes) {
      const imgArray = imagenes.split('|').map(url => url.trim());
      for (const url_imagen of imgArray) {
        if (url_imagen) await connection.query('INSERT INTO cat_images (id_producto, url_imagen) VALUES (?, ?)', [id_producto, url_imagen]);
      }
    }

    // 3. ACTUALIZAR COLORES
    await connection.query('DELETE FROM cat_colores WHERE id_producto = ?', [id_producto]);
    if (colores && colores.length > 0) {
      for (const col of colores) {
        await connection.query('INSERT INTO cat_colores (id_producto, nombre) VALUES (?, ?)', [id_producto, col]);
      }
    }

    await connection.query('DELETE FROM cat_temporadas WHERE id_producto = ?', [id_producto]);

    if (temporadas && temporadas.length > 0) {
      for (const t of temporadas) {
        await connection.query('INSERT INTO cat_temporadas (id_producto, nombre) VALUES (?, ?)', [id_producto, t]);
      }
    }

    await connection.commit();
    return NextResponse.json({ success: true, message: 'Producto actualizado' });

  } catch (error) {
    await connection.rollback();
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    connection.release();
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const pool = getPool();

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    await pool.query('DELETE FROM cat_productos WHERE id_producto = ?', [id]);

    return NextResponse.json({ success: true, message: 'Eliminado correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}