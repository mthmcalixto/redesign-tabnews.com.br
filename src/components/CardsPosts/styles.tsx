import { twc, TwcComponentProps } from 'react-twc'

type ShadowCardProps = TwcComponentProps<'article'> & { $comment?: boolean }

export const FlexContainer = twc.div`flex gap-3 items-start md:items-center flex-col md:flex-row`
export const ListButtons = twc.div`no-scrollbar flex gap-3 w-full md:w-auto overflow-x-auto overflow-hidden md:overflow-auto md:overflow-x-hidden`
export const ListPosts = twc.ul` grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 mb-6`
export const ShadowCard = twc.article<ShadowCardProps>((props) => [
  'hadow-sm w-full py-3 px-7 rounded-xl border border-zinc-200 dark:border-[#30363d]',
  props.$comment &&
    'bg-zinc-100 text-black dark:bg-[#10151c] dark:text-zinc-100',
])
export const BlueCircle = twc.span`block w-3 h-3 bg-blue-600 rounded-sm`
export const RedCircle = twc.span`block w-3 h-3 bg-red-600 rounded-sm`
export const YellowCircle = twc.span`block w-3 h-3 bg-yellow-600 rounded-sm`
export const Tabcoins = twc.li`flex gap-2 items-center font-medium text-sm`
export const UserIcon = twc.span`gap-2 items-center font-medium text-sm flex`
export const CommentsIcon = twc.span`gap-2 items-center font-medium text-sm flex`
export const ClockIcon = twc.span`flex gap-2 items-center text-zinc-400 font-medium text-sm`
export const EyeIcon = twc.span`flex gap-2 items-center text-zinc-400 font-medium text-sm`
export const TagsContainer = twc.div`w-full flex flex-col gap-2 items-start justify-center pt-3`
