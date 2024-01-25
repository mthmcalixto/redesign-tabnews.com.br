import CardsPosts from '@/components/CardsPosts'
import PageTab from '@/components/PageTab'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comments · TabNews - Unofficial Redesign',
  description: 'Unofficial Redesign TabNews',
}

export default function Comments() {
  return (
    <PageTab>
      <CardsPosts page={'new'} keyPage={'comments'} />
    </PageTab>
  )
}
