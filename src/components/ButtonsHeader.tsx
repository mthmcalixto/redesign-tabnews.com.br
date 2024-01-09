import * as S from '@/components/CardsPosts/styles'
import { Button } from '@TabNewsUI'
import { headers } from 'next/headers'
import Link from 'next/link'

export default function ButtonsPage() {
  const headersList = headers()
  const header_url = headersList.get('x-pathname') || ''

  console.log(header_url)

  const buttonsData = [
    { text: 'News', path: '/' },
    { text: 'Recents', path: '/recents' },
    { text: 'Comments', path: '/comments' },
    { text: 'Ask', path: '/ask' },
    { text: 'Jobs', path: '/jobs' },
  ]

  return (
    <S.FlexContainer>
      <div className="text-zinc-500 font-medium">Sort by:</div>
      <S.ListButtons>
        {buttonsData.map(({ text, path }) => (
          <Link key={path} href={path} passHref scroll={false}>
            <Button $intent={header_url === path ? 'clips_active' : 'clips'}>
              {text}
            </Button>
          </Link>
        ))}
      </S.ListButtons>
    </S.FlexContainer>
  )
}
