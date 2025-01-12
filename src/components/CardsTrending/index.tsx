'use client'

import { CardsTrendingList } from '@/data/dataCards'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { cx } from 'react-twc'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { SwiperSlide as Card, Swiper } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'
import * as S from './styles'

export default function CardsTrending() {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [disableFading, setDisableFading] = useState<
    'isBeginning' | 'isEnd' | null
  >('isBeginning')

  const breakPoints = {
    300: { slidesPerView: 1, spaceBetween: 12 },
    640: { slidesPerView: 2, spaceBetween: 12 },
    768: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  }

  const handleActiveIndexChange = (swiper: SwiperCore) => {
    if (swiper.isBeginning) {
      setDisableFading('isBeginning')
    } else if (swiper.isEnd) {
      setDisableFading('isEnd')
    } else {
      setDisableFading(null)
    }
  }

  return (
    <S.CardsTrendingRoot>
      <S.Title>Trending</S.Title>
      <S.Wrapper>
        <Swiper
          className="w-full min-w-0"
          modules={[Navigation]}
          slidesPerView={4}
          breakpoints={breakPoints}
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
          onActiveIndexChange={handleActiveIndexChange}
        >
          {CardsTrendingList.map((card) => (
            <Card
              className="relative w-fit max-w-[369px] h-card-trending rounded-xl shadow-sm mr-0 md:mr-[1.2rem] hover:opacity-80 before:absolute before:bg-gradient-to-t before:from-header-color before:via-header-color/20 before:dark:from-header-color-dark before:w-full before:h-full before:rounded-lg before:z-40"
              key={card.id}
            >
              <Link href={card.link} target="_blank">
                <S.CardContent>
                  {card.ads && (
                    <S.CardAdsContent>
                      <S.CardAdsTitle>AD</S.CardAdsTitle>
                    </S.CardAdsContent>
                  )}
                  <Image
                    className="w-full h-full object-cover rounded-xl"
                    src={card.img_url}
                    alt={card.title}
                    width={380}
                    height={190}
                    quality={100}
                    priority
                    objectFit="fill"
                  />
                  <S.CardTitle>
                    <h2 className="line-clamp-2 text-lg text-white dark:text-white break-words text-ellipsis overflow-hidden items-center">
                      {card.title}
                    </h2>
                  </S.CardTitle>
                </S.CardContent>
              </Link>
            </Card>
          ))}
        </Swiper>
        <div className="absolute top-[5rem] z-50 w-full flex justify-between items-center">
          <button
            className={cx(
              'absolute flex shadow-lg rounded-full bg-white dark:bg-[#21262d] w-10 h-10 justify-center items-center -left-5 hover:opacity-85',
              disableFading === 'isBeginning' && 'hidden'
            )}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IoIosArrowBack size={24} />
          </button>
          <button
            className={cx(
              'absolute flex shadow-lg rounded-full bg-white dark:bg-[#21262d] w-10 h-10 justify-center items-center -right-5 hover:opacity-85',
              disableFading === 'isEnd' && 'hidden'
            )}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </S.Wrapper>
    </S.CardsTrendingRoot>
  )
}
