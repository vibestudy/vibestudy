'use client'

import clsx from 'clsx'

type RatingLevel = 'beginner' | 'middle' | 'advanced' | 'expert'

interface AIRatingBadgeProps {
  level: RatingLevel
  range?: string
  className?: string
}

const levelConfig: Record<RatingLevel, { label: string; color: string; bgColor: string }> = {
  beginner: { label: '비기너', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.1)' },
  middle: { label: '미들', color: '#028AC7', bgColor: 'rgba(2, 138, 199, 0.1)' },
  advanced: { label: '어드밴스드', color: '#A855F7', bgColor: 'rgba(168, 85, 247, 0.1)' },
  expert: { label: '엑스퍼트', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' },
}

function SparklesIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4L14 10L20 12L14 14L12 20L10 14L4 12L10 10L12 4Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 16L25.3333 20L28 21.3333L25.3333 22.6667L24 26.6667L22.6667 22.6667L20 21.3333L22.6667 20L24 16Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AIRatingBadge({ level, range, className }: AIRatingBadgeProps) {
  const config = levelConfig[level]

  return (
    <div
      className={clsx(
        'flex shrink-0 flex-col items-center justify-center gap-[16px] self-stretch rounded-[10px] bg-[rgba(245,245,245,0.04)] p-[32px]',
        className
      )}
      style={{ width: 'auto' }}
    >
      <div
        className="flex size-[64px] items-center justify-center rounded-[16px]"
        style={{ backgroundColor: config.bgColor }}
      >
        <SparklesIcon color={config.color} />
      </div>
      <div className="flex flex-col items-center gap-[2px] self-stretch">
        <span
          className="text-center text-[20px] leading-[1.4] font-semibold tracking-[-0.02em]"
          style={{ color: config.color }}
        >
          {config.label}
        </span>
        {range && (
          <span
            className="text-center text-[12px] leading-[1.35] font-normal tracking-[-0.02em]"
            style={{ color: config.color }}
          >
            {range}
          </span>
        )}
      </div>
    </div>
  )
}
