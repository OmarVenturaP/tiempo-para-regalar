"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem('admin_name', data.user.nombre);
      router.push('/dashboard');
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-0 left-0 w-full p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-regalo-rosa font-bold transition-all group bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">❮</span>
          Volver al Inicio
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-[90%] max-w-md border border-gray-50 transform hover:scale-[1.01] transition-transform"
      >
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 p-3">
            <img
              src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1766933777/logo_bg_regalar_yfbuhv.png"
              alt="Tiempo para Regalar"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tighter">
            Tiempo para <span className="text-regalo-lila">Regalar</span>
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Panel de Control</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-bold text-center mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-1 block">Correo Electrónico</label>
            <input
              type="email"
              placeholder="admin@ejemplo.com"
              className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 focus:bg-white focus:border-regalo-lila outline-none transition-all"
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-1 block">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 focus:bg-white focus:border-regalo-lila outline-none transition-all"
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
            />
          </div>
        </div>

        <button className="w-full bg-regalo-lila text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-purple-200 hover:shadow-2xl hover:-translate-y-1 transition-all mt-8">
          ENTRAR AL PANEL
        </button>

        <p className="text-center mt-6 text-gray-400 text-xs font-medium">
          Tiempo para Regalar &copy; 2026
        </p>
      </form>
    </div>
  );
}
