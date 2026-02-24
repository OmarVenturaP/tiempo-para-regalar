import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const OG_IMAGE_URL = 'https://res.cloudinary.com/dzgqpqv9f/image/upload/c_fill,w_1200,h_630,g_auto,q_auto/v1766853724/WhatsApp_Image_2025-12-26_at_8.44.37_p.m._1_tgbc7c.jpg';

export const metadata = {
  metadataBase: new URL('https://tiempo-para-regalar.vercel.app'),

  verification: {
    google: 'jwuLiHBhENwEAKdOtLa7myx5apgnAH5a_aWYrwhdS6w',
  },

  title: {
    template: '%s | Tiempo para Regalar',
    default: 'Tiempo para Regalar | Más que un regalo, una experiencia',
  },
  
  
  description: 'Encuentra el regalo perfecto para toda ocasión. Accesorios, detalles , perfumes, mochilas, bolsos, relojes y sorpresas. Envíos a domicilio seguros. ¡Sorprende a quien más amas hoy!',
  
  // 3. PALABRAS CLAVE (Ayuda a que te encuentren)
  keywords: ['regalos', 'tonalá chiapas', 'detalles', 'sorpresas', 'amor y amistad', '14 de febrero', 'mama', 'papá', 'aniversario', 'flores eternas', 'perfumes', 'relojes', 'accesorios'],
  
  // 4. AUTOR Y CREADOR
  authors: [{ name: 'Tiempo para Regalar' }],
  creator: 'Servitec Tonalá',


  openGraph: {
    title: 'Tiempo para Regalar | Más que un regalo, una experiencia',
    description: 'Mira nuestro catálogo de regalos y accesorios. ¡Pide el tuyo hoy!',
    url: 'https://tiempo-para-regalar.vercel.app',
    siteName: 'Tiempo para Regalar',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Catálogo de Tiempo para Regalar',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  openGraph: {
    title: 'Tiempo para Regalar | Más que un regalo, una experiencia',
    description: 'Descubre los mejores regalos en Tonalá, Chiapas: accesorios, perfumes, mochilas, bolsos, relojes y sorpresas únicas. Envíos a domicilio seguros. ¡Haz tu pedido ahora!',
    url: 'https://tiempo-para-regalar.vercel.app',
    siteName: 'Tiempo para Regalar',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Catálogo exclusivo de Tiempo para Regalar en Tonalá',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },

  // 6. TWITTER CARD (Para X/Twitter)
  twitter: {
    card: 'summary_large_image',
    title: 'Tiempo para Regalar | Más que un regalo, una experiencia',
    description: 'Encuentra el detalle perfecto en Tonalá, Chiapas.',
    images: [OG_IMAGE_URL], 
  },
  
  // 7. ICONOS (Favicon)
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export const viewport = {
  themeColor: '#9B51E0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
