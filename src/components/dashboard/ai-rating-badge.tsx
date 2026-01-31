'use client'

import { AiGenerativeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'

type RatingLevel = 'beginner' | 'middle' | 'advanced' | 'expert'

interface AIRatingBadgeProps {
  level: RatingLevel
  range?: string
  className?: string
}

const levelConfig: Record<RatingLevel, { label: string; colorClass: string; iconBg: string }> = {
  beginner: {
    label: '비기너',
    colorClass: 'text-amber-400',
    iconBg: 'bg-gradient-to-br from-amber-400/20 to-amber-500/10',
  },
  middle: {
    label: '미들',
    colorClass: 'text-blue-400',
    iconBg: 'bg-gradient-to-br from-blue-400/20 to-blue-500/10',
  },
  advanced: {
    label: '어드밴스드',
    colorClass: 'text-purple-400',
    iconBg: 'bg-gradient-to-br from-purple-400/20 to-purple-500/10',
  },
  expert: {
    label: '엑스퍼트',
    colorClass: 'text-emerald-400',
    iconBg: 'bg-gradient-to-br from-emerald-400/20 to-emerald-500/10',
  },
}

export function AIRatingBadge({ level, range, className }: AIRatingBadgeProps) {
  const config = levelConfig[level]

  return (
    <div className={clsx('flex flex-col items-center gap-2', className)}>
      <div className={clsx('rounded-2xl p-4', config.iconBg)}>
        <HugeiconsIcon icon={AiGenerativeIcon} size={28} className={config.colorClass} />
      </div>
      <div className="flex flex-col items-center">
        <div className={clsx('text-xl font-bold', config.colorClass)}>{config.label}</div>
        {range && <div className={clsx('text-xs', config.colorClass)}>{range}</div>}
      </div>
    </div>
  )
}
