import { QueryClientProvider } from '@/providers/QueryClientProvider'
import { ThemeProvider } from '@/providers/ThemeProdiver'
import { Footer, Header } from '@TabNewsUI'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { cx } from 'react-twc'
import './globals.css'

export const metadata: Metadata = {
  title: 'TabNews - Unofficial Redesign',
  description: 'Unofficial Redesign TabNews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt_BR" suppressHydrationWarning>
      <body
        className={cx(
          'antialiased bg-[#fafafa] dark:bg-[#0d1117] dark:text-[#e6edf3]',
          GeistSans.className
        )}
      >
        <Suspense fallback={null}>
          <QueryClientProvider>
            <ThemeProvider
              attribute="class"
              enableColorScheme={false}
              enableSystem
            >
              <Header />
              {children} <Analytics />
              <Footer />
            </ThemeProvider>
          </QueryClientProvider>
        </Suspense>
      </body>
    </html>
  )
}
