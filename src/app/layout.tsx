import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meu Remédio — Bula calma, genéricos e horários com voz humana',
  description:
    'Aplicativo brasileiro feito para entender qualquer remédio com clareza, ouvir em voz natural, comparar diferenças reais entre genéricos e controlar seus horários.',
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F6F4EF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#ECE8E0] text-[#1C1917] font-sans selection:bg-[#146356]/15 selection:text-[#146356]">
        {children}
      </body>
    </html>
  );
}
