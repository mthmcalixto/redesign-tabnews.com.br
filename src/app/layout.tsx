import { QueryClientProvider } from '@/providers/QueryClientProvider'
import { ThemeProvider } from '@/providers/ThemeProdiver'
import { Footer, Header } from '@TabNewsUI'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import { Suspense } from 'react'
import { cx } from 'react-twc'
import './globals.css'

import iconDark from '~/public/icons/favicoin.dark.svg'
import iconLignt from '~/public/icons/favicoin.white.svg'

export const metadata: Metadata = {
  title: 'TabNews - Unofficial Redesign',
  description: 'Unofficial Redesign TabNews',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: iconDark.src,
      type: 'image/svg+xml',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: iconLignt.src,
      type: 'image/svg+xml',
    },
  ],
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt_BR" suppressHydrationWarning>
      <body
        className={cx('bg-[#fafafa] dark:bg-[#0d1117] dark:text-[#e6edf3]')}
      >
        <NextTopLoader height={3} showSpinner={false} />
        <Suspense fallback={null}>
          <QueryClientProvider>
            <ThemeProvider
              attribute="class"
              enableColorScheme={false}
              enableSystem
            >
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </QueryClientProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
