import CardsPosts from '@/components/CardsPosts'
import PageTab from '@/components/PageTab'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recents · TabNews - Unofficial Redesign',
  description: 'Unofficial Redesign TabNews',
}

export default function Recents() {
  return (
    <PageTab>
      <CardsPosts page={'new'} keyPage={'new_recents'} />
    </PageTab>
  )
}
