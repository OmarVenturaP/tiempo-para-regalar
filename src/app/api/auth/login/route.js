import { getPool } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const pool = getPool();

    const [rows] = await pool.query(
      'SELECT id_usuario, nombre, email FROM dat_usuarios WHERE email = ? AND password = ?', 
      [email, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      const token = signToken({ id: user.id_usuario, nombre: user.nombre, email: user.email });

      const response = NextResponse.json({ 
        success: true, 
        user: { id: user.id_usuario, nombre: user.nombre } 
      });

      response.cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Correo o contraseña incorrectos' }, 
      { status: 401 }
    );
  } catch (error) {
    console.error("Error en Login:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}