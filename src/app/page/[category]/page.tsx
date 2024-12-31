import CardsPosts from '@/components/CardsPosts'
import PageTab from '@/components/PageTab'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params

  const metadataMap: Record<string, Metadata> = {
    all: {
      title: 'All · TabNews - Unofficial Redesign',
      description: 'Unofficial Redesign TabNews',
    },
    comments: {
      title: 'Comments · TabNews - Unofficial Redesign',
      description: 'Unofficial Redesign TabNews',
    },
    old: {
      title: 'Old · TabNews - Unofficial Redesign',
      description: 'Unofficial Redesign TabNews',
    },
    recents: {
      title: 'Recents · TabNews - Unofficial Redesign',
      description: 'Unofficial Redesign TabNews',
    },
  }

  return metadataMap[category] || {}
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  const validCategories = ['all', 'comments', 'old', 'recents']

  if (!validCategories.includes(category)) {
    notFound()
  }

  const pageProps = {
    all: { page: 'new' as const, keyPage: 'all', allPage: true },
    comments: { page: 'new' as const, keyPage: 'comments', allPage: false },
    old: { page: 'old' as const, keyPage: 'old', allPage: false },
    recents: { page: 'new' as const, keyPage: 'new_recents', allPage: false },
  }

  const { page, keyPage, allPage } =
    pageProps[category as keyof typeof pageProps]

  return (
    <PageTab>
      <CardsPosts page={page} allPage={allPage} keyPage={keyPage} />
    </PageTab>
  )
}
