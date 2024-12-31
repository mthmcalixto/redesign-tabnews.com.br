import * as S from '@/components/CardsPosts/styles'
import { Button } from '@TabNewsUI'
import { headers } from 'next/headers'
import Link from 'next/link'

export default async function ButtonsPage() {
  const headersList = headers()
  const header_url = (await headersList).get('x-pathname') || ''

  console.log(header_url)

  const buttonsData = [
    { text: 'News', path: '/' },
    { text: 'Recents', path: '/page/recents' },
    { text: 'Comments', path: '/page/comments' },
    { text: 'Old', path: '/page/old' },
    { text: 'All', path: '/page/all' },
  ]

  return (
    <S.FlexContainer>
      <div className="text-zinc-500 dark:text-zinc-200 font-medium">
        Sort by:
      </div>
      <S.ListButtons>
        {buttonsData.map(({ text, path }) => (
          <Link key={path} href={path} scroll={false}>
            <Button $intent={header_url === path ? 'clips_active' : 'clips'}>
              {text}
            </Button>
          </Link>
        ))}
      </S.ListButtons>
    </S.FlexContainer>
  )
}
