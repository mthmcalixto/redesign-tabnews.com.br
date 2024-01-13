import { cva, VariantProps } from 'class-variance-authority'
import { twc, TwcComponentProps } from 'react-twc'

const button = cva('font-semibold rounded-full', {
  variants: {
    $intent: {
      primary: 'bg-white text-header-color py-1.5 px-7',
      no_style: 'text-header-color-secondary py-1.5 px-7',
      clips:
        'bg-white dark:bg-transparent border border-zinc-300 dark:border-[#30363d] px-9 py-1.5 hover:bg-header-color hover:text-white text-md hover:dark:bg-zinc-800/[0.5]',
      clips_active:
        'bg-header-color dark:bg-[#21262d] border border-transparent text-white px-9 py-1.5 text-md',
      tags: 'dark:bg-transparent border border-zinc-300 dark:border-[#30363d] px-3 py-0.5 text-sm hover:bg-header-color hover:text-white hover:dark:bg-zinc-800/[0.5]',
      tags_active:
        'bg-header-color border border-transparent text-white px-3 py-0.5 text-sm',
    },
    $color: {
      blue: 'bg-blue-500 dark:bg-blue-500',
      pink: 'bg-pink-500 dark:bg-pink-500',
      purple: 'bg-purple-500 dark:bg-purple-500',
      indigo: 'bg-indigo-500 dark:bg-indigo-500',
      green: 'bg-green-500 dark:bg-green-500',
      yellow: 'bg-yellow-500 dark:bg-yellow-500',
      red: 'bg-red-500 dark:bg-red-500',
    },
  },
  defaultVariants: {
    $intent: 'primary',
  },
})

type ButtonProps = TwcComponentProps<'button'> & VariantProps<typeof button>

export const Button = twc.button<ButtonProps>(({ $intent, $color }) =>
  button({ $intent, $color })
)
