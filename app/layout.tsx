import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>
        {children}
        {/* Footer placement removed; will be included in page component */}
      </body>
    </html>
  )
}
