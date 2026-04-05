
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { FavoritesProvider } from '@/lib/favorites-context'
import './globals.css'
import GlobalLoader from '@/components/global-loader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'StyleMuse — Timeless Luxury Fashion',
  description: 'Discover curated luxury fashion collections at StyleMuse. Shop premium dresses, bags, jewelry, and accessories from the world\'s finest designers.',
  keywords: 'luxury fashion, designer clothing, premium accessories, StyleMuse, high-end fashion',
    icons: {
    icon: '/images/favicon.png', 
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    title: 'StyleMuse — Timeless Luxury Fashion',
    description: 'Discover curated luxury fashion collections. Shop premium dresses, bags, jewelry and accessories.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <FavoritesProvider>
          <GlobalLoader />
          {children}
        </FavoritesProvider>
        <Analytics />
      </body>
    </html>
  )
}
