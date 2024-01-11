'use client'

import {
  QueryClientProvider as NextQueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <NextQueryClientProvider client={queryClient}>
      {children}
    </NextQueryClientProvider>
  )
}
