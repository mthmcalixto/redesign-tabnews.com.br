import { twc } from 'react-twc'

export const LogoRoot = twc.header`flex flex-row gap-2 items-center`
export const HeaderRoot = twc.header`w-full py-header-py bg-header-color dark:bg-header-color-dark px-5 md:px-0`
export const HeaderContainer = twc.div`container mx-auto flex items-center`
export const HeaderWrapper = twc.div`flex flex-row justify-between items-center w-full`
export const HeaderLeft = twc.div``
export const HeaderCenter = twc.div`flex-auto md:flex-1 md:mx-10`
export const HeaderRight = twc.div`flex flex-auto items-center justify-end`
