import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Dancing_Script, Kalam } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
})

const kalam = Kalam({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-handwriting',
})

export const metadata: Metadata = {
  title: 'OpenBook',
  description: 'AI-powered learning notebook',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable} ${kalam.variable}`}>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
