'use client'

import { useEffect, useState } from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md'

export default function GoToTopButton() {
  const [showButton, setShowButton] = useState(false)

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const header = document.querySelector('header')

    if (header) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setShowButton(!entry.isIntersecting)
        })
      })

      observer.observe(header)

      return () => observer.disconnect()
    }
  }, [])

  return (
    showButton && (
      <div
        aria-label="Retornar ao topo"
        onClick={handleScrollToTop}
        className="fixed bottom-5 right-4 p-3 hover:bg-[#d0d7de52] dark:bg-[#b1bac41f] rounded-md hover:cursor-pointer"
      >
        <MdKeyboardArrowUp size={20} />
      </div>
    )
  )
}
