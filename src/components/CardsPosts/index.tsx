// import { PostsList } from '@/data/dataPosts'
import { getPots } from '@/data/postsWithData'
import { formatNumber } from '@/utils/formatNumber'
import { formatTitle } from '@/utils/formatTitle'
import { formatCreatedAt } from '@/utils/postFormart'
import { Button } from '@TabNewsUI'
import Link from 'next/link'
import { IoChatboxOutline } from 'react-icons/io5'
import { LiaUserSolid } from 'react-icons/lia'
import { PiClockCounterClockwiseFill } from 'react-icons/pi'
import { RxEyeOpen } from 'react-icons/rx'
import * as S from './styles'

export default async function Posts() {
  const PostListTabNews = await getPots()

  return (
    <div>
      <S.FlexContainer>
        <S.Zinc500>Sort by:</S.Zinc500>
        <S.ListButtons>
          <Button $intent="clips_active">News</Button>
          <Button $intent="clips">Recents</Button>
          <Button $intent="clips">Comments</Button>
          <Button $intent="clips">Ask</Button>
          <Button $intent="clips">Jobs</Button>
        </S.ListButtons>
      </S.FlexContainer>
      <div className="mt-10">
        <S.ListPosts>
          {PostListTabNews.map((x: any, i: any) => {
            return (
              <S.ShadowCard key={x.id}>
                <div className="flex gap-9 items-center justify-start">
                  <span className="text-2xl hidden md:block">{i + 1}.</span>
                  <div className="flex gap-6 justify-between w-full flex-col md:flex-row">
                    <div className="flex flex-col gap-5 w-full md:w-1/2 justify-start">
                      <div className="w-fit flex gap-3">
                        <span className="text-2xl flex md:hidden">
                          {i + 1}.
                        </span>
                        <Link
                          className="grid md:truncate break-words text-xl font-medium text-ellipsis overflow-hidden hover:opacity-45 visited:text-zinc-400"
                          href={`https://www.tabnews.com.br/${x.user.username}/${x.slug}`}
                          target="_blank"
                          passHref
                        >
                          <h2
                            className="md:truncate break-words text-ellipsis overflow-hidden items-center"
                            title={x.title}
                          >
                            {formatTitle(x.title)}
                          </h2>
                        </Link>
                      </div>
                      <ul className="flex gap-5 justify-between items-start md:justify-start md:items-center flex-wrap md:flex-row">
                        <S.Tabcoins>
                          {x.tabcoins >= 18 ? (
                            <S.YellowCircle />
                          ) : x.tabcoins <= 0 ? (
                            <S.RedCircle />
                          ) : (
                            <S.BlueCircle />
                          )}
                          {x.tabcoins} tabcoins
                        </S.Tabcoins>
                        <S.UserIcon>
                          <span>
                            <LiaUserSolid size={18} />
                          </span>
                          {x.user.username}
                        </S.UserIcon>
                        <S.CommentsIcon>
                          <span>
                            <IoChatboxOutline size={18} />
                          </span>
                          {x.comments} comments
                        </S.CommentsIcon>
                        <S.ClockIcon>
                          <span>
                            <PiClockCounterClockwiseFill size={18} />
                          </span>
                          {formatCreatedAt(x.createdAt)}
                        </S.ClockIcon>
                        <S.EyeIcon>
                          <span>
                            <RxEyeOpen size={18} />
                          </span>
                          {formatNumber(x.views)}
                        </S.EyeIcon>
                      </ul>
                    </div>
                    <S.TagsContainer>
                      <ul className="flex gap-2 flex-wrap md:flex-row">
                        {x.tags.map((x: any, _: any) => {
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
            )
          })}
        </S.ListPosts>
      </div>
    </div>
  )
}
