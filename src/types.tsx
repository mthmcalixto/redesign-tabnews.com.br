type UserProps = {
  id: string
  username: string
  name: string
}

type TagsProps = {
  id: string
  name: string
  link: string
}

export type PostsListProps = {
  id: string
  link: string
  title: string
  tabsCoins: number
  views: number
  comments: number
  createdAt: number
  user: UserProps
  tags: TagsProps[]
  ads?: boolean
}

export type CardTrendingListProps = {
  id: string
  title: string
  img_url: string
  link: string
  ads?: boolean
}
