export default function Footer() {
  return (
    <footer className="
      relative w-full
      bg-[#0A0916]
      backdrop-blur-md
    ">

      {/* Glow sutil */}
      <div className="absolute inset-x-0 -top-12 h-32 bg-regalo-lila/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-5 text-center">

        <p className="text-xs text-white/60 tracking-wide">
          © 2026 TIEMPO PARA REGALAR
        </p>

        <p className="mt-2 text-xs text-white/40">
          Diseñado por{" "}
          <a
            href="https://servitec-app.vercel.app/"
            target="_blank"
            className="text-regalo-lila hover:opacity-80 transition"
          >
            SERVITEC
          </a>
        </p>
      </div>
    </footer>
  );
}
