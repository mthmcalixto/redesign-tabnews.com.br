import { Footer, Header } from '@TabNewsUI'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { cx } from 'react-twc'
import './globals.css'

export const metadata: Metadata = {
  title: 'TabNews',
  description: 'Redesign TabNews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt_BR">
      <body className={cx('antialiased', GeistSans.className)}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
