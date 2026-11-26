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
  title: 'Meu Remédio — Bula fácil, genéricos e horários com voz humana',
  description:
  'Aplicativo brasileiro acessível feito para entender qualquer remédio com clareza, ouvir em voz natural, comparar diferenças reais entre genéricos e controlar seus horários.',
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F7F6F2',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html
          lang="pt-BR"
          suppressHydrationWarning
          className={`${plusJakarta.variable} ${inter.variable}`}
        >
          <body
            suppressHydrationWarning
            className="antialiased bg-[#ECE8E0] text-[#111827] font-sans selection:bg-[#0F766E]/15 selection:text-[#0F766E]"
          >
            {children}
          </body>
        </html>
        );
}
