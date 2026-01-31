'use client'

import clsx from 'clsx'

interface ActivityData {
  date: string
  count: number
}

interface ActivityHeatmapProps {
  data?: ActivityData[]
  weeks?: number
  className?: string
}

function getActivityLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 4) return 2
  if (count <= 6) return 3
  return 4
}

function getActivityColor(level: number): string {
  const colors = [
    'bg-zinc-800', // 0 - no activity
    'bg-zinc-600', // 1 - low
    'bg-zinc-500', // 2 - medium-low
    'bg-zinc-400', // 3 - medium-high
    'bg-zinc-300', // 4 - high
  ]
  return colors[level] || colors[0]
}

export function ActivityHeatmap({ data = [], weeks = 15, className }: ActivityHeatmapProps) {
  // Generate a grid of cells for the heatmap
  // 7 days per week × number of weeks
  const totalCells = 7 * weeks

  // Create a map of date to count for quick lookup
  const activityMap = new Map(data.map((d) => [d.date, d.count]))

  // Generate dates for the grid (going backwards from today)
  const today = new Date()
  const cells = Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (totalCells - 1 - index))
    const dateStr = date.toISOString().split('T')[0]
    const count = activityMap.get(dateStr) || 0
    return { date: dateStr, count, level: getActivityLevel(count) }
  })

  // Group cells by week
  const weekGroups: typeof cells[] = []
  for (let i = 0; i < cells.length; i += 7) {
    weekGroups.push(cells.slice(i, i + 7))
  }

  return (
    <div className={clsx('', className)}>
      <div className="flex gap-0.5">
        {weekGroups.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5">
            {week.map((cell) => (
              <div
                key={cell.date}
                className={clsx(
                  'size-3 rounded-sm transition-colors',
                  getActivityColor(cell.level)
                )}
                title={`${cell.date}: ${cell.count} activities`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
