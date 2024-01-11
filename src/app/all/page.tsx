import CardsPosts from '@/components/CardsPosts'
import PageTab from '@/components/PageTab'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All · TabNews - Unofficial Redesign',
  description: 'Unofficial Redesign TabNews',
}

export default function All() {
  return (
    <PageTab>
      <CardsPosts page={'new'} allPage keyPage={'new_all'} />
    </PageTab>
  )
}
