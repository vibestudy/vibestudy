'use client'

import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

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

export function EpicNavigation({
  epics,
  selectedEpicId,
  onSelectEpic,
  className,
}: EpicNavigationProps) {
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
    <div className={clsx('flex items-center gap-2', className)}>
      <button
        onClick={handlePrevious}
        disabled={selectedIndex <= 0}
        className="rounded-lg bg-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white disabled:opacity-50 disabled:hover:bg-zinc-800 disabled:hover:text-zinc-400"
      >
        <ChevronLeftIcon className="size-5" />
      </button>
      <button
        onClick={handleNext}
        disabled={selectedIndex >= epics.length - 1}
        className="rounded-lg bg-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white disabled:opacity-50 disabled:hover:bg-zinc-800 disabled:hover:text-zinc-400"
      >
        <ChevronRightIcon className="size-5" />
      </button>

      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {epics.map((epic) => (
          <button
            key={epic.id}
            onClick={() => onSelectEpic?.(epic.id)}
            className={clsx(
              'whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              epic.id === selectedEpicId
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            )}
          >
            {epic.title}
          </button>
        ))}
      </div>
    </div>
  )
}
