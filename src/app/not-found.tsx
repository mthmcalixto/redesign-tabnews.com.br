import { LogoTriste } from '@/utils/icons'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Not Found · TabNews - Unofficial Redesign',
}

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col flex-wrap justify-center items-center mx-auto p-6">
      <div className="flex gap-2 justify-center items-center">
        <LogoTriste width={110} color="#24292f" />
        <div className="h-16 border-zinc-300 border-l pt-4 m-3"></div>
        <h2 className="font-semibold text-4xl">404</h2>
      </div>
      <h2 className="font-semibold text-2xl mt-5 text-header-color">
        Not Found
      </h2>
      <p>Could not find requested resource</p>
      <a href="/" className="mt-5 text-blue-600 hover:underline">
        Return Home
      </a>
    </div>
  )
}
