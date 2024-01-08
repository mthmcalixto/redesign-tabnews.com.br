import { cva, VariantProps } from 'class-variance-authority'
import { twc, TwcComponentProps } from 'react-twc'

const button = cva('font-semibold rounded-full py-1.5 px-7', {
  variants: {
    $intent: {
      primary: 'bg-white text-header-color',
      no_style: 'text-header-color-secondary',
      clips:
        'bg-white border border-zinc-300 px-9 hover:bg-header-color hover:text-white text-md',
      clips_active:
        'bg-header-color border border-transparent text-white px-9 text-md',
      tabs: 'bg-white border border-zinc-300 px-4 text-sm hover:bg-header-color hover:text-white',
      tabs_active:
        'bg-header-color border border-transparent text-white px-4 text-sm',
    },
  },
  defaultVariants: {
    $intent: 'primary',
  },
})

type ButtonProps = TwcComponentProps<'button'> & VariantProps<typeof button>

export const Button = twc.button<ButtonProps>(({ $intent }) =>
  button({ $intent })
)
