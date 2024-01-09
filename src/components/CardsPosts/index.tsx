import { ButtonsHeader } from '@TabNewsUI'
import GetPosts from '../GetPosts'

type PageProps = {
  page: 'new' | 'old' | 'relevant'
}

export default async function Posts({ page }: PageProps) {
  return (
    <div>
      <ButtonsHeader />
      <div className="mt-10">
        <GetPosts page={page} />
      </div>
    </div>
  )
}
