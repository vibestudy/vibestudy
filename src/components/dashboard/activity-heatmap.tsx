'use client'

import { Star } from 'lucide-react'

// Generate mock heatmap data (22 columns x 5 rows)
const generateHeatmapData = () => {
  const data: number[][] = []
  for (let row = 0; row < 5; row++) {
    const rowData: number[] = []
    for (let col = 0; col < 22; col++) {
      // Random intensity 0-3 (0 = empty, 1 = light, 2 = medium, 3 = dark)
      rowData.push(Math.floor(Math.random() * 4))
    }
    data.push(rowData)
  }
  return data
}

const heatmapData = generateHeatmapData()

const intensityColors = [
  'bg-zinc-200 dark:bg-zinc-800', // 0 - empty
  'bg-zinc-300 dark:bg-zinc-700', // 1 - light
  'bg-zinc-500 dark:bg-zinc-500', // 2 - medium
  'bg-zinc-900 dark:bg-white', // 3 - dark/full
]

export default function ActivityHeatmap() {
  const overallProgress = 59

  return (
    <div className="flex gap-4">
      {/* Rank Card */}
      <div className="flex w-[140px] flex-col items-center justify-center rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-blue-500">
          <Star className="size-6 text-white" fill="white" />
        </div>
        <span className="text-sm font-semibold text-zinc-900 dark:text-white">미들</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">빌더 랭크</span>
      </div>

      {/* Heatmap Grid */}
      <div className="flex-1 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800">
        {/* Progress Bar */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{overallProgress}%</span>
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-1">
          {heatmapData.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((intensity, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className={`size-3.5 rounded-sm ${intensityColors[intensity]}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
