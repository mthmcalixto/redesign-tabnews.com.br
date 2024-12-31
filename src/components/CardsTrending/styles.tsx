import { twc } from 'react-twc'

export const CardsTrendingRoot = twc.div``
export const Title = twc.h2`text-zinc-500 dark:text-zinc-400 font-medium text-base`
export const Wrapper = twc.div`mt-3 relative`
export const CardContent = twc.div`relative flex w-full h-full`
export const CardTitle = twc.div`absolute bottom-3 z-50 text-white px-5 py-2 font-semibold`
export const CardAdsContent = twc.div`absolute z-30 right-4 top-2`
export const CardAdsTitle = twc.span`bg-white text-black rounded-md py-0.5 px-2 text-xs`
