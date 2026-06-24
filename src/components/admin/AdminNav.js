"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('admin_name');
    router.replace('/login');
  };

  return (
    <nav className="bg-white border-b border-regalo-lila/10 py-4 px-8 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-regalo-rosa rounded-full animate-pulse"></div>
        <span className="font-black text-gray-800 tracking-tight">
          <Link href='/'>TIEMPO PARA REGALAR</Link>
        </span>
        <span className="hidden sm:inline text-[10px] font-bold text-regalo-lila uppercase bg-regalo-lila/10 px-3 py-1 rounded-full">Admin</span>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleLogout}
          className="text-sm font-bold text-regalo-rosa hover:text-regalo-lila transition flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
