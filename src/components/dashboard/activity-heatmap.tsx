'use client'

import { Star, TrendingUp } from 'lucide-react'

// Generate deterministic mock data to avoid hydration mismatches
const activityData = [
  1, 0, 2, 4, 1, 0, 3, 2, 1, 0, 0, 4, 2, 1, 0, 3, 2, 1, 4, 0, 1, 2, 0, 3, 1, 2, 4, 1, 0, 2, 1, 3, 0, 2, 1, 4, 0, 1, 2,
  3, 0, 1, 2, 4, 2, 1, 4, 0, 3, 2, 1, 0, 4, 2, 1, 3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 2,
  1, 4, 0, 1, 2, 3, 0, 4, 1, 2, 3, 2, 1, 0, 4, 1, 2, 3, 0, 1, 2, 4, 3, 0, 1, 2, 4, 1, 0, 3, 2, 1,
].map((intensity, i) => ({ id: `cell-${i}`, intensity }))

const STARS = [1, 2, 3, 4]

const getCellColor = (intensity: number) => {
  switch (intensity) {
    case 0:
      return 'bg-zinc-100 dark:bg-zinc-800'
    case 1:
      return 'bg-zinc-300 dark:bg-zinc-700'
    case 2:
      return 'bg-zinc-500 dark:bg-zinc-600'
    case 3:
      return 'bg-zinc-700 dark:bg-zinc-400'
    case 4:
      return 'bg-zinc-900 dark:bg-zinc-200'
    default:
      return 'bg-zinc-100 dark:bg-zinc-800'
  }
}

export default function ActivityHeatmap() {
  return (
    <div className="w-full rounded-3xl bg-white p-6 shadow-sm md:p-8 dark:bg-zinc-900">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">59%</div>
            <div className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">나의 진행 상황</div>
          </div>

          <div className="flex w-fit items-center gap-4 rounded-2xl bg-zinc-50 px-5 py-3 dark:bg-zinc-800/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">미들</div>
              <div className="flex gap-0.5">
                {STARS.map((star) => (
                  <Star key={star} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
                <Star className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-6">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="absolute top-0 left-0 h-full w-[59%] rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
          </div>

          <div
            className="grid gap-1.5 self-center md:self-end"
            style={{ gridTemplateColumns: 'repeat(22, minmax(0, 1fr))' }}
          >
            {activityData.map(({ id, intensity }) => (
              <div key={id} className={`h-3 w-3 rounded-sm ${getCellColor(intensity)}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
