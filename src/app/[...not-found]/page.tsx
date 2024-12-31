import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: '404 - Not Found · TabNews - Unofficial Redesign',
}

export default function NotFoundCatchAll() {
  notFound()
}
