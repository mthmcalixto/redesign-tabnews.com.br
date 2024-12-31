'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LiaDesktopSolid } from 'react-icons/lia'
import { PiMoonBold, PiSunDimBold } from 'react-icons/pi'

function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme, themes } = useTheme()
  const [isSystemTheme, setThemeSystem] = useState('')

  useEffect(() => {
    const checkLocalStorage = localStorage.getItem('theme')
    if (!checkLocalStorage) {
      const checkDarkTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setTheme(checkDarkTheme ? 'dark' : 'light')
    }
  }, [setTheme])

  const applyTheme = (selectedTheme: any) => {
    setTheme(selectedTheme)
  }

  useEffect(() => {
    if (theme) {
      setThemeSystem(theme)
    }
  }, [theme])

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div
          className={`${
            isSystemTheme === 'light' && 'bg-zinc-200/[0.6]'
          } p-2.5 hover:bg-zinc-100 rounded-full hover:cursor-pointer dark:hover:bg-zinc-800`}
          onClick={() => applyTheme('light')}
          aria-label="Light Mode"
        >
          <PiSunDimBold size={20} />
        </div>

        <div
          className={`${
            isSystemTheme === 'system' &&
            'bg-zinc-200/[0.6] dark:bg-zinc-200/[0.6]'
          } p-2.5  hover:bg-zinc-100 rounded-full hover:cursor-pointer dark:hover:bg-zinc-800`}
          onClick={() => applyTheme('system')}
          aria-label="System Theme Mode"
        >
          <LiaDesktopSolid size={20} />
        </div>

        <div
          className={`${
            isSystemTheme === 'dark' && 'bg-zinc-700'
          } p-2.5 hover:bg-zinc-100 rounded-full hover:cursor-pointer dark:hover:bg-zinc-800`}
          onClick={() => applyTheme('dark')}
          aria-label="Dark Mode"
        >
          <PiMoonBold size={20} />
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle
