import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Dancing_Script, Kalam } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ParticleBackground } from '@/components/particle-background'
import CombinedFooter from '@/components/CombinedFooter'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OpenBook',
  description: 'AI-powered learning notebook',
  generator: 'v0.dev',
  metadataBase: new URL(process.env.SITE_URL || 'https://openbook.ai'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable} ${kalam.variable}`} suppressHydrationWarning>
      <body className="font-sans dot-pattern">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ParticleBackground />
          <div className="flex min-h-screen flex-col">
            {children}
            <CombinedFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
