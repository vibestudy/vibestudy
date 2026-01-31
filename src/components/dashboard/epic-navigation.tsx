'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'

const epics = [
  { id: 1, title: 'Python 기초', completed: true },
  { id: 2, title: '웹 개발 기초', completed: true },
  { id: 3, title: 'FastAPI 시작', completed: false, active: true },
  { id: 4, title: 'DB 연동', completed: false },
  { id: 5, title: '인증과 보안', completed: false },
  { id: 6, title: '배포와 운영', completed: false },
]

export default function EpicNavigation() {
  const [activeId, setActiveId] = useState(3)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Navigation Arrows */}
      <button
        onClick={() => scroll('left')}
        className="flex size-8 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="flex size-8 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Tabs Container */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex flex-1 items-center gap-1 overflow-x-auto rounded-full bg-zinc-100 p-1.5 dark:bg-zinc-800"
      >
        {epics.map((epic) => (
          <button
            key={epic.id}
            onClick={() => setActiveId(epic.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
              activeId === epic.id
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
            }`}
          >
            {epic.title}
          </button>
        ))}
      </div>
    </div>
  )
}
