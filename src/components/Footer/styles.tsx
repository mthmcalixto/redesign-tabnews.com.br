import { twc } from 'react-twc'

export const Footer = twc.footer`mt-20 py-10`
export const Container = twc.div`container mx-auto w-full`
export const Border = twc.div`border-t border-header-color-secondary py-5 dark:border-[#30363d]`
export const FlexContainer = twc.div`flex flex-col items-center justify-between md:flex-row`
export const LogoContainer = twc.div`flex gap-2 items-center text-zinc-400`
export const UlContainer = twc.ul`flex gap-8 pt-6 md:pt-0 justify-center md:justify-between text-footer-nav-links flex-wrap px-6 items-center md:flex-grow`
