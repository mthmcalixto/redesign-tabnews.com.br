'use client'

import * as S from '@/components/CardsPosts/styles'
import { Button } from '@TabNewsUI'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function ButtonsHeaderC({
  header_url,
}: {
  header_url: string | null
}) {
  const buttonsData = [
    { text: 'News', path: '/' },
    { text: 'Recents', path: '/page/recents' },
    { text: 'Comments', path: '/page/comments' },
    { text: 'Old', path: '/page/old' },
    { text: 'All', path: '/page/all' },
  ]

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const index = buttonsData.findIndex((button) => button.path === header_url)
    if (index !== -1 && buttonRefs.current[index]) {
      buttonRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [header_url])

  return (
    <S.FlexContainer>
      <div className="text-zinc-500 dark:text-zinc-200 font-medium">
        Sort by:
      </div>
      <S.ListButtons>
        {buttonsData.map(({ text, path }, index) => (
          <Link key={path} href={path} scroll={false}>
            <Button
              ref={(el) => {
                buttonRefs.current[index] = el
              }}
              $intent={header_url === path ? 'clips_active' : 'clips'}
            >
              {text}
            </Button>
          </Link>
        ))}
      </S.ListButtons>
    </S.FlexContainer>
  )
}
