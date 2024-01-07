import { twc } from 'react-twc'

export const FlexContainer = twc.div`flex gap-3 items-start md:items-center flex-col md:flex-row`
export const Zinc500 = twc.h3`text-zinc-500 font-medium`
export const ListButtons = twc.div`flex gap-3 w-full md:w-auto overflow-x-auto overflow-hidden md:overflow-auto md:overflow-x-hidden`
export const ListPosts = twc.ul`flex flex-col gap-6`
export const ShadowCard = twc.li`shadow-sm w-full py-3 px-7 rounded-xl border border-zinc-200`
export const BlueCircle = twc.span`block w-3 h-3 bg-blue-600 rounded-sm`
export const Tabcoins = twc.li`flex gap-2 items-center font-medium text-sm`
export const UserIcon = twc.span`flex gap-2 items-center font-medium text-sm`
export const CommentsIcon = twc.span`flex gap-2 items-center font-medium text-sm`
export const ClockIcon = twc.span`flex gap-2 items-center text-zinc-400 font-medium text-sm`
export const EyeIcon = twc.span`flex gap-2 items-center text-zinc-400 font-medium text-sm`
export const TagsContainer = twc.div`w-full md:w-1/2 flex flex-col gap-2 items-end justify-center`
