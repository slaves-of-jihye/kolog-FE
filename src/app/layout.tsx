import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';

const ydestreet = localFont({
  src: [
    {
      path: '../shared/assets/fonts/YdestreetL.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../shared/assets/fonts/YdestreetB.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-ydestreet',
  display: 'swap',
});

const okDanDan = localFont({
  src: '../shared/assets/fonts/OkDanDan-Bold.ttf',
  weight: '700',
  variable: '--font-ok-dan-dan',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'KOLOG',
  description: '당신의 하루를 특별하게 기록하세요.',
  icons: {
    apple: '/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KOLOG',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${ydestreet.variable} ${okDanDan.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
