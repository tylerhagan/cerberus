import type { Metadata, Viewport } from 'next';
import { Barlow, Cinzel } from 'next/font/google';
import { guild, siteUrl } from '@/config/guild';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700', '900'],
  display: 'swap',
  variable: '--font-cinzel',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${guild.name} · ${guild.game}`,
  description: guild.lead,
  icons: { icon: '/favicon.ico', apple: '/icon.png' },
  openGraph: {
    title: `${guild.name} · ${guild.game}`,
    description: guild.lead,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${barlow.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-4 focus:py-2 focus:text-ground"
        >
          Skip to content
        </a>
        <div className="backdrop relative flex flex-col items-center overflow-hidden px-6 pb-20">
          <div
            aria-hidden="true"
            className="stone pointer-events-none absolute inset-0 opacity-55 mix-blend-screen"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMin slice"
            className="pointer-events-none absolute left-0 top-0 h-[900px] w-full opacity-90"
          >
            <defs>
              <linearGradient id="crack" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e63950" />
                <stop offset="0.5" stopColor="#c8102e" />
                <stop offset="1" stopColor="#c8102e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g
              className="crack-lines"
              stroke="url(#crack)"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M-20 120 L120 180 L160 260 L260 300 L300 420 L380 470" />
              <path d="M1460 80 L1340 160 L1290 250 L1180 290 L1140 400 L1060 450" />
              <path d="M200 -10 L230 90 L310 130" />
              <path d="M1220 -10 L1190 110 L1110 150" />
            </g>
            <g fill="#c8102e" opacity="0.8">
              <circle cx="160" cy="260" r="2.5" />
              <circle cx="300" cy="420" r="2" />
              <circle cx="1290" cy="250" r="2.5" />
              <circle cx="1140" cy="400" r="2" />
            </g>
          </svg>
          <div
            aria-hidden="true"
            className="backdrop-fade pointer-events-none absolute inset-x-0 bottom-0 h-[600px]"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
