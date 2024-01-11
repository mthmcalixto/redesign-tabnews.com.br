import { PageProps } from '@/types'
import { ButtonsHeader } from '@TabNewsUI'
import GetPosts from '../GetPosts'

export default async function Posts({ page, keyPage, allPage }: PageProps) {
  return (
    <div>
      <ButtonsHeader />
      <div className="mt-10">
        <GetPosts page={page} allPage={allPage} keyPage={keyPage} />
      </div>
    </div>
  )
}
