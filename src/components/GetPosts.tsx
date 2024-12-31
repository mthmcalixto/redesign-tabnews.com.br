'use client'

import { Button } from '@/components/Button'
import * as S from '@/components/CardsPosts/styles'
import { PageProps, PostsListProps } from '@/types'
import { formatNumber } from '@/utils/formatNumber'
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

export default function InfiniteScroll({
  page,
  allPage,
  keyPage,
  initialData,
}: PageProps & { initialData: PostsListProps[] }) {
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
          with_children: keyPage == 'comments' || keyPage == 'all',
          with_root: keyPage !== 'comments',
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
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  })

  const posts = data ? data.pages.flatMap((page) => page) : []

  const postsWithData = posts.map((post) => ({
    ...post,
    views: post.views ? post.views : 1000000,
    tags: post.tags ? post.tags : [{ id: '1', name: 'javascript' }],
    comments: post.children_deep_count,
    createdAt: post.created_at as string | number,
    user: {
      id: post.owner_id,
      username: post.owner_username,
      name: post.owner_username,
    },
  }))

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

  const postsCount = postsWithData ? postsWithData.length : 0

  const getTitle = (post: any) => {
    const title = !post.title ? post.body : post.title
    const type = !post.title ? 'comment' : 'post'

    return { title, type }
  }

  return (
    <div>
      {postsWithData && postsWithData.length > 0 && (
        <S.ListPosts>
          {postsWithData.map((post, i) => {
            const postTitle = getTitle(post)
            return (
              <S.ShadowCard
                key={`${post.id}_${i}`}
                ref={i === postsCount - 1 ? ref : null}
                $comment={!post.title && keyPage == 'all'}
              >
                <div className="flex gap-9 items-start justify-start">
                  <span className="text-2xl md:flex hidden pt-3">{i + 1}.</span>
                  <div className="flex gap-6 justify-between w-full flex-col md:flex-row flex-wrap">
                    <div className="flex flex-col gap-3 w-full md:w-1/1 justify-start">
                      <div className="gap-4 items-center py-2 flex flex-wrap">
                        <S.UserIcon>
                          <Link
                            className="flex flex-row gap-1 hover:underline"
                            href={`https://www.tabnews.com.br/${post.user.username}`}
                          >
                            <span>
                              <LiaUserSolid size={18} />
                            </span>
                            {post.user.username}
                          </Link>
                        </S.UserIcon>
                        <S.CommentsIcon>
                          <Link
                            className="flex flex-row gap-2 hover:underline"
                            href={`https://www.tabnews.com.br/${post.user.username}/${post.slug}`}
                          >
                            <span>
                              <IoChatboxOutline size={18} />
                            </span>
                            {post.comments} comments
                          </Link>
                        </S.CommentsIcon>
                      </div>
                      <div className="w-full flex gap-3">
                        <span className="text-lg md:text-2xl flex md:hidden">
                          {i + 1}.
                        </span>
                        <Link
                          className="break-words text-base md:text-xl font-medium text-ellipsis overflow-hidden hover:opacity-45 visited:text-zinc-400 dark:visited:text-[#6e7681]"
                          href={`https://www.tabnews.com.br/${post.user.username}/${post.slug}`}
                          rel="nofollow ugc"
                          target="_blank"
                          passHref
                        >
                          <h2
                            className="flex gap-2 justify-start items-baseline [overflow-wrap:anywhere]"
                            title={postTitle.title}
                          >
                            {postTitle.type === 'comment' ? (
                              <>
                                <span>
                                  <IoChatboxOutline size={20} />
                                </span>
                                {postTitle.title}
                              </>
                            ) : (
                              postTitle.title
                            )}
                          </h2>
                        </Link>
                      </div>
                      <ul className="flex gap-5 justify-between items-start md:justify-start md:items-center flex-wrap md:flex-row pt-3">
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
                        <S.ClockIcon>
                          <span>
                            <PiClockCounterClockwiseFill size={18} />
                          </span>
                          {formatCreatedAt(post.createdAt)}
                        </S.ClockIcon>
                        {postTitle.type !== 'comment' && (
                          <S.EyeIcon>
                            <span>
                              <RxEyeOpen size={18} />
                            </span>
                            {formatNumber(post.views)}
                          </S.EyeIcon>
                        )}
                      </ul>
                      {post.title && (
                        <S.TagsContainer>
                          <ul className="flex gap-2 pb-2 flex-wrap md:flex-row">
                            {post.tags.map((x: any, _: any) => {
                              return (
                                <Button $intent="tags" key={x.id}>
                                  {x.name}
                                </Button>
                              )
                            })}
                          </ul>
                        </S.TagsContainer>
                      )}
                    </div>
                  </div>
                </div>
              </S.ShadowCard>
            )
          })}
        </S.ListPosts>
      )}
      <div>
        {isFetching ? (
          <div
            role="status"
            className="items-start justify-start grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            <div className="flex items-center justify-center h-44 md:h-52 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center h-44 md:h-52 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center h-44 md:h-52 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : isLoadingMore ? (
          <div
            role="status"
            className="items-start justify-start grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            <div className="flex items-center justify-center h-44 md:h-52 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center h-44 md:h-52 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center h-44 md:h-52 w-full bg-gray-300 dark:bg-[#181e27]/[0.8] rounded-lg animate-pulse"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
