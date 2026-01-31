'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

const EPICS = ['Python 기초', '웹 개발 기초', 'FastAPI 시작', 'DB 연동', '인증과 보안', '배포와 운영']

interface EpicNavigationProps {
  activeEpic?: string
  onEpicSelect?: (epic: string) => void
}

export default function EpicNavigation({ activeEpic = 'Python 기초', onEpicSelect }: EpicNavigationProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <button
        type="button"
        className="p-1 text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
        aria-label="Previous epic"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="scrollbar-hide flex-1 overflow-x-auto">
        <div className="flex gap-2 px-1">
          {EPICS.map((epic) => {
            const isActive = epic === activeEpic
            return (
              <button
                key={epic}
                type="button"
                onClick={() => onEpicSelect?.(epic)}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                } `}
              >
                {epic}
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        className="p-1 text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
        aria-label="Next epic"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
