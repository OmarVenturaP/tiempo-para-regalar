"use client";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">

      {/* HALOS */}
      <div className="absolute w-[420px] h-[420px] bg-regalo-lila/20 blur-[140px] rounded-full animate-softGlow" />
      <div className="absolute w-[300px] h-[300px] bg-regalo-azul-c/20 blur-[120px] rounded-full animate-softGlow delay-700" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8 animate-logoReveal">
          <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center
            shadow-[0_30px_80px_rgba(124,58,237,0.25)]
          ">
            <img
              src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1766933777/logo_bg_regalar_yfbuhv.png"
              alt="Tiempo para Regalar"
              className="w-24 h-24"
            />
          </div>

          <div className="absolute inset-0 rounded-full border border-regalo-lila/40 animate-ringExpand" />
        </div>

        <h1 className="text-2xl font-black tracking-tight animate-textReveal">
          <span className="text-regalo-lila">TIEMPO PARA </span>
          <span className="text-regalo-azul-r">REGALAR</span>
        </h1>

        <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-500 animate-claimReveal">
          Si compras, ganas
        </p>
      </div>

      {/* LOADER */}
      <div className="fixed bottom-6 w-64 h-[3px] rounded-full overflow-hidden bg-gray-200">
        <div className="h-full w-full bg-linear-to-r from-regalo-lila via-regalo-rosa to-regalo-azul-c animate-loaderPremium" />
      </div>
    </div>
  );
}
