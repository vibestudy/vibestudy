'use client'

import clsx from 'clsx'

interface ActivityData {
  date: string
  count: number
}

interface ActivityHeatmapProps {
  data?: ActivityData[]
  className?: string
}

function getActivityLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 1) return 1
  if (count <= 2) return 2
  if (count <= 3) return 3
  if (count <= 5) return 4
  return 5
}

function getActivityOpacity(level: number): string {
  const opacities = [
    'opacity-[0.04]',
    'opacity-[0.24]',
    'opacity-[0.36]',
    'opacity-[0.48]',
    'opacity-[0.64]',
    'opacity-100',
  ]
  return opacities[level] || opacities[0]
}

export function ActivityHeatmap({ data = [], className }: ActivityHeatmapProps) {
  const rows = 7
  const cols = 11
  const totalCells = rows * cols

  const activityMap = new Map(data.map((d) => [d.date, d.count]))

  const today = new Date()
  const cells = Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (totalCells - 1 - index))
    const dateStr = date.toISOString().split('T')[0]
    const count = activityMap.get(dateStr) || 0
    return { date: dateStr, count, level: getActivityLevel(count) }
  })

  const columns: (typeof cells)[] = []
  for (let col = 0; col < cols; col++) {
    const column: typeof cells = []
    for (let row = 0; row < rows; row++) {
      const idx = col * rows + row
      if (idx < cells.length) {
        column.push(cells[idx])
      }
    }
    columns.push(column)
  }

  return (
    <div className={clsx('w-full', className)}>
      <div className="flex gap-1">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-1">
            {column.map((cell) => (
              <div
                key={cell.date}
                className={clsx('size-2.5 rounded bg-zinc-950 dark:bg-white', getActivityOpacity(cell.level))}
                title={`${cell.date}: ${cell.count}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
