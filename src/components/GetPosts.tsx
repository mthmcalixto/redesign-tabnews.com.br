'use client'

import * as S from '@/components/CardsPosts/styles'
import { PostsListProps } from '@/types'
import { formatNumber } from '@/utils/formatNumber'
import { formatTitle } from '@/utils/formatTitle'
import { formatCreatedAt } from '@/utils/postFormart'
import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { IoChatboxOutline } from 'react-icons/io5'
import { LiaUserSolid } from 'react-icons/lia'
import { PiClockCounterClockwiseFill } from 'react-icons/pi'
import { RxEyeOpen } from 'react-icons/rx'
import { Button } from '.'

export default function InfiniteScroll() {
  const listRef = useRef<HTMLUListElement | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchPosts = async ({ pageParam = 1 }: { pageParam?: number }) => {
    try {
      const response = await fetch(
        `https://www.tabnews.com.br/api/v1/contents?page=${pageParam}&per_page=15&strategy=relevant`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data: PostsListProps[] = await response.json()
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
  })

  const posts = data ? data.pages.flatMap((page) => page) : []

  const postsWithData: any[] = posts.map((post) => {
    return {
      ...post,
      views: Math.floor(Math.random() * 100001),
      comments: post.children_deep_count,
      createdAt: post.createdAt,
      tags: [
        {
          id: '1',
          name: 'test',
          slug: 'test',
        },
      ],
      user: {
        id: post.owner_id,
        username: post.owner_username,
        name: post.owner_username,
      },
    }
  })

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      if (
        entries[0].isIntersecting &&
        hasNextPage &&
        !isFetching &&
        !isLoadingMore
      ) {
        setIsLoadingMore(true)
        fetchNextPage()
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    })

    const currentListRef = listRef.current

    if (currentListRef) {
      observer.observe(currentListRef)
    }

    return () => {
      if (currentListRef) {
        observer.unobserve(currentListRef)
      }
    }
  }, [fetchNextPage, hasNextPage, isFetching, isLoadingMore, listRef])

  useEffect(() => {
    if (!isFetching) {
      setIsLoadingMore(false)
    }
  }, [isFetching])

  return (
    <div>
      <S.ListPosts ref={listRef}>
        {postsWithData.map((post, i) => (
          <S.ShadowCard key={post.id}>
            <div className="flex gap-9 items-center justify-start">
              <span className="text-2xl hidden md:block">{i + 1}.</span>
              <div className="flex gap-6 justify-between w-full flex-col md:flex-row">
                <div className="flex flex-col gap-5 w-full md:w-1/2 justify-start">
                  <div className="w-fit flex gap-3">
                    <span className="text-2xl flex md:hidden">{i + 1}.</span>
                    <Link
                      className="grid md:truncate break-words text-xl font-medium text-ellipsis overflow-hidden hover:opacity-45 visited:text-zinc-400"
                      href={`https://www.tabnews.com.br/${post.user.username}/${post.slug}`}
                      target="_blank"
                      passHref
                    >
                      <h2
                        className="md:truncate break-words text-ellipsis overflow-hidden items-center"
                        title={post.title}
                      >
                        {formatTitle(post.title)}
                      </h2>
                    </Link>
                  </div>
                  <ul className="flex gap-5 justify-between items-start md:justify-start md:items-center flex-wrap md:flex-row">
                    <S.Tabcoins>
                      {post.tabcoins >= 18 ? (
                        <S.YellowCircle />
                      ) : post.tabcoins <= 0 ? (
                        <S.RedCircle />
                      ) : (
                        <S.BlueCircle />
                      )}
                      {post.tabcoins} tabcoins
                    </S.Tabcoins>
                    <S.UserIcon>
                      <span>
                        <LiaUserSolid size={18} />
                      </span>
                      {post.user.username}
                    </S.UserIcon>
                    <S.CommentsIcon>
                      <span>
                        <IoChatboxOutline size={18} />
                      </span>
                      {post.comments} comments
                    </S.CommentsIcon>
                    <S.ClockIcon>
                      <span>
                        <PiClockCounterClockwiseFill size={18} />
                      </span>
                      {formatCreatedAt(post.createdAt)}
                    </S.ClockIcon>
                    <S.EyeIcon>
                      <span>
                        <RxEyeOpen size={18} />
                      </span>
                      {formatNumber(post.views)}
                    </S.EyeIcon>
                  </ul>
                </div>
                <S.TagsContainer>
                  <ul className="flex gap-2 flex-wrap md:flex-row">
                    {post.tags.map((x: any, _: any) => {
                      return (
                        <Button $intent="tabs" key={x.id}>
                          {x.name}
                        </Button>
                      )
                    })}
                  </ul>
                </S.TagsContainer>
              </div>
            </div>
          </S.ShadowCard>
        ))}
      </S.ListPosts>
      <div>
        {isFetching ? (
          <div
            role="status"
            className="w-full flex justify-center items-center mt-9"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : isLoadingMore ? (
          <div
            role="status"
            className="w-full flex justify-center items-center mt-9"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
