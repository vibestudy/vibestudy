'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export interface Epic {
  id: string
  title: string
}

interface EpicNavigationProps {
  epics: Epic[]
  selectedEpicId?: string
  onSelectEpic?: (id: string) => void
  className?: string
}

export function EpicNavigation({ epics, selectedEpicId, onSelectEpic, className }: EpicNavigationProps) {
  const selectedIndex = epics.findIndex((e) => e.id === selectedEpicId)

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      onSelectEpic?.(epics[selectedIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (selectedIndex < epics.length - 1) {
      onSelectEpic?.(epics[selectedIndex + 1].id)
    }
  }

  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      <button
        onClick={handlePrevious}
        disabled={selectedIndex <= 0}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700 disabled:opacity-40 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      <button
        onClick={handleNext}
        disabled={selectedIndex >= epics.length - 1}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700 disabled:opacity-40 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
      >
        <ChevronRightIcon className="size-4" />
      </button>

      <div className="scrollbar-hide flex flex-1 items-center gap-1 overflow-x-auto">
        {epics.map((epic) => (
          <button
            key={epic.id}
            onClick={() => onSelectEpic?.(epic.id)}
            className={clsx(
              'rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
              epic.id === selectedEpicId
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200'
            )}
          >
            {epic.title}
          </button>
        ))}
      </div>
    </div>
  )
}
