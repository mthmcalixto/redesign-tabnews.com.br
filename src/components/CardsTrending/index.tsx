'use client'

import { CardsTrendingList } from '@/data/dataCards'
import Image from 'next/legacy/image'
import { useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Navigation } from 'swiper/modules'
import { SwiperSlide as Card, Swiper } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'
import * as S from './styles'

import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/navigation'

export default function CardsTrending() {
  const swiperRef = useRef<SwiperCore>()
  const [disableFading, setDisableFading] = useState<
    'isBeginning' | 'isEnd' | null
  >('isBeginning')

  const breakPoints = {
    300: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  }

  return (
    <div>
      <S.Title>Trending</S.Title>
      <S.Wrapper>
        <Swiper
          className="w-full min-w-0"
          modules={[Navigation]}
          slidesPerView={4}
          breakpoints={breakPoints}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          onActiveIndexChange={(e) => {
            if (e.isBeginning) {
              setDisableFading('isBeginning')
            } else if (e.isEnd) {
              setDisableFading('isEnd')
            } else {
              setDisableFading(null)
            }
          }}
        >
          {CardsTrendingList.map((x, i) => {
            return (
              <Card
                className="relative w-fit max-w-[369px] h-card-trending rounded-xl shadow-sm mr-0 md:mr-[1.2rem] hover:opacity-80"
                key={x.id}
              >
                <Link href={x.link} passHref target="_blank">
                  <S.CardOverlay />
                  <S.CardContent>
                    {x.ads && (
                      <S.CardAdsContent>
                        <S.CardAdsTitle>AD</S.CardAdsTitle>
                      </S.CardAdsContent>
                    )}
                    <div className="w-full h-full relative">
                      <Image
                        className="w-full h-full cover rounded-xl"
                        src={x.img_url}
                        alt=""
                        width={380}
                        height={178}
                        quality={100}
                        priority
                        objectFit="fill"
                      />
                    </div>
                    <S.CardTitle>
                      <h2 className="line-clamp-2 text-lg break-words text-ellipsis overflow-hidden items-center">
                        {x.title}
                      </h2>
                    </S.CardTitle>
                  </S.CardContent>
                </Link>
              </Card>
            )
          })}
        </Swiper>
        <div className="absolute top-[5rem] z-50 w-full flex justify-between items-center">
          <button
            className={`${
              disableFading == 'isBeginning' ? 'hidden' : 'flex'
            } absolute shadow-lg rounded-full bg-white dark:bg-[#21262d] w-10 h-10  justify-center items-center -left-5 hover:opacity-85`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IoIosArrowBack size={24} />
          </button>
          <button
            className={`${
              disableFading == 'isEnd' ? 'hidden' : 'flex'
            } absolute shadow-lg rounded-full bg-white dark:bg-[#21262d] w-10 h-10  justify-center items-center -right-5 hover:opacity-85`}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </S.Wrapper>
    </div>
  )
}
