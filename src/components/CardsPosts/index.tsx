import { PostsList } from '@/data/dataPosts'
import { formatNumber } from '@/utils/formatNumber'
import { formatCreatedAt } from '@/utils/postFormart'
import { Button } from '@TabNewsUI'
import { IoChatboxOutline } from 'react-icons/io5'
import { LiaUserSolid } from 'react-icons/lia'
import { PiClockCounterClockwiseFill } from 'react-icons/pi'
import { RxEyeOpen } from 'react-icons/rx'
import * as S from './styles'

export default function Posts() {
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
      <div className="mt-8">
        <S.ListPosts>
          {PostsList.map((x, _) => {
            return (
              <S.ShadowCard key={x.id}>
                <div className="flex gap-9 items-center justify-center">
                  <span className="text-2xl">{x.id}.</span>
                  <div className="flex gap-3 justify-between w-full flex-col md:flex-row">
                    <div className="flex flex-col gap-5 w-full md:w-1/2">
                      <h2
                        className="md:truncate break-words text-xl font-medium text-ellipsis overflow-hidden"
                        title={x.title}
                      >
                        {x.title}
                      </h2>
                      <ul className="flex gap-5 items-center flex-wrap md:flex-row">
                        <S.Tabcoins>
                          <S.BlueCircle />
                          {x.tabsCoins} tabcoins
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
                        {x.tags.map((x, _) => {
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
