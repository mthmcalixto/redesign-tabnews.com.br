'use client'

import * as S from '@/components/CardsPosts/styles'
import { PageProps, PostsListProps } from '@/types'
import { formatNumber } from '@/utils/formatNumber'
import { formatTitle } from '@/utils/formatTitle'
import { formatCreatedAt } from '@/utils/postFormart'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoChatboxOutline } from 'react-icons/io5'
import { LiaUserSolid } from 'react-icons/lia'
import { PiClockCounterClockwiseFill } from 'react-icons/pi'
import { RxEyeOpen } from 'react-icons/rx'
import { useInView } from 'react-intersection-observer'
import { Button } from './Button'

export default function InfiniteScroll({ page, allPage, keyPage }: PageProps) {
  const API_URL = 'https://www.tabnews.com.br/api/v1/contents'
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 1,
  })

  const fetchPosts = async ({ pageParam = 1 }: { pageParam?: number }) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          page: pageParam,
          per_page: 15,
          strategy: page,
        },
      })

      const data: PostsListProps[] = await response.data

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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts_' + keyPage],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      const isLastPageLengthValid =
        lastPage.length === 15 && allPages.length * 15 < 100
      const isLastPageLengthUnderLimit = lastPage.length < 5

      const nextPage = !allPage
        ? isLastPageLengthValid
          ? allPages.length + 1
          : undefined
        : isLastPageLengthUnderLimit
        ? undefined
        : allPages.length + 1

      return nextPage
    },
    initialPageParam: 1,
    staleTime: Infinity,
  })

  const posts = data ? data.pages.flatMap((page) => page) : []

  const postsWithData: any[] = posts.map((post) => {
    return {
      ...post,
      views: Math.floor(Math.random() * 100001),
      comments: post.children_deep_count,
      createdAt: post.created_at,
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
    if (inView && hasNextPage && !isFetching && !isLoadingMore) {
      setIsLoadingMore(true)
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching, isLoadingMore])

  useEffect(() => {
    if (!isFetching) {
      setIsLoadingMore(false)
    }
  }, [isFetching])

  // Get last post to release fetch
  const postsCount = postsWithData ? postsWithData.length : 0

  return (
    <div>
      {postsWithData && postsWithData.length > 0 && (
        <S.ListPosts>
          {postsWithData.map((post, i) => (
            <S.ShadowCard
              key={`${post.id}_${i}`}
              ref={i === postsCount - 1 ? ref : null}
            >
              <div className="flex gap-9 items-center justify-start">
                <span className="text-2xl hidden md:block">{i + 1}.</span>
                <div className="flex gap-6 justify-between w-full flex-col md:flex-row">
                  <div className="flex flex-col gap-5 w-full md:w-1/2 justify-start">
                    <div className="w-fit flex gap-3">
                      <span className="text-2xl flex md:hidden">{i + 1}.</span>
                      <Link
                        className="grid md:truncate break-words text-xl font-medium text-ellipsis overflow-hidden hover:opacity-45 visited:text-zinc-400 dark:visited:text-[#6e7681]"
                        href={`https://www.tabnews.com.br/${post.user.username}/${post.slug}`}
                        rel="nofollow ugc"
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
                        ) : post.tabcoins < 0 ? (
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
      )}
      <div>
        {isFetching ? (
          <div
            role="status"
            className="flex items-start justify-start w-full flex-col gap-5"
          >
            <div className="flex items-center justify-center h-44 md:h-24 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center h-44 md:h-24 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center h-44 md:h-24 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : isLoadingMore ? (
          <div
            role="status"
            className="flex items-start justify-start w-full flex-col gap-5"
          >
            <div className="flex items-center justify-center h-44 md:h-24 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center h-44 md:h-24 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center h-44 md:h-24 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
