// import { PostsList } from '@/data/dataPosts'
// import { getPots } from '@/data/postsWithData'
import { Button } from '@TabNewsUI'
import InfiniteScroll from '../GetPosts'
import * as S from './styles'

export default async function Posts() {
  // const PostListTabNews = await getPots()

  return (
    <div>
      <S.FlexContainer>
        <S.Zinc500>Sort by:</S.Zinc500>
        <S.ListButtons>
          <Button $intent="clips_active">News</Button>
          <Button $intent="clips">Recents</Button>
          <Button $intent="clips">Comments</Button>
          <Button $intent="clips">Ask</Button>
          <Button $intent="clips">Jobs</Button>
        </S.ListButtons>
      </S.FlexContainer>
      <div className="mt-10">
        <InfiniteScroll />
      </div>
    </div>
  )
}
