import { PageProps } from '@/types'
import { getRandomTags } from '@/utils/getRandomTags'
import { ButtonsHeader } from '@TabNewsUI'
import axios from 'axios'
import GetPosts from '../GetPosts'

const fetchPosts = async ({
  keyPage,
  page,
}: {
  keyPage: string
  page: 'new' | 'old' | 'relevant'
}) => {
  const API_URL = 'https://www.tabnews.com.br/api/v1/contents'

  try {
    const response = await axios.get(API_URL, {
      params: {
        with_children: keyPage == 'comments' || keyPage == 'all',
        with_root: keyPage !== 'comments',
        page: 1,
        per_page: 15,
        strategy: page,
      },
    })

    const data: any[] = await response.data

    let responseOK = response && response.status === 200
    if (!responseOK) {
      throw new Error('Failed to fetch posts')
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default async function Posts({ page, keyPage, allPage }: PageProps) {
  const initialData = await fetchPosts({ keyPage, page })

  const postsWithData = initialData.map((post) => ({
    ...post,
    views: Math.floor(Math.random() * 100001),
    comments: post.children_deep_count,
    createdAt: post.created_at,
    user: {
      id: post.owner_id,
      username: post.owner_username,
      name: post.owner_username,
    },
    tags: getRandomTags(0, 5),
  }))

  return (
    <div className="flex flex-col gap-10">
      <ButtonsHeader />
      <GetPosts
        page={page}
        allPage={allPage}
        keyPage={keyPage}
        initialData={postsWithData}
      />
    </div>
  )
}
