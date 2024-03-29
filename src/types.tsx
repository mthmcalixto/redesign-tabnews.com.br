type UserProps = {
  id: string
  username: string
  name: string
}

type TagsProps = {
  id: string
  name: string
  slug: string
}

export type PostsListProps = {
  id: string
  slug: string
  title: string
  tabcoins: number
  createdAt: number
  views: number
  body?: string
  comments: number
  user: UserProps
  tags: TagsProps[]
  ads?: boolean
  owner_id?: string
  owner_username?: string
  children_deep_count?: string
  created_at?: string
}

export type CardTrendingListProps = {
  id: string
  title: string
  img_url: string
  link: string
  ads?: boolean
}

export type PageProps = {
  page: 'new' | 'old' | 'relevant'
  allPage?: boolean
  keyPage: string
}
