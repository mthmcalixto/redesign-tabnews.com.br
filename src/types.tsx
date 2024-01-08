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
  views: number
  comments: number
  createdAt: number
  user: UserProps
  tags: TagsProps[]
  ads?: boolean
  owner_id?: string
  owner_username?: string
  children_deep_count?: string
}

export type CardTrendingListProps = {
  id: string
  title: string
  img_url: string
  link: string
  ads?: boolean
}
